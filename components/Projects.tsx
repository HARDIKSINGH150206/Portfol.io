"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { GitHubPinnedRepository } from "@/lib/types";

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

export default function Projects() {
  const [projects, setProjects] = useState<GitHubPinnedRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadProjects() {
      try {
        setLoading(true);
        const response = await fetch("/api/github/pinned", {
          signal: controller.signal,
        });
        const payload = await parseJson<
          GitHubPinnedRepository[] | { error: string }
        >(response);

        if (!response.ok || !payload || !Array.isArray(payload)) {
          throw new Error(
            payload && !Array.isArray(payload)
              ? payload.error
              : "Unable to load GitHub pinned repositories.",
          );
        }

        if (active) {
          setProjects(payload);
          setError(null);
        }
      } catch (loadError) {
        if (loadError instanceof Error && loadError.name === "AbortError") {
          return;
        }

        if (active) {
          setProjects([]);
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load GitHub pinned repositories.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      active = false;
      controller.abort();
    };
  }, [reloadKey]);

  return (
    <section id="projects" className="section-shell">
      <div className="container-shell">
        <div className="mb-12 max-w-4xl">
          <p className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-tight tracking-tight text-white">
            PROJECTS
          </p>

          <h2 className="mt-5 max-w-3xl text-[clamp(1rem,1.5vw,1.25rem)] font-medium leading-8 text-violet-400">
            Systems I’ve designed, built, and shipped.
          </h2>

          <p className="mt-4 max-w-3xl text-[clamp(1rem,1.5vw,1.125rem)] leading-7 text-zinc-500">
            From AI-powered tools to full-stack platforms, these projects show how I
            turn ideas into usable, reliable digital products. The section stays synced
            with the repositories I pin on GitHub.
          </p>
        </div>

        {loading ? (
          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
            aria-live="polite"
            aria-busy="true"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`skeleton-${index + 1}`}
                className="min-h-[300px] rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6"
              >
                <div className="flex h-full animate-pulse flex-col justify-between">
                  <div className="space-y-4">
                    <div className="h-6 w-2/3 rounded-full bg-zinc-800/70" />
                    <div className="h-20 rounded-2xl bg-zinc-800/40" />
                    <div className="h-4 w-24 rounded-full bg-zinc-800/50" />
                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 w-16 rounded-full bg-zinc-800/50" />
                      <div className="h-6 w-20 rounded-full bg-zinc-800/50" />
                      <div className="h-6 w-14 rounded-full bg-zinc-800/50" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-4 w-28 rounded-full bg-zinc-800/50" />
                    <div className="flex gap-3">
                      <div className="h-9 w-24 rounded-full bg-zinc-800/60" />
                      <div className="h-9 w-28 rounded-full bg-zinc-800/60" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {!loading && error ? (
          <div
            className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8"
            role="alert"
          >
            <p className="text-lg font-medium text-white">
              Unable to load GitHub projects right now.
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{error}</p>
            <button
              type="button"
              onClick={() => setReloadKey((value) => value + 1)}
              className="mt-5 rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-400/50 hover:text-white"
            >
              Retry
            </button>
          </div>
        ) : null}

        {!loading && !error && projects.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8">
            <p className="text-lg font-medium text-white">No pinned repositories found.</p>
          </div>
        ) : null}

        {!loading && !error && projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.url} project={project} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
