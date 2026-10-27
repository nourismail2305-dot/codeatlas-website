"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { AtlasGlobe } from "./atlas-globe";
import { Magnetic } from "./magnetic";

const ease = [0.22, 1, 0.36, 1] as const;
const subscribeNoop = () => () => {};
const lineOne = ["Map", "your", "way", "through"];
const lineTwo = ["computer", "science."];

function Word({ word, index, className }: { word: string; index: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-2 align-bottom">
      <motion.span
        className={`inline-block ${className ?? ""}`}
        initial={{ y: "110%", rotate: 6, filter: "blur(8px)" }}
        animate={{ y: "0%", rotate: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.25 + index * 0.08, ease }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const globeY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_45%,rgba(159,211,138,0.12),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />

      <motion.div
        style={mounted ? { scale: globeScale, y: globeY, opacity: fade } : undefined}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
        className="pointer-events-none absolute top-1/2 right-[-25%] aspect-square w-[130vw] -translate-y-1/2 sm:right-[-15%] sm:w-[85vw] lg:right-[-8%] lg:w-[58vw] lg:max-w-[860px]"
      >
        <AtlasGlobe />
      </motion.div>

      <motion.div style={mounted ? { y: textY, opacity: fade } : undefined} className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 py-1.5 pr-4 pl-1.5 text-sm text-muted backdrop-blur"
        >
          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">New</span>
          AI tutor now included, free forever
        </motion.div>

        <h1 className="max-w-3xl text-5xl leading-[0.95] font-medium tracking-tight text-balance text-foreground sm:text-7xl lg:text-8xl">
          <span className="block">
            {lineOne.map((w, i) => (
              <span key={w}>
                <Word word={w} index={i} />{" "}
              </span>
            ))}
          </span>
          <span className="block">
            {lineTwo.map((w, i) => (
              <span key={w}>
                <Word word={w} index={i + lineOne.length} className="text-shimmer animate-shimmer font-serif italic font-normal" />{" "}
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted"
        >
          Guided roadmaps, thousands of practice problems, real-world projects, and career prep.
          Everything you need to go from first line of code to first job, at zero cost.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#cta"
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-4 font-medium text-background shadow-[0_0_40px_-8px_var(--accent)] transition-shadow hover:shadow-[0_0_60px_-4px_var(--accent)]"
            >
              <span className="relative z-10">Start learning free</span>
              <ArrowRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href="#roadmap"
              className="group flex items-center gap-3 rounded-full border border-border px-6 py-4 text-foreground backdrop-blur transition-colors hover:border-beige/40 hover:bg-surface"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-beige/15">
                <Play className="size-3 fill-beige text-beige" />
              </span>
              Explore roadmaps
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-14 flex items-center gap-4 text-sm text-muted"
        >
          <div className="flex -space-x-2">
            {["#d9c9a8", "#9fd38a", "#c2b28f", "#5e9b4e"].map((c, i) => (
              <motion.span
                key={c}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4 + i * 0.08, type: "spring", stiffness: 300, damping: 15 }}
                className="size-8 rounded-full border-2 border-background"
                style={{ background: c }}
              />
            ))}
          </div>
          <span>
            Joined by <strong className="font-medium text-foreground">48,000+</strong> learners this year
          </span>
        </motion.div>
      </motion.div>

      <motion.a
        href="#features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase md:flex"
        aria-label="Scroll to features"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-beige"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
