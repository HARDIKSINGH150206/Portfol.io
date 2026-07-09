import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        card: "var(--card)",
        "card-hover": "var(--card-hover)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-border": "var(--accent-border)",
        "text-main": "var(--text-main)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124, 109, 255, 0.35), 0 18px 60px rgba(6, 8, 18, 0.4)",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
