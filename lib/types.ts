export type GitHubPinnedRepository = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  primaryLanguage: {
    name: string;
    color: string | null;
  } | null;
  topics: string[];
  languages: GitHubRepositoryLanguage[];
};

export type GitHubRepositoryLanguage = {
  name: string;
  color: string | null;
  size: number;
  percentage: number;
};

export type GitHubContributionStats = {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
};

export type LeetCodeStats = {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  streak: number;
};

