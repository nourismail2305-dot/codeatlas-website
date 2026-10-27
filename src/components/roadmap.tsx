"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Brain, Cpu, Database, Layers, Network, Trophy } from "lucide-react";
import { SectionHeading } from "./section-heading";

const steps = [
  { icon: Layers, phase: "Phase 01", title: "Programming foundations", body: "Variables to recursion. Pick Python, JavaScript, or C and master the fundamentals.", weeks: "6 weeks" },
  { icon: Network, phase: "Phase 02", title: "Data structures & algorithms", body: "Arrays, graphs, dynamic programming, and the problem-solving patterns behind every interview.", weeks: "10 weeks" },
  { icon: Cpu, phase: "Phase 03", title: "Systems & architecture", body: "How computers actually work: memory, processes, concurrency, and networking.", weeks: "8 weeks" },
  { icon: Database, phase: "Phase 04", title: "Databases & backend", body: "SQL, indexing, transactions, and building APIs that scale.", weeks: "6 weeks" },
  { icon: Brain, phase: "Phase 05", title: "Specialize", body: "Choose your path: ML, security, web, or distributed systems.", weeks: "12 weeks" },
  { icon: Trophy, phase: "Phase 06", title: "Capstone & career", body: "Ship a portfolio project, ace mock interviews, and get referred.", weeks: "4 weeks" },
];

export function Roadmap() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="roadmap" className="relative scroll-mt-24 border-t border-border bg-surface/40 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Roadmaps"
            title={
              <>
                A clear path, <span className="font-serif font-normal italic text-beige">step by step.</span>
              </>
            }
            description="Our flagship Computer Science roadmap mirrors a top-tier university degree, reorganized for self-learners. Track progress, earn badges, and never wonder what to learn next."
          />
        </div>

        <ol ref={ref} className="relative flex flex-col gap-6 pl-12">
          <span aria-hidden className="absolute top-2 bottom-2 left-[19px] w-px bg-border" />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-gradient-to-b from-accent via-accent to-beige shadow-[0_0_12px_var(--accent)]"
          />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
                  className="absolute top-6 -left-12 flex size-10 items-center justify-center rounded-full border border-accent/40 bg-background"
                >
                  <Icon className="size-4 text-accent" />
                </motion.span>
                <div className="rounded-2xl border border-border bg-background/60 p-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-beige/25 group-hover:bg-surface">
                  <div className="flex items-center justify-between text-xs tracking-widest text-muted uppercase">
                    <span>{s.phase}</span>
                    <span className="rounded-full border border-border px-2.5 py-1 tracking-normal normal-case">{s.weeks}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-medium tracking-tight text-foreground">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </div>
                <span className="sr-only">Step {i + 1} of {steps.length}</span>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
