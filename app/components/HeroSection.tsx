"use client";

import { motion } from "framer-motion";

export default function HeroSection({ onStartClick }: { onStartClick: () => void }) {
  return (
    <section className="forge-bg ember-grid relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-64 w-96 rounded-full bg-accent/15 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex max-w-2xl flex-col items-center gap-5"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent-2"
        >
          <span>⚒️</span> AI org architect · Free · No signup
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Forge the roles
          <br />
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            your org needs next.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="max-w-lg text-base text-muted sm:text-lg"
        >
          Intelligence is becoming infrastructure. The organisations that win the next decade
          aren&apos;t just hiring engineers — they&apos;re building entirely new roles that don&apos;t
          exist on most org charts yet.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onStartClick}
          className="rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 active:scale-95 transition-all"
        >
          Build my org blueprint →
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} className="h-4 w-px bg-muted/50" />
      </motion.div>
    </section>
  );
}
