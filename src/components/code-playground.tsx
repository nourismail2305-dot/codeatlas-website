"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { SectionHeading } from "./section-heading";

const K = "text-accent";
const F = "text-beige";
const P = "text-foreground";
const M = "text-muted";

const tokens: { t: string; c: string }[] = [
  { t: "def ", c: K }, { t: "two_sum", c: F }, { t: "(nums, target):\n", c: P },
  { t: "    seen ", c: P }, { t: "= ", c: M }, { t: "{}\n", c: P },
  { t: "    for ", c: K }, { t: "i, n ", c: P }, { t: "in ", c: K }, { t: "enumerate", c: F }, { t: "(nums):\n", c: P },
  { t: "        if ", c: K }, { t: "target - n ", c: P }, { t: "in ", c: K }, { t: "seen:\n", c: P },
  { t: "            return ", c: K }, { t: "[seen[target - n], i]\n", c: P },
  { t: "        seen[n] ", c: P }, { t: "= ", c: M }, { t: "i", c: P },
];
const tokenStarts = tokens.reduce<number[]>((acc, _, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + tokens[i - 1].t.length);
  return acc;
}, []);
const total = tokens.reduce((a, t) => a + t.t.length, 0);

const tests = ["nums=[2,7,11,15], target=9", "nums=[3,2,4], target=6", "nums=[3,3], target=6"];

export function CodePlayground() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-150px" });
  const [count, setCount] = useState(0);
  const done = count >= total;

  useEffect(() => {
    if (!inView || done) return;
    const id = window.setTimeout(() => setCount((c) => Math.min(total, c + 2)), 28);
    return () => window.clearTimeout(id);
  }, [inView, count, done]);

  return (
    <section id="practice" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 sm:py-36">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Practice"
          title={
            <>
              Write code. <span className="font-serif font-normal italic text-beige">Get instant feedback.</span>
            </>
          }
          description="A full-featured editor right in your browser. Run tests, see complexity analysis, and compare your solution with the community. No setup, no installs."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative [perspective:1200px]"
        >
          <div aria-hidden className="absolute -inset-8 rounded-[40px] bg-accent/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-[#e2735f]/80" />
                <span className="size-3 rounded-full bg-beige/70" />
                <span className="size-3 rounded-full bg-accent/80" />
              </div>
              <span className="font-mono text-xs text-muted">two_sum.py</span>
              <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted">Easy</span>
            </div>
            <pre className="min-h-[220px] overflow-x-auto p-6 font-mono text-[13px] leading-7 sm:text-sm" aria-label="Two sum solution in Python">
              <code>
                {tokens.map((tok, i) => {
                  const available = count - tokenStarts[i];
                  if (available <= 0) return null;
                  const slice = tok.t.slice(0, available);
                  return (
                    <span key={i} className={tok.c}>
                      {slice}
                    </span>
                  );
                })}
                <span className={`ml-px inline-block h-4 w-2 translate-y-0.5 bg-accent ${done ? "animate-blink" : ""}`} />
              </code>
            </pre>
            <div className="border-t border-border bg-background/50 p-5">
              <div className="mb-3 flex items-center justify-between text-xs text-muted">
                <span className="tracking-widest uppercase">Test results</span>
                <AnimatePresence>
                  {done && (
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-accent">
                      {"O(n) time · beats 94%"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <ul className="flex flex-col gap-2">
                {tests.map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0.3 }}
                    animate={done ? { opacity: 1 } : { opacity: 0.3 }}
                    transition={{ delay: done ? 0.2 + i * 0.25 : 0 }}
                    className="flex items-center gap-3 font-mono text-xs text-muted"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={done ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.2 + i * 0.25, type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <CircleCheck className="size-4 text-accent" />
                    </motion.span>
                    {t}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
