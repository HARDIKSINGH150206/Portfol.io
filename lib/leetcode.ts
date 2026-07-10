import { LeetCodeStats } from "./types";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

type LeetCodeSubmissionStat = {
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  count: number;
  submissions: number;
};

type LeetCodeGraphQLResponse = {
  data?: {
    matchedUser: {
      username: string;
      submitStats: {
        acSubmissionNum: LeetCodeSubmissionStat[];
      };
      userCalendar: {
        streak: number;
        totalActiveDays: number;
        submissionCalendar: string | null;
      } | null;
    } | null;
  };
  errors?: Array<{ message: string }>;
};

function getLeetCodeUsername() {
  const username = process.env.LEETCODE_USERNAME;

  if (!username) {
    throw new Error("Missing LEETCODE_USERNAME environment variable.");
  }

  return username;
}

function parseLeetCodeCalendar(submissionCalendar?: string | null) {
  if (!submissionCalendar) {
    return [];
  }

  try {
    const parsed = JSON.parse(submissionCalendar) as Record<string, number>;

    return Object.entries(parsed).map(([timestamp, count]) => ({
      date: new Date(Number(timestamp) * 1000).toISOString().slice(0, 10),
      count: Number(count),
    }));
  } catch {
    return [];
  }
}

export async function getLeetCodeStats(): Promise<LeetCodeStats> {
  const username = getLeetCodeUsername();

  const query = `
    query userProfileCalendar($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        userCalendar {
          streak
          totalActiveDays
          submissionCalendar
        }
      }
    }
  `;

  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
      },
    }),
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`LeetCode request failed with ${response.status}.`);
  }

  const payload = (await response.json()) as LeetCodeGraphQLResponse;

  if (payload.errors?.length) {
    throw new Error(
      payload.errors[0]?.message ?? "LeetCode returned an error.",
    );
  }

  const matchedUser = payload.data?.matchedUser;

  if (!matchedUser) {
    throw new Error("LeetCode user not found.");
  }

  const stats = matchedUser.submitStats.acSubmissionNum;

  const all = stats.find((item) => item.difficulty === "All");
  const easy = stats.find((item) => item.difficulty === "Easy");
  const medium = stats.find((item) => item.difficulty === "Medium");
  const hard = stats.find((item) => item.difficulty === "Hard");

  const days = parseLeetCodeCalendar(
    matchedUser.userCalendar?.submissionCalendar,
  );

  return {
    totalSolved: all?.count ?? 0,
    easySolved: easy?.count ?? 0,
    mediumSolved: medium?.count ?? 0,
    hardSolved: hard?.count ?? 0,
    streak: matchedUser.userCalendar?.streak ?? null,
    activeDays: matchedUser.userCalendar?.totalActiveDays ?? 0,
    days,
  };
}
