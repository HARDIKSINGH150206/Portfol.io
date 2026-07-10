"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`mb-12 flex max-w-2xl flex-col gap-4 ${alignment}`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
        {eyebrow}
      </span>
      <div className="space-y-3">
        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-tight tracking-tight text-white">
          {title}
        </h2>
        <p className="max-w-3xl text-[clamp(1rem,1.5vw,1.25rem)] leading-8 text-zinc-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
