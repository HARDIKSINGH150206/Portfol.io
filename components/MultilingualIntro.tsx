"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = ["Hello", "नमस्ते", "Hola", "Bonjour", "こんにちは", "Ciao"];

const WORD_DURATION = 650;
const INTRO_DURATION = greetings.length * WORD_DURATION + 500;

export default function MultilingualIntro() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      const timer = window.setTimeout(() => {
        setVisible(false);
      }, 700);

      return () => window.clearTimeout(timer);
    }

    const interval = window.setInterval(() => {
      setIndex((current) => {
        if (current >= greetings.length - 1) {
          return current;
        }

        return current + 1;
      });
    }, WORD_DURATION);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, INTRO_DURATION);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(hideTimer);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={greetings[index]}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="select-none text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl"
              >
                {greetings[index]}
              </motion.h1>
            </AnimatePresence>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 96, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 h-px bg-violet-400/60"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
