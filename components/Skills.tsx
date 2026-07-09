"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const skillGroups = [
  {
    title: "Languages",
    items: ["C", "C++", "Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "FastAPI"],
  },
  {
    title: "Database",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    title: "AI/ML",
    items: ["NumPy", "Pandas", "Scikit-learn", "OpenCV"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Linux", "VS Code", "Obsidian"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Skills"
          title="Built across the stack, grounded in practical tools."
          description="These are the main tools and languages I use to ship interfaces, backend services, data work, and ML experiments."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
              className="surface-card p-6"
            >
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
