import { Logo } from "./logo";

const columns = [
  { title: "Learn", links: ["Courses", "Roadmaps", "Visualizers"] },
  { title: "Practice", links: ["Problems", "Contests", "Projects"] },
  { title: "Company", links: ["About", "Open source", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The free computer science learning, practice, project, and career platform.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-medium text-foreground">{c.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="text-sm text-muted transition-colors hover:text-beige">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden">
        <p
          aria-hidden
          className="mx-auto -mb-[0.22em] max-w-6xl px-6 text-center font-serif text-[22vw] leading-none text-surface-2 select-none lg:text-[220px]"
        >
          CodeAtlas
        </p>
      </div>
    </footer>
  );
}
