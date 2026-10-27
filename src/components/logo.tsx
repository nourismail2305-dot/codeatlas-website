export function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="CodeAtlas home">
      <span className="relative flex size-8 items-center justify-center rounded-full border border-beige/30 bg-surface">
        <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-700 group-hover:rotate-[180deg]" aria-hidden>
          <circle cx="12" cy="12" r="9" fill="none" stroke="var(--beige)" strokeWidth="1.2" opacity="0.5" />
          <path d="M12 3 L14.2 12 L12 21 L9.8 12 Z" fill="var(--accent)" />
          <circle cx="12" cy="12" r="1.6" fill="var(--background)" />
        </svg>
      </span>
      <span className="text-lg font-medium tracking-tight text-foreground">
        Code<span className="font-serif text-xl italic text-beige">Atlas</span>
      </span>
    </a>
  );
}
