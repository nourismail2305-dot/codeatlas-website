const rowOne = ["Data Structures", "Algorithms", "Operating Systems", "Computer Networks", "Databases", "Compilers", "Distributed Systems"];
const rowTwo = ["Machine Learning", "System Design", "Web Development", "Cryptography", "Discrete Math", "Computer Architecture", "Cloud"];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden mask-fade-x">
      <ul
        className={`flex w-max shrink-0 items-center gap-4 pr-4 group-hover:[animation-play-state:paused] ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {[...items, ...items].map((t, i) => (
          <li
            key={`${t}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-4 text-2xl whitespace-nowrap text-muted transition-colors hover:text-foreground sm:text-4xl"
          >
            <span className={i % 2 ? "font-serif italic" : "font-medium tracking-tight"}>{t}</span>
            <span className="size-2 rounded-full bg-accent/60" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TopicMarquee() {
  return (
    <section aria-label="Topics covered" className="flex flex-col gap-6 border-y border-border py-12">
      <Row items={rowOne} />
      <Row items={rowTwo} reverse />
    </section>
  );
}
