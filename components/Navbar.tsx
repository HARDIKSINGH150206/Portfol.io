"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Activity", href: "#activity" },
  { label: "Skills", href: "#skills" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Resume", href: "#resume" },
];

type NavbarProps = {
  githubUsername: string;
};

export default function Navbar({ githubUsername }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="container-shell grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-6">
        <div className="hidden md:block" />

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-text-secondary transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-4 md:flex">
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-4 py-2 text-sm text-text-secondary transition hover:border-accent-border hover:text-white"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Contact
          </a>
        </div>

        <div className="flex justify-end md:hidden">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="inline-flex rounded-full border border-border p-2 text-text-secondary transition hover:border-accent-border hover:text-white"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-navigation"
          className="border-t border-white/5 bg-black/95 md:hidden"
        >
          <div className="container-shell flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-sm text-text-secondary transition hover:bg-card hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 pt-2">
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-border px-3 py-3 text-sm text-text-secondary transition hover:border-accent-border hover:text-white"
              >
                GitHub
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white px-3 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
