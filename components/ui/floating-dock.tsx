"use client";

import type { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutGrid } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type FloatingDockItem = {
  title: string;
  href: string;
  icon: ReactNode;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  download?: boolean;
};

type FloatingDockProps = {
  items: FloatingDockItem[];
  className?: string;
  mobileClassName?: string;
};

export function FloatingDock({
  items,
  className,
  mobileClassName,
}: FloatingDockProps) {
  return (
    <>
      <DesktopDock items={items} className={className} />
      <MobileDock items={items} className={mobileClassName} />
    </>
  );
}

function DesktopDock({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "hidden items-center gap-2 rounded-2xl border border-white/10 bg-[#050505]/95 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur md:inline-flex",
        className,
      )}
    >
      {items.map((item) => (
        <motion.a
          key={item.title}
          href={item.href}
          target={item.target}
          rel={item.rel}
          download={item.download}
          title={item.title}
          aria-label={item.title}
          whileHover={{ y: -2, scale: 1.03 }}
          whileFocus={{ y: -2, scale: 1.03 }}
          className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-transparent bg-transparent text-text-secondary transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.03] hover:text-white focus-visible:border-accent-border focus-visible:text-white"
        >
          <span className="text-[1.15rem]">{item.icon}</span>
          <span className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#050505] px-3 py-1 text-xs text-white opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            {item.title}
          </span>
        </motion.a>
      ))}
    </div>
  );
}

function MobileDock({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("md:hidden", className)}>
      <div className="relative inline-flex max-w-full flex-col items-start">
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-3 grid max-w-[calc(100vw-2.5rem)] grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-[#050505]/95 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur sm:grid-cols-6"
            >
              {items.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  download={item.download}
                  title={item.title}
                  aria-label={item.title}
                  className="inline-flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl border border-transparent px-3 py-3 text-center text-[0.7rem] text-text-secondary transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.03] hover:text-white focus-visible:border-accent-border focus-visible:text-white"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-[1.1rem]">{item.icon}</span>
                  <span className="truncate">{item.title}</span>
                </a>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close quick links" : "Open quick links"}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/10 bg-[#050505]/95 px-4 text-sm text-text-secondary shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur transition-colors duration-200 hover:border-accent-border hover:text-white"
        >
          <IconLayoutGrid size={18} stroke={1.8} />
          Quick links
        </button>
      </div>
    </div>
  );
}
