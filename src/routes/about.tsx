import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Compass, Eye, Handshake } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { AmbientGlow, CTAButton, Eyebrow, GlassCard, Section } from "@/components/site/Primitives";
import opsRoom from "@/assets/ops-room.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AutoViaX — The Team Behind Mobility Intelligence" },
      {
        name: "description",
        content:
          "AutoViaX was founded to make autonomous mobility operable at network scale. Our story, mission, leadership and partner ecosystem.",
      },
      { property: "og:title", content: "About AutoViaX" },
      {
        property: "og:description",
        content:
          "Founded by autonomy, logistics and safety engineers building the intelligence layer for autonomous fleets.",
      },
    ],
  }),
  component: About,
});

const TIMELINE = [
  {
    year: "2023",
    title: "A control room, not a car",
    body: "Our founders were running autonomous pilots at an OEM and a port operator. The vehicles worked. The network around them did not. That gap became the company.",
  },
  {
    year: "2024",
    title: "First corridor live",
    body: "A 340 km hub-to-hub freight corridor ran for twelve months on an early build of the decision core, with full intervention traceability.",
  },
  {
    year: "2025",
    title: "From pilot to platform",
    body: "Adapters for major OEM stacks, TMS and telematics shipped, letting operators deploy without replacing existing systems.",
  },
  {
    year: "2026",
    title: "Network scale",
    body: "AutoViaX now coordinates mixed autonomy fleets across four continents, with an environmental ledger accepted by external auditors.",
  },
];

const LEADERS = [
  {
    name: "Tharindu Jayasinghe",
    role: "Founder & CEO",
    note: "Built AutoViaX to close the gap between autonomous vehicles and the networks meant to run them.",
    image: "/L1.png",
  },
  {
    name: "Li Wei",
    role: "Co-founder & CTO",
    note: "Perception and sensor-fusion architect.",
    image: "/L2.png",
  },
  {
    name: "Nadia Putri",
    role: "Chief Safety Officer",
    note: "Homologation and functional-safety lead.",
    image: "/L4.png",
  },
  {
    name: "Kenji Tanaka",
    role: "VP Logistics Networks",
    note: "20 years in port and long-haul operations.",
    image: "/L3.png",
  },
  {
    name: "Meera Rajan",
    role: "Head of Applied Research",
    note: "Reinforcement learning for fleet control.",
    image: "/L5.png",
  },
  {
    name: "Dilani Fernando",
    role: "VP Sustainability",
    note: "Built the platform's emissions ledger.",
    image: "/L6.png",
  },
];

const PARTNERS = [
  "Velocore Powertrain",
  "Nordhaul Freight",
  "Meridian Auto Group",
  "Kairos Logistics",
  "Portway Terminals",
  "Axleborn Systems",
  "Helix Charging",
  "Northbeam Insurance",
];

function About() {
  return (
    <>
      {/* Editorial hero */}
      <section className="relative overflow-hidden px-5 pt-36 pb-16 sm:px-8 sm:pt-44">
        <AmbientGlow className="top-0 right-0 h-[30rem] w-[30rem]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <Reveal>
            <Eyebrow>Est. 2023 · Sri Lanka</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-8 max-w-5xl text-[2.4rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem]">
              We build the layer that makes autonomy{" "}
              <span className="text-gradient">operable</span>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-[1fr_1fr_1fr]">
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-2 md:text-base">
                AutoViaX exists because autonomous vehicles matured faster than the networks meant to
                run them. We are engineers from automotive autonomy, port logistics and functional
                safety, building one intelligence spine so fleets can move from supervised pilots to
                dependable, certifiable operations.
              </p>

            </div>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed editorial image */}
      <Reveal>
        <div className="relative mx-auto max-w-[1800px] px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <img
              src="/about.png"
              loading="lazy"
              width={1600}
              height={1008}
              alt="Mobility operations control room with large glowing screens"
              className="h-[280px] w-full object-cover sm:h-[420px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-md text-sm text-foreground/80 sm:text-base">
              Our first joint operations centre with Sri Lanka and USA, the room where the platform
              stopped being a prototype.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Scrollytelling timeline */}
      <Section>
        <Reveal>
          <Eyebrow>Our story</Eyebrow>
        </Reveal>
        <div className="mt-12 space-y-0">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 60}>
              <article className="group grid gap-6 border-t border-border py-10 md:grid-cols-[160px_1fr_1fr] md:gap-12">
                <span className="font-mono text-sm text-primary">{t.year}</span>
                <h2 className="text-2xl transition-colors duration-500 group-hover:text-primary sm:text-3xl">
                  {t.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Mission & vision */}
      <Section className="relative">
        <AmbientGlow className="bottom-0 -left-32 h-[24rem] w-[24rem]" />
        <div className="relative grid gap-4 md:grid-cols-2">
          {[
            {
              icon: Compass,
              tag: "Mission",
              title: "Make every autonomous movement accountable",
              body: "We give operators one decision layer where safety, service and sustainability are computed together , never traded off in the dark.",
            },
            {
              icon: Eye,
              tag: "Vision",
              title: "Networks that improve with every kilometre",
              body: "A world where mobility infrastructure learns continuously, so each trip makes the next one safer, cleaner and more predictable.",
            },
          ].map((c, i) => (
            <Reveal key={c.tag} delay={i * 100}>
              <GlassCard className="h-full p-8 sm:p-10">
                <c.icon className="h-6 w-6 text-primary" />
                <p className="mt-6 font-mono text-[11px] tracking-[0.24em] text-primary uppercase">
                  {c.tag}
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl">{c.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section>
      <Reveal>
        <Eyebrow>Leadership</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl sm:text-4xl">
          Operators and engineers, not spectators
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEADERS.map((l, i) => (
          <Reveal key={l.name} delay={i * 60}>
            <GlassCard className="group h-full p-6">
              <div className="relative h-60 w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-secondary via-surface to-void">
                <div className="absolute inset-0 z-10 grid-veil opacity-40 pointer-events-none" />
                {l.image ? (
                  <img
                    src={l.image}
                    alt={l.name}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute bottom-3 left-4 font-display text-4xl text-primary/30">
                    {l.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{l.name}</h3>
              <p className="mt-1 text-sm text-primary">{l.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.note}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>

      <Section className="pb-28">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-12 md:flex-row md:items-center">
            <h2 className="max-w-xl text-2xl sm:text-3xl">
              Building the same thing we are? Let's talk.
            </h2>
            <CTAButton to="/contact">
              Contact the team <ArrowRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
