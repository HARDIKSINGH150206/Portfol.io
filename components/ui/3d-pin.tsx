"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type PinContainerProps = {
      title: string;
      href: string;
      children: ReactNode;
      className?: string;
      containerClassName?: string;
};

export function PinContainer({
      title,
      href,
      children,
      className,
      containerClassName,
}: PinContainerProps) {
      const [interactive, setInteractive] = useState(false);

      const pointerX = useMotionValue(0);
      const pointerY = useMotionValue(0);

      const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), {
            stiffness: 180,
            damping: 20,
            mass: 0.3,
      });
      const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), {
            stiffness: 180,
            damping: 20,
            mass: 0.3,
      });

      useEffect(() => {
            const media = window.matchMedia("(hover: hover) and (pointer: fine)");

            const updateInteractive = () => {
                  setInteractive(media.matches);
            };

            updateInteractive();
            media.addEventListener("change", updateInteractive);

            return () => {
                  media.removeEventListener("change", updateInteractive);
            };
      }, []);

      const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
            if (!interactive) {
                  return;
            }

            const rect = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            pointerX.set(x);
            pointerY.set(y);
      };

      const resetPointer = () => {
            pointerX.set(0);
            pointerY.set(0);
      };

      return (
            <div className={cn("group group/pin relative h-full w-full [perspective:1200px]", containerClassName)}>
                  <motion.div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={resetPointer}
                        onBlur={resetPointer}
                        className="block h-full w-full"
                        tabIndex={0}
                        style={{
                              rotateX: interactive ? rotateX : 0,
                              rotateY: interactive ? rotateY : 0,
                              transformStyle: "preserve-3d",
                        }}
                  >
                        <div
                              className="absolute -top-3 left-5 z-10"
                              style={{ transform: "translateZ(44px)" }}
                        >
                              <a
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="pointer-events-auto inline-flex translate-y-2 whitespace-nowrap rounded-full border border-violet-400/30 bg-black/90 px-4 py-2 text-sm text-violet-400 opacity-0 shadow-[0_0_24px_rgba(139,92,246,0.12)] transition-all duration-300 ease-out group-hover/pin:translate-y-0 group-hover/pin:opacity-100 group-focus-within/pin:translate-y-0 group-focus-within/pin:opacity-100"
                              >
                                    {title}
                              </a>
                        </div>

                        <div
                              className="absolute inset-0 rounded-3xl border border-violet-400/0 opacity-0 transition duration-300 group-hover/pin:opacity-100"
                              style={{
                                    transform: "translateZ(22px)",
                                    boxShadow: "0 18px 36px rgba(0, 0, 0, 0.35)",
                              }}
                              aria-hidden="true"
                        />

                        <div
                              className={cn(
                                    "relative h-full rounded-3xl border border-zinc-800 bg-zinc-950/70 transition-colors duration-300 group-hover/pin:border-violet-400/50",
                                    className,
                              )}
                              style={{ transform: "translateZ(28px)", transformStyle: "preserve-3d" }}
                        >
                              {children}
                        </div>
                  </motion.div>
            </div>
      );
}
