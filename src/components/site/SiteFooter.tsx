import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./SiteHeader";

const COLUMNS: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { to: "/", label: "Home" },
      { to: "/#feature", label: "Features" },
      { to: "/#usecase", label: "Usecase" },
      { to: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About us" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface/40">
      <div className="grid-veil pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Autonomous Mobility Intelligence for automotive manufacturers, fleet operators and
              logistics networks. Sensor-to-decision infrastructure, built for scale.
            </p>
            <Link
              to="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-sm text-primary"
            >
              Talk to our mobility team
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[11px] tracking-[0.22em] text-foreground/70 uppercase">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l, i) => (
                    <li key={`${l.to}-${i}`}>
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://autoviax.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
              style={{ color: "#97D1F4" }}
            >
              Autoviax.net
            </a>{" "}
            - Autonomous Mobility Intelligence.
          </p>
          <p className="font-mono tracking-widest uppercase">
            · Sri Lanka · USA
          </p>
        </div>
      </div>
    </footer>
  );
}
