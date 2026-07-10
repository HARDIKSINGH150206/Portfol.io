"use client";

import { motion } from "framer-motion";

const achievements = [
  {
    title: "8 hackathons completed",
    description:
      "Repeated participation across fast-moving build environments shaped how I scope quickly, collaborate under pressure, and ship usable MVPs.",
  },
  {
    title: "Bharatiya Antariksh Hackathon",
    description:
      "Worked on space-tech problem solving with a focus on practical innovation, data interpretation, and product framing under hard constraints.",
  },
  {
    title: "SuryaCast-X",
    description:
      "AI-powered solar flare early-warning system using Aditya-L1 data, designed to support early detection and better interpretation of solar activity signals.",
  },
];

export default function Hackathons() {
  return (
    <section id="hackathons" className="section-shell">
      <div className="container-shell">
        <div className="mb-14 max-w-4xl">
          <h1 className="text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            HACKATHONS
          </h1>

          <h2 className="mt-5 max-w-3xl text-[clamp(1rem,1.5vw,1.25rem)] font-medium leading-8 text-violet-400">
            Fast execution under real constraints.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">
            Hackathons are where speed stops being theoretical. They expose product
            judgment, technical clarity, and whether an idea can survive deadline
            pressure.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <motion.article
              key={achievement.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
              className="surface-card p-6"
            >
              <h3 className="text-xl font-semibold text-white">{achievement.title}</h3>
              <p className="mt-4 text-sm leading-7 text-text-secondary">
                {achievement.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
