"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "./magnetic";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [64, 32]);

  return (
    <section ref={ref} id="cta" className="scroll-mt-24 px-4 py-28 sm:py-36">
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="relative mx-auto max-w-6xl overflow-hidden border border-border bg-surface px-6 py-24 text-center sm:py-32"
      >
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute top-1/2 left-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent,rgba(159,211,138,0.18),transparent_30%,rgba(217,201,168,0.14),transparent_60%)] blur-2xl"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-5xl leading-[1] font-medium tracking-tight text-balance text-foreground sm:text-7xl">
            Your next chapter starts with <span className="font-serif font-normal italic text-accent">one lesson.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-pretty text-muted">
            Create a free account in seconds. No credit card, no trial, no catch.
          </p>
          <div className="mt-10 flex justify-center">
            <Magnetic>
              <a
                href="#top"
                className="group flex items-center gap-2 rounded-full bg-foreground px-8 py-4 font-medium text-background transition-transform hover:scale-105"
              >
                Create your free account
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
