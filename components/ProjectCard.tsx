"use client";

import { ArrowUpRight, GitFork, Globe, Star } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { GitHubPinnedRepository } from "@/lib/types";
import { PinContainer } from "@/components/ui/3d-pin";

function LanguageBreakdown({
  languages,
}: {
  languages?: {
    name: string;
    color: string | null;
    percentage: number;
  }[];
}) {
  if (!languages || languages.length === 0) {
    return (
      <div className="mt-6 text-sm text-zinc-500">
        Language data unavailable
      </div>
    );
  }

  const topLanguages = languages.slice(0, 3);

  const topTotal = topLanguages.reduce(
    (sum, language) => sum + language.percentage,
    0,
  );

  const otherPercentage = Math.max(0, Number((100 - topTotal).toFixed(1)));

  const segments = [
    ...topLanguages,
    ...(otherPercentage > 0
      ? [
        {
          name: "Other",
          color: "#e5e7eb",
          percentage: otherPercentage,
        },
      ]
      : []),
  ];

  return (
    <div className="mt-6">
      <div className="h-2 w-full max-w-[24rem] overflow-hidden rounded-full bg-zinc-800">
        <div className="flex h-full w-full">
          {segments.map((language) => (
            <div
              key={language.name}
              className="h-full"
              style={{
                width: `${language.percentage}%`,
                backgroundColor: language.color || "#71717a",
              }}
              title={`${language.name} ${language.percentage}%`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-400">
        {topLanguages.map((language) => (
          <div key={language.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: language.color || "#71717a",
              }}
            />
            <span className="font-medium text-zinc-200">{language.name}</span>
            <span>{language.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type ProjectCardProps = {
  project: GitHubPinnedRepository;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <PinContainer title={project.url.replace(/^https?:\/\//, "")} href={project.url}>
      <article className="flex h-full min-h-[300px] flex-col p-6">
        <div className="space-y-4" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-start justify-between gap-4">
            <h3 className="break-words text-2xl font-semibold text-white">{project.name}</h3>

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub repository"
              className="shrink-0 rounded-full border border-zinc-800 p-2 text-zinc-400 transition hover:border-violet-400/50 hover:text-white"
            >
              <IconBrandGithub className="h-5 w-5" stroke={1.8} />
            </a>
          </div>

          <p
            className="mt-5 line-clamp-3 text-base leading-7 text-zinc-400"
          >
            {project.description || "No description provided."}
          </p>

          <LanguageBreakdown languages={project.languages} />
        </div>

        <div className="mt-auto space-y-4" style={{ transform: "translateZ(30px)" }}>
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Star size={14} />
              {project.stargazerCount}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GitFork size={14} />
              {project.forkCount}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-400/50 hover:text-white"
            >
              Code
              <ArrowUpRight size={14} />
            </a>

            {project.homepageUrl ? (
              <a
                href={project.homepageUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open live demo for ${project.name}`}
                className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 transition hover:border-violet-400/70 hover:bg-violet-500/20"
              >
                <Globe size={14} />
                Live Demo
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </PinContainer>
  );
}
