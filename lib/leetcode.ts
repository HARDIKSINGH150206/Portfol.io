import { LeetCodeStats } from "./types";

const LEETCODE_API_URL = "https://leetcode.com/graphql/";

type LeetCodeQueryResult = {
  matchedUser: {
    submitStatsGlobal: {
      acSubmissionNum: Array<{
        difficulty: string;
        count: number;
      }>;
    };
  } | null;
};

export async function getLeetCodeStats() {
  const username = process.env.LEETCODE_USERNAME;

  if (!username) {
    throw new Error("Missing LeetCode username.");
  }

  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const response = await fetch(LEETCODE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`LeetCode API request failed with ${response.status}.`);
  }

  const payload = (await response.json()) as { data?: LeetCodeQueryResult };
  const stats = payload.data?.matchedUser?.submitStatsGlobal.acSubmissionNum;

  if (!stats) {
    throw new Error("LeetCode stats temporarily unavailable.");
  }

  const lookup = Object.fromEntries(stats.map((entry) => [entry.difficulty, entry.count]));

  const result: LeetCodeStats = {
    totalSolved: lookup.All ?? 0,
    easySolved: lookup.Easy ?? 0,
    mediumSolved: lookup.Medium ?? 0,
    hardSolved: lookup.Hard ?? 0,
    streak: 0,
  };

  return result;
}
