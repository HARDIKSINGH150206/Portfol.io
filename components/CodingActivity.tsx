"use client";

import { motion } from "framer-motion";
import { Flame, Github, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { GitHubContributionStats, LeetCodeStats } from "@/lib/types";

type CodingActivityProps = {
  githubUsername: string;
  leetcodeUsername: string;
};

type ApiError = { error: string };

async function parseJson<T>(response: Response): Promise<T | null> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export default function CodingActivity({
  githubUsername,
  leetcodeUsername,
}: CodingActivityProps) {
  const [githubStats, setGitHubStats] = useState<GitHubContributionStats | null>(null);
  const [leetcodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(null);
  const [githubError, setGitHubError] = useState<string | null>(null);
  const [leetcodeError, setLeetCodeError] = useState<string | null>(null);
  const [githubLoading, setGitHubLoading] = useState(true);
  const [leetcodeLoading, setLeetCodeLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadGitHub() {
      try {
        setGitHubLoading(true);
        const response = await fetch("/api/github/contributions", {
          signal: controller.signal,
        });
        const payload = await parseJson<GitHubContributionStats | ApiError>(response);

        if (!response.ok || !payload || "error" in payload) {
          throw new Error(
            payload && "error" in payload
              ? payload.error
              : "Unable to load GitHub contribution stats.",
          );
        }

        if (active) {
          setGitHubStats(payload);
          setGitHubError(null);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        if (active) {
          setGitHubStats(null);
          setGitHubError(
            error instanceof Error
              ? error.message
              : "Unable to load GitHub contribution stats.",
          );
        }
      } finally {
        if (active) {
          setGitHubLoading(false);
        }
      }
    }

    async function loadLeetCode() {
      try {
        setLeetCodeLoading(true);
        const response = await fetch("/api/leetcode", {
          signal: controller.signal,
        });
        const payload = await parseJson<LeetCodeStats | ApiError>(response);

        if (!response.ok || !payload || "error" in payload) {
          throw new Error(
            payload && "error" in payload
              ? payload.error
              : "LeetCode stats temporarily unavailable.",
          );
        }

        if (active) {
          setLeetCodeStats(payload);
          setLeetCodeError(null);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        if (active) {
          setLeetCodeStats(null);
          setLeetCodeError(
            error instanceof Error
              ? error.message
              : "LeetCode stats temporarily unavailable.",
          );
        }
      } finally {
        if (active) {
          setLeetCodeLoading(false);
        }
      }
    }

    loadGitHub();
    loadLeetCode();

    return () => {
      active = false;
      controller.abort();
    };
  }, [reloadKey]);

  const githubUnavailable = !githubLoading && !!githubError;
  const leetcodeUnavailable = !leetcodeLoading && !!leetcodeError;

  const cards = [
    {
      title: "GitHub activity",
      icon: Github,
      subtitle: githubUsername,
      content: githubLoading ? (
        <div className="space-y-4" aria-live="polite" aria-busy="true">
          <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
          <div className="h-4 w-40 animate-pulse rounded-full bg-white/5" />
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="h-4 animate-pulse rounded-full bg-white/5" />
            <div className="h-4 animate-pulse rounded-full bg-white/5" />
          </div>
        </div>
      ) : githubStats ? (
        <>
          <p className="text-3xl font-semibold text-white">
            {githubStats.totalContributions}
          </p>
          <p className="text-sm text-text-secondary">Contributions this year</p>
          <div className="grid grid-cols-2 gap-3 pt-4 text-sm text-text-secondary">
            <span>{githubStats.activeDays} active days</span>
            <span>{githubStats.longestStreak} day best streak</span>
          </div>
        </>
      ) : (
        <p className="text-sm text-text-secondary">
          {githubError ?? "Unable to load GitHub contribution stats."}
        </p>
      ),
    },
    {
      title: "GitHub streak",
      icon: Flame,
      subtitle: "Consistency snapshot",
      content: githubLoading ? (
        <div className="space-y-4" aria-hidden="true">
          <div className="h-9 w-16 animate-pulse rounded-full bg-white/10" />
          <div className="h-4 w-36 animate-pulse rounded-full bg-white/5" />
          <div className="h-4 w-44 animate-pulse rounded-full bg-white/5" />
        </div>
      ) : githubStats ? (
        <>
          <p className="text-3xl font-semibold text-white">
            {githubStats.currentStreak}
          </p>
          <p className="text-sm text-text-secondary">Current streak in days</p>
          <p className="pt-4 text-sm text-text-muted">
            Longest recorded streak: {githubStats.longestStreak} days
          </p>
        </>
      ) : (
        <p className="text-sm text-text-secondary">
          {githubError ?? "Unable to load GitHub streak data."}
        </p>
      ),
    },
    {
      title: "LeetCode stats",
      icon: Trophy,
      subtitle: leetcodeUsername,
      content: leetcodeLoading ? (
        <div className="space-y-4" aria-live="polite" aria-busy="true">
          <div className="h-9 w-20 animate-pulse rounded-full bg-white/10" />
          <div className="h-4 w-32 animate-pulse rounded-full bg-white/5" />
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="h-4 animate-pulse rounded-full bg-white/5" />
            <div className="h-4 animate-pulse rounded-full bg-white/5" />
            <div className="h-4 animate-pulse rounded-full bg-white/5" />
            <div className="h-4 animate-pulse rounded-full bg-white/5" />
          </div>
        </div>
      ) : leetcodeStats ? (
        <>
          <p className="text-3xl font-semibold text-white">
            {leetcodeStats.totalSolved}
          </p>
          <p className="text-sm text-text-secondary">Problems solved</p>
          <div className="grid grid-cols-2 gap-3 pt-4 text-sm text-text-secondary">
            <span>Easy: {leetcodeStats.easySolved}</span>
            <span>Medium: {leetcodeStats.mediumSolved}</span>
            <span>Hard: {leetcodeStats.hardSolved}</span>
            <span>Streak: {leetcodeStats.streak || "N/A"}</span>
          </div>
        </>
      ) : (
        <p className="text-sm text-text-secondary">
          {leetcodeError ?? "LeetCode stats temporarily unavailable."}
        </p>
      ),
    },
  ];

  return (
    <section id="activity" className="section-shell">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Coding Activity"
          title="Visible output, not just claims."
          description="GitHub and LeetCode activity are surfaced through API-backed cards with graceful fallbacks. If an external service fails, the site stays stable."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                className="surface-card p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{card.title}</p>
                    <p className="mt-1 text-sm text-text-muted">{card.subtitle}</p>
                  </div>
                  <div className="rounded-2xl border border-border p-3 text-accent">
                    <Icon size={18} />
                  </div>
                </div>

                <div className="mt-6">{card.content}</div>
              </motion.article>
            );
          })}
        </div>

        {(githubUnavailable || leetcodeUnavailable) && (
          <div className="mt-6 flex flex-wrap items-center gap-3" role="alert">
            <p className="text-sm text-text-muted">
              Some coding activity data is temporarily unavailable.
            </p>
            <button
              type="button"
              onClick={() => setReloadKey((value) => value + 1)}
              className="rounded-full border border-border px-4 py-2 text-sm text-text-secondary transition hover:border-accent-border hover:text-white"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
