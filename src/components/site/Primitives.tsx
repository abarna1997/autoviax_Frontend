import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 px-4 py-14 sm:scroll-mt-28 sm:px-8 sm:py-20 md:py-28", className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-[0.22em] text-primary uppercase",
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-primary" />
      {children}
    </span>
  );
}

export function GlassCard({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-2xl",
        hover &&
          "transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_30px_80px_-40px] hover:shadow-primary/50",
        className,
      )}
    >
      {children}
    </div>
  );
}

type CTAProps = {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
};

export function CTAButton({ to, children, variant = "primary", className, target, rel }: CTAProps) {
  const isExternal = /^https?:\/\//.test(to) || to.startsWith("//");
  const resolvedTarget = target ?? (isExternal ? "_blank" : undefined);
  const resolvedRel = rel ?? (resolvedTarget === "_blank" ? "noopener noreferrer" : undefined);

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all duration-300";

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/30 opacity-0 transition-opacity duration-300 group-hover:animate-sweep group-hover:opacity-100" />
      )}
    </>
  );

  const classes = cn(
    base,
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:shadow-[0_18px_50px_-18px] hover:shadow-primary/80"
      : "border border-border text-foreground hover:border-primary/40 hover:bg-secondary/60",
    className,
  );

  if (isExternal) {
    return (
      <a
        href={to}
        target={resolvedTarget}
        rel={resolvedRel}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={to}
      target={resolvedTarget}
      rel={resolvedRel}
      className={classes}
    >
      {content}
    </Link>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-border pl-3 sm:pl-4">
      <div className="font-display text-2xl font-semibold text-foreground min-[400px]:text-3xl md:text-4xl">{value}</div>
      <div className="mt-1 text-[10px] tracking-wide text-muted-foreground uppercase sm:text-xs">{label}</div>
    </div>
  );
}

export function AmbientGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full bg-primary/12 blur-[120px] md:bg-primary/15",
        className,
      )}
    />
  );
}
