import { ActivityDay, GitHubContributionStats, GitHubPinnedRepository } from "./types";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

type RepositoryLanguageEdge = {
  size: number;
  node: {
    name: string;
    color: string | null;
  } | null;
};

type RepositoryNode = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  primaryLanguage: { name: string; color: string | null } | null;
  repositoryTopics: {
    nodes: Array<{ topic: { name: string } | null }>;
  };
  languages: {
    totalSize: number;
    edges: RepositoryLanguageEdge[];
  };
};

function getGitHubEnv() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    return null;
  }

  return { token, username };
}

async function githubGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const env = getGitHubEnv();

  if (!env) {
    throw new Error("Missing GitHub environment variables.");
  }

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.token}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed with ${response.status}.`);
  }

  const payload = (await response.json()) as GraphQLResponse<T>;

  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message ?? "GitHub API returned an error.");
  }

  if (!payload.data) {
    throw new Error("GitHub API returned no data.");
  }

  return payload.data;
}

export async function getPinnedRepositories() {
  const env = getGitHubEnv();

  if (!env) {
    throw new Error("Missing GitHub environment variables.");
  }

  const query = `
    query PinnedRepositories($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              stargazerCount
              forkCount
              updatedAt
              primaryLanguage {
                name
                color
              }
              repositoryTopics(first: 6) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              languages(first: 6, orderBy: { field: SIZE, direction: DESC }) {
                totalSize
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await githubGraphQL<{
    user: {
      pinnedItems: {
        nodes: RepositoryNode[];
      };
    } | null;
  }>(query, { username: env.username });

  const nodes = data.user?.pinnedItems.nodes ?? [];

  return nodes.map<GitHubPinnedRepository>((repository) => {
    const totalLanguageSize = repository.languages?.totalSize ?? 0;

    const languages =
      totalLanguageSize > 0
        ? repository.languages.edges
          .filter((edge) => edge.node !== null)
          .map((edge) => ({
            name: edge.node!.name,
            color: edge.node!.color,
            size: edge.size,
            percentage: Number(
              ((edge.size / totalLanguageSize) * 100).toFixed(1),
            ),
          }))
        : [];

    return {
      name: repository.name,
      description: repository.description,
      url: repository.url,
      homepageUrl: repository.homepageUrl,
      stargazerCount: repository.stargazerCount,
      forkCount: repository.forkCount,
      updatedAt: repository.updatedAt,
      primaryLanguage: repository.primaryLanguage,
      topics: repository.repositoryTopics.nodes
        .map((topicNode) => topicNode.topic?.name)
        .filter((topic): topic is string => Boolean(topic)),
      languages,
    };
  });
}

function computeStreaks(days: Array<{ date: string; contributionCount: number }>) {
  const contributingDays = days
    .filter((day) => day.contributionCount > 0)
    .map((day) => day.date)
    .sort();

  if (contributingDays.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  let longestStreak = 1;
  let streak = 1;

  for (let index = 1; index < contributingDays.length; index += 1) {
    const previous = new Date(contributingDays[index - 1]);
    const current = new Date(contributingDays[index]);
    const difference =
      (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);

    if (difference === 1) {
      streak += 1;
      longestStreak = Math.max(longestStreak, streak);
    } else {
      streak = 1;
    }
  }

  let currentStreak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  const contributions = new Set(contributingDays);

  while (contributions.has(cursor.toISOString().slice(0, 10))) {
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  if (currentStreak === 0) {
    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);

    while (contributions.has(yesterday.toISOString().slice(0, 10))) {
      currentStreak += 1;
      yesterday.setDate(yesterday.getDate() - 1);
    }
  }

  return { currentStreak, longestStreak };
}

export async function getGitHubContributionStats() {
  const env = getGitHubEnv();

  if (!env) {
    throw new Error("Missing GitHub environment variables.");
  }

  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 1)).toISOString();
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), 11, 31, 23, 59, 59),
  ).toISOString();

  const query = `
    query ContributionStats($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const data = await githubGraphQL<{
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
            }>;
          }>;
        };
      };
    } | null;
  }>(query, {
    username: env.username,
    from: start,
    to: end,
  });

  const days =
    data.user?.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays,
    ) ?? [];

  const totalContributions =
    data.user?.contributionsCollection.contributionCalendar.totalContributions ??
    0;

  const activeDays = days.filter((day) => day.contributionCount > 0).length;
  const { currentStreak, longestStreak } = computeStreaks(days);
  const activityDays: ActivityDay[] = days.map((day) => ({
    date: day.date,
    count: day.contributionCount,
  }));

  const stats: GitHubContributionStats = {
    totalContributions,
    currentStreak,
    longestStreak,
    activeDays,
    days: activityDays,
  };

  return stats;
}