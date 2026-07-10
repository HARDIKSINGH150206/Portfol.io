"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    title: "Product-first Engineering",
    description:
      "Clean frontend and backend experiences designed around clarity, usability, and real constraints.",
  },
  {
    title: "AI + Full-Stack Systems",
    description:
      "Practical AI features connected to real APIs, databases, and polished user interfaces.",
  },
  {
    title: "Reliable by Design",
    description:
      "Modular architecture, clean fallbacks, and interfaces that remain stable under failure.",
  },
] as const;

const stats = [
  "8 Hackathons",
  "AI/ML Projects",
  "Full-Stack Systems",
  "GitHub-Synced Portfolio",
] as const;

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="group rounded-3xl border border-zinc-800 bg-zinc-950/40 p-8 transition-colors duration-300 hover:border-violet-400/40 sm:p-10 lg:p-12"
        >
          <div className="space-y-10">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex rounded-full border border-zinc-800 bg-black/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-400">
                About
              </span>
              <div className="space-y-3">
                <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-tight tracking-tight text-white">
                  Technical execution with product discipline.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
                  I build usable systems, not isolated demos — combining clean UX, coherent
                  architecture, practical AI, and reliable API-driven products.
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.95fr] lg:gap-8">
              <div className="space-y-5">
                <p className="text-base leading-8 text-zinc-300">
                  I work at the intersection of AI/ML, full-stack engineering, and product
                  design. My projects combine modern interfaces, backend logic, data handling,
                  and deployment thinking into one coherent experience.
                </p>
                <p className="text-base leading-8 text-zinc-300">
                  I care about systems that are easy to read, easy to extend, and honest about
                  failure states. That includes secure API boundaries, resilient fallbacks, and
                  interfaces that stay calm when things go wrong.
                </p>
              </div>

              <div className="grid gap-4">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-zinc-800 bg-black/40 p-5"
                  >
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 border-t border-zinc-800/80 pt-6 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-800 bg-black/30 px-4 py-4 text-sm font-medium text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
