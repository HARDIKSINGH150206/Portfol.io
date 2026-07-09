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
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="muted-copy text-base sm:text-lg">{description}</p>
      </div>
    </motion.div>
  );
}
