"use client";

import { motion } from "framer-motion";
import { Flame, Github, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import ActivityHeatmap from "./ActivityHeatmap";
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
  const [githubStats, setGitHubStats] =
    useState<GitHubContributionStats | null>(null);
  const [leetcodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(
    null,
  );
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

        const payload = await parseJson<GitHubContributionStats | ApiError>(
          response,
        );

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
      highlighted: false,
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
          <p className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tight text-white">
            {githubStats.totalContributions}
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Contributions this year
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-800 pt-5 text-sm text-zinc-400">
            <span>
              <strong className="block text-base font-semibold text-white">
                {githubStats.activeDays}
              </strong>
              active days
            </span>
            <span>
              <strong className="block text-base font-semibold text-white">
                {githubStats.longestStreak}
              </strong>
              day best streak
            </span>
          </div>
        </>
      ) : (
        <p className="text-sm leading-6 text-zinc-400">
          {githubError ?? "Unable to load GitHub contribution stats."}
        </p>
      ),
    },
    {
      title: "GitHub streak",
      icon: Flame,
      subtitle: "Consistency snapshot",
      highlighted: true,
      content: githubLoading ? (
        <div className="space-y-4" aria-hidden="true">
          <div className="h-9 w-16 animate-pulse rounded-full bg-white/10" />
          <div className="h-4 w-36 animate-pulse rounded-full bg-white/5" />
          <div className="h-4 w-44 animate-pulse rounded-full bg-white/5" />
        </div>
      ) : githubStats ? (
        <>
          <p className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tight text-white">
            {githubStats.currentStreak}
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Current streak in days
          </p>

          <p className="mt-6 border-t border-zinc-800 pt-5 text-sm text-zinc-500">
            Longest recorded streak:{" "}
            <span className="text-zinc-300">
              {githubStats.longestStreak} days
            </span>
          </p>
        </>
      ) : (
        <p className="text-sm leading-6 text-zinc-400">
          {githubError ?? "Unable to load GitHub streak data."}
        </p>
      ),
    },
    {
      title: "LeetCode stats",
      icon: Trophy,
      subtitle: leetcodeUsername,
      highlighted: false,
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
          <p className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tight text-white">
            {leetcodeStats.totalSolved}
          </p>
          <p className="mt-1 text-sm text-zinc-400">Problems solved</p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-zinc-800 pt-5 text-sm text-zinc-400">
            <span>Easy: {leetcodeStats.easySolved}</span>
            <span>Medium: {leetcodeStats.mediumSolved}</span>
            <span>Hard: {leetcodeStats.hardSolved}</span>
            <span>Streak: {leetcodeStats.streak || "N/A"}</span>
          </div>
        </>
      ) : (
        <p className="text-sm leading-6 text-zinc-400">
          {leetcodeError ?? "LeetCode stats temporarily unavailable."}
        </p>
      ),
    },
  ];

  return (
    <section id="activity" className="section-shell bg-black">
      <div className="container-shell">
        <div className="max-w-4xl">
          <p className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-tight tracking-tight text-white">
            CODING ACTIVITY
          </p>

          <h2 className="mt-5 max-w-3xl text-[clamp(1rem,1.5vw,1.25rem)] font-medium leading-8 text-violet-400">
            Consistency across code, commits, and problem solving.
          </h2>

          <p className="mt-5 max-w-3xl text-[clamp(1rem,1.5vw,1.125rem)] leading-8 text-zinc-400">
            A live snapshot of my GitHub contributions and LeetCode practice,
            showing how I stay active across building projects and sharpening
            problem-solving skills.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className={
                  card.highlighted
                    ? "rounded-3xl border border-zinc-800 bg-zinc-950/40 p-6 transition hover:border-violet-400/40"
                    : "rounded-3xl border border-zinc-800 bg-zinc-950/40 p-6 transition hover:border-violet-400/40"
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {card.title}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-black/60 p-3 text-violet-400">
                    <Icon size={18} />
                  </div>
                </div>

                <div className="mt-6">{card.content}</div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {githubStats && (
            <ActivityHeatmap
              title="GitHub contribution calendar"
              subtitle="Last 30 weeks of repository activity."
              totalLabel={`Total contributions: ${githubStats.totalContributions}`}
              days={githubStats.days ?? []}
              weeksToShow={30}
            />
          )}

          {leetcodeStats && (
            <ActivityHeatmap
              title="LeetCode submission calendar"
              subtitle="Last 30 weeks of problem-solving activity."
              totalLabel={`Total submissions: ${leetcodeStats.totalSolved}`}
              days={leetcodeStats.days ?? []}
              weeksToShow={30}
            />
          )}
        </div>

        {(githubUnavailable || leetcodeUnavailable) && (
          <div className="mt-6 flex flex-wrap items-center gap-3" role="alert">
            <p className="text-sm text-zinc-500">
              Some coding activity data is temporarily unavailable.
            </p>

            <button
              type="button"
              onClick={() => setReloadKey((value) => value + 1)}
              className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition hover:border-violet-400/40 hover:text-white"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
