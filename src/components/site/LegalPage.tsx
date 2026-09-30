import { ChevronDown } from "lucide-react";
import { AmbientGlow, Eyebrow, GlassCard } from "./Primitives";
import { Reveal } from "./Reveal";

export type LegalSection = {
  id: string;
  title: string;
  body?: string[];
  list?: string[];
};

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="relative overflow-hidden px-5 pt-32 pb-8 sm:px-8 sm:pt-40 md:pt-44">
        <AmbientGlow className="top-[-6rem] left-1/2 h-[24rem] w-[24rem] -translate-x-1/2" />
        <div className="relative mx-auto w-full max-w-4xl">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 text-3xl sm:text-5xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {updated}
            </p>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground">{intro}</p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-28 sm:px-8 sm:gap-10 lg:grid-cols-[240px_1fr]">
        {/* Mobile & Tablet Quick Jump Navigation */}
        <div className="lg:hidden">
          <GlassCard hover={false} className="p-4">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-primary">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Table of Contents ({sections.length} Sections)
                </span>
                <ChevronDown className="h-4 w-4 text-primary transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <nav className="mt-3 divide-y divide-border/40 border-t border-border/50 pt-2 max-h-60 overflow-y-auto">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block py-2 text-sm text-muted-foreground transition-colors hover:text-primary active:text-primary"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </details>
          </GlassCard>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
              Contents
            </p>
            <nav className="mt-4 space-y-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <GlassCard hover={false} className="p-6 sm:p-10">
          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="text-xl text-foreground sm:text-2xl">{s.title}</h2>
                {s.body?.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-7 text-muted-foreground">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-3">
                    {s.list.map((li) => (
                      <li key={li.slice(0, 24)} className="flex gap-3 text-[15px] leading-7 text-muted-foreground">
                        <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}
