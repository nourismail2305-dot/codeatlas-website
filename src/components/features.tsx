"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { BookOpen, Briefcase, Hammer, Sparkles, Terminal } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

type Feature = { icon: typeof BookOpen; title: string; body: string; className: string; visual?: ReactNode };

function ProgressVisual() {
  const bars = [92, 68, 45, 80, 30];
  return (
    <div className="mt-8 flex flex-col gap-3">
      {["Arrays", "Graphs", "DP", "Trees", "Tries"].map((l, i) => (
        <div key={l} className="flex items-center gap-3 text-xs text-muted">
          <span className="w-12">{l}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${bars[i]}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="mt-8 flex flex-col gap-2 text-sm">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-surface-2 px-4 py-2.5 text-foreground"
      >
        Why is my BFS so slow?
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="max-w-[90%] rounded-2xl rounded-bl-sm border border-accent/20 bg-accent/10 px-4 py-2.5 text-beige"
      >
        {"You're using list.pop(0), which is O(n). Try collections.deque for O(1) pops."}
      </motion.div>
    </div>
  );
}

const features: Feature[] = [
  {
    icon: BookOpen,
    title: "Learn with structured courses",
    body: "University-grade curricula broken into bite-sized lessons with interactive visualizations.",
    className: "md:col-span-2",
    visual: <ProgressVisual />,
  },
  {
    icon: Sparkles,
    title: "AI tutor on every page",
    body: "Stuck? Get hints, not answers. Our tutor guides you to the solution.",
    className: "md:row-span-2",
    visual: <ChatVisual />,
  },
  {
    icon: Terminal,
    title: "Practice in-browser",
    body: "3,400+ problems with instant feedback in 12 languages.",
    className: "",
  },
  {
    icon: Hammer,
    title: "Ship real projects",
    body: "Build a compiler, a database, a chat server. Portfolio-ready.",
    className: "",
  },
  {
    icon: Briefcase,
    title: "Land the job",
    body: "Mock interviews, resume reviews, and curated job boards for new grads and career switchers.",
    className: "md:col-span-3",
  },
];

function SpotlightCard({ feature, index }: { feature: Feature; index: number }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const background = useTransform(
    [mx, my],
    ([x, y]) => `radial-gradient(420px circle at ${x}px ${y}px, rgba(159,211,138,0.12), transparent 60%)`,
  );
  const Icon = feature.icon;

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    if (reduce) return;
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -6);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 6);
  }

  function onLeave() {
    mx.set(-200);
    my.set(-200);
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn("[perspective:1000px]", feature.className)}
    >
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry }}
        className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-beige/20"
      >
        <motion.div aria-hidden style={{ background }} className="pointer-events-none absolute inset-0" />
        <div className="relative">
          <div className="mb-6 flex size-11 items-center justify-center rounded-2xl border border-border bg-surface-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="size-5 text-accent" />
          </div>
          <h3 className="text-xl font-medium tracking-tight text-foreground">{feature.title}</h3>
          <p className="mt-2 max-w-md leading-relaxed text-muted">{feature.body}</p>
          {feature.visual}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 sm:py-36">
      <SectionHeading
        eyebrow="The platform"
        title={
          <>
            One atlas for your <span className="font-serif font-normal italic text-beige">entire</span> CS journey.
          </>
        }
        description="Stop stitching together tutorials, bootcamps, and forums. CodeAtlas connects learning, practice, projects, and careers in one place."
      />
      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {features.map((f, i) => (
          <SpotlightCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}
