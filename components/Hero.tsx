"use client";

import type { ComponentType, HTMLAttributeAnchorTarget } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  type IconProps,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconCode,
  IconFileCv,
  IconMail,
} from "@tabler/icons-react";

type HeroProps = {
  githubUsername: string;
  profileImageSrc?: string;
};

type HeroAction = {
  title: string;
  href: string;
  icon: ComponentType<IconProps>;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  download?: boolean;
  desktopPosition: string;
};

export default function Hero({ githubUsername, profileImageSrc }: HeroProps) {
  const xProfileUrl = "https://x.com/hardik_singh";

  const iconPositions = [
    "top-[2%] right-[8%]",
    "top-[16%] right-[-3%]",
    "top-[33%] right-[-8%]",
    "top-[50%] right-[-9%]",
    "top-[67%] right-[-5%]",
    "top-[82%] right-[5%]",
  ] as const;

  const heroActions: HeroAction[] = [
    {
      title: "Projects",
      href: "#projects",
      icon: IconCode,
      desktopPosition: iconPositions[0],
    },
    {
      title: "Resume",
      href: `https://drive.google.com/file/d/1dqK-iqgqZ12pAZ13f05dxTxA1qtLn01c/view`,
      target: "_blank",
      rel: "noreferrer",
      icon: IconFileCv,
      desktopPosition: iconPositions[1],
    },
    {
      title: "GitHub",
      href: `https://github.com/${githubUsername}`,
      target: "_blank",
      rel: "noreferrer",
      icon: IconBrandGithub,
      desktopPosition: iconPositions[2],
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/hardik-singh/",
      target: "_blank",
      rel: "noreferrer",
      icon: IconBrandLinkedin,
      desktopPosition: iconPositions[3],
    },
    {
      title: "X",
      href: xProfileUrl,
      target: "_blank",
      rel: "noreferrer",
      icon: IconBrandX,
      desktopPosition: iconPositions[4],
    },
    {
      title: "Contact",
      href: "#contact",
      icon: IconMail,
      desktopPosition: iconPositions[5],
    },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] top-[24%] hidden h-52 w-52 rounded-full bg-violet-500/5 blur-3xl lg:block"
      />

      <div className="mx-auto max-w-6xl px-6 pb-12 pt-8 sm:px-8 md:pb-14 md:pt-10 lg:px-10 lg:pb-16 lg:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-8 xl:gap-10"
        >
          <div className="flex max-w-3xl flex-col items-start lg:max-w-[680px]">
            <span className="inline-flex w-fit max-w-full rounded-full border border-zinc-800 bg-zinc-950/80 px-5 py-2 text-xs font-medium uppercase tracking-[0.28em] text-violet-400 md:whitespace-nowrap">
              AI/ML · FULL-STACK · PRODUCT ENGINEERING
            </span>

            <div className="mt-7">
              <h1 className="text-5xl font-semibold leading-none tracking-tight text-white md:text-6xl lg:whitespace-nowrap lg:text-6xl xl:text-7xl">
                HARDIK SINGH
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-300 md:text-2xl">
                I build intelligent, full-stack products that feel calm on the
                surface and solid underneath — clean UI, reliable APIs,
                practical AI, and systems designed to scale.
              </p>

              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
                I focus on turning ideas into production-ready digital
                experiences with thoughtful design, clean engineering, and
                real-world usability.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(139,92,246,0.22)] transition-all duration-300 hover:bg-violet-500 focus-visible:bg-violet-500"
              >
                View My Work
              </a>

              <a
                href="/resume.pdf"
                download
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-zinc-700 bg-black px-6 py-3 text-sm font-medium text-zinc-200 transition-all duration-300 hover:border-zinc-500 hover:text-white"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-center">
            <div className="flex flex-col items-center gap-6 md:gap-8">
              <div className="relative h-[290px] w-[290px] md:h-[330px] md:w-[330px] lg:h-[380px] lg:w-[380px] xl:h-[400px] xl:w-[400px]">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full border border-violet-400/30 bg-zinc-950/50 shadow-[0_0_60px_rgba(139,92,246,0.08)]">
                  {profileImageSrc ? (
                    <Image
                      src={profileImageSrc}
                      alt="Portrait of Hardik Singh"
                      fill
                      priority
                      unoptimized
                      sizes="(min-width: 1280px) 400px, (min-width: 1024px) 380px, (min-width: 768px) 330px, 290px"
                      className="object-cover [object-position:center_25%]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-black px-8 text-center">
                      <span className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
                        Profile Image
                      </span>

                      <p className="mt-4 max-w-[14rem] text-sm leading-6 text-zinc-400">
                        Add your image at{" "}
                        <span className="text-white">public/profile.jpg</span>{" "}
                        or{" "}
                        <span className="text-white">public/profile.png</span>.
                      </p>
                    </div>
                  )}
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[-12px] hidden rounded-full border border-violet-400/20 lg:block"
                  style={{ clipPath: "inset(0 0 0 52%)" }}
                />

                {heroActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <a
                      key={action.title}
                      href={action.href}
                      target={action.target}
                      rel={action.rel}
                      download={action.download}
                      aria-label={action.title}
                      title={action.title}
                      className={`absolute z-20 hidden h-11 w-11 items-center justify-center rounded-full border border-zinc-700/80 bg-black/85 text-zinc-200 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur transition-all duration-300 hover:scale-105 hover:border-violet-400/80 hover:text-white focus-visible:border-violet-400/80 focus-visible:text-white lg:flex lg:h-12 lg:w-12 ${action.desktopPosition}`}
                    >
                      <Icon className="h-5 w-5" stroke={1.8} />
                    </a>
                  );
                })}
              </div>

              <div className="flex max-w-[20rem] flex-wrap justify-center gap-3 lg:hidden">
                {heroActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <a
                      key={action.title}
                      href={action.href}
                      target={action.target}
                      rel={action.rel}
                      download={action.download}
                      aria-label={action.title}
                      title={action.title}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700/80 bg-black/85 text-zinc-200 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur transition-all duration-300 hover:scale-105 hover:border-violet-400/80 hover:text-white focus-visible:border-violet-400/80 focus-visible:text-white"
                    >
                      <Icon className="h-5 w-5" stroke={1.8} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}