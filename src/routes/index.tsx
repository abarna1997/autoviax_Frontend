import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Brain,
  Cpu,
  Layers,
  Leaf,
  Radar,
  Route as RouteIcon,
  ShieldCheck,
  Truck,
  Waypoints,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";
import { AmbientGlow, CTAButton, Eyebrow, GlassCard, Section, Stat } from "@/components/site/Primitives";
import { OpsDashboard } from "@/components/site/OpsDashboard";
import { RouteGraphic } from "@/components/site/RouteGraphic";
import { PricingSection } from "@/components/site/PricingSection";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoViaX — Autonomous Mobility Intelligence Platform" },
      {
        name: "description",
        content:
          "AutoViaX turns sensor, fleet and route data into autonomous decisions for automotive manufacturers and logistics networks.",
      },
      { property: "og:title", content: "AutoViaX — Autonomous Mobility Intelligence" },
      {
        property: "og:description",
        content:
          "Sensor-to-decision infrastructure for autonomous fleets: perception, routing, energy and compliance in one intelligence layer.",
      },
    ],
  }),
  component: Home,
});

const PARTNERS = ["ATLAS MOTORS", "NORTHSTAR AUTOMOTIVE", "VERTEX LOGISTICS", "SUMMIT FREIGHT", "PORTWAY MOBILITY", "URBANDRIVE"];

const FEATURES = [
  {
    icon: "/f1.svg",
    title: "Multi-sensor perception fusion",
    body: "LiDAR, radar, camera and V2X streams reconciled into a single, time-aligned world model with sub-100ms edge latency.",
  },
  {
    icon: "/f2.svg",
    title: "Decision intelligence core",
    body: "Scenario models score every dispatch, handover and reroute against safety, cost and service-level constraints.",
  },
  {
    icon: "/f3.svg",
    title: "Continuous route optimisation",
    body: "Corridors recalculate live against traffic, weather, charge state and depot capacity , not once a day.",
  },
  {
    icon: "/f4.svg",
    title: "Environmental accounting",
    body: "Per-trip CO₂e, energy intensity and regulatory reporting generated from the same telemetry that drives operations.",
  },
  {
    icon: "/f5.svg",
    title: "Safety assurance layer",
    body: "Every autonomous intervention is captured, replayable and auditable for homologation and insurer review.",
  },
  {
    icon: "/f6.svg",
    title: "Open architecture",
    body: "Vehicle-agnostic adapters for OEM stacks, TMS, WMS and telematics , deploy without replacing your systems.",
  },
];

const USE_CASES = [
  {
    image: "/u1.png",
    tag: "Logistics",
    title: "Long-haul autonomous corridors",
    body: "Hub-to-hub freight with dynamic convoying, driver handover orchestration and predictive dwell management.",
  },
  {
    image: "/u2.png",
    tag: "Yard & port",
    title: "Closed-campus automation",
    body: "Terminal tractors, shuttles and yard moves coordinated on one intelligence layer with zero-collision policy.",
  },
  {
    image: "/u3.png",
    tag: "Automotive OEM",
    title: "Fleet learning loops",
    body: "Field telemetry flows back into perception and control model training with lineage and consent preserved.",
  },
  {
    image: "/u4.png",
    tag: "Urban mobility",
    title: "Shared autonomous services",
    body: "Demand forecasting, depot charging and rebalancing tuned to service-level guarantees across a city grid.",
  },
];


const TESTIMONIALS = [
  {
    quote:
      "We went from reactive dispatch to predictive routing in one quarter. Our fleet utilization has never been this consistent.",
    name: "Priya Ramanathan",
    role: "VP Fleet Operations, Cardinion Motors",
    image: "/T1.svg",
  },
  {
    quote:
      "The environmental reporting alone justified the investment. What used to take our team weeks now happens automatically.",
    name: "James Whitfield",
    role: "Chief Operations Officer, Ironhaul Freight",
    image: "/T2.svg",
  },
  {
    quote:
      "It gave every corridor a single source of truth. Our engineers and our auditors are finally looking at the same numbers.",
    name: "Camila Ferreira",
    role: "Director of Autonomous Systems, Voltrace Logistics",
    image: "/T3.svg",
  },
  {
    quote:
      "Deployment was faster than anything we had budgeted for. No rip and replace, just better decisions layered on top of what we already run.",
    name: "David Okafor",
    role: "Head of Fleet Engineering, Beacon Transit Group",
    image: "/T4.svg",
  },
  {
    quote:
      "We finally have visibility across every yard, every route and every vehicle in one place. That changes how we plan, not just how we react.",
    name: "Hana Kobayashi",
    role: "VP Logistics Strategy, Fleetstrand",
    image: "/T5.svg",
  },
  {
    quote:
      "Our intervention rate dropped within the first quarter of rollout. The platform earns operator trust faster than anything else we tested.",
    name: "Marcus Odell",
    role: "Director of Autonomous Operations, Dravenport Autonomy",
    image: "/T6.svg",
  },
];

const FAQ = [
  {
    q: "Does AutoViaX replace our existing telematics or TMS?",
    a: "No. AutoViaX sits above them as an intelligence layer. Adapters ingest from your existing telematics, TMS, WMS and OEM data platforms, and decisions are pushed back into the systems your teams already use.",
  },
  {
    q: "What level of autonomy does the platform support?",
    a: "The platform is autonomy-tier agnostic. It runs mixed fleets , human-driven, ADAS-assisted and fully autonomous units , on the same orchestration model, which is how most operators actually transition.",
  },
  {
    q: "How is safety data handled for homologation?",
    a: "Every perception frame, decision and intervention is captured with immutable lineage, replayable in the scenario studio, and exportable in regulator-ready formats.",
  },
  {
    q: "How long does deployment take?",
    a: "A single-corridor pilot typically goes live in 6–8 weeks. Network-wide rollout depends on adapter coverage and is generally staged over two to three quarters.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 md:pb-24">
        <AmbientGlow className="top-[-12rem] left-1/2 h-[36rem] w-[36rem] -translate-x-1/2" />
        <div className="grid-veil pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <Eyebrow>Autonomous Mobility Intelligence</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-3xl font-semibold leading-[1.06] break-words min-[400px]:text-4xl sm:text-6xl lg:text-[4.2rem]">
                <span className="text-gradient">Every vehicle</span>
                <br />
                becomes a decision.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground md:text-lg">
                AutoViaX converts raw sensor, fleet and network telemetry into autonomous action ,
                routing, dispatch, energy and compliance orchestrated in one intelligence layer built
                for automotive manufacturers and logistics operators.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 sm:mt-9 flex flex-wrap gap-3">
                <CTAButton to="/contact">
                  Book a demo <ArrowRight className="h-4 w-4" />
                </CTAButton>
                <CTAButton to="/product" variant="ghost">
                  Explore the platform
                </CTAButton>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6">
                <Stat value="4.2M" label="Autonomous km / week" />
                <Stat value="61%" label="Fewer interventions" />
                <div className="col-span-2 sm:col-span-1">
                  <Stat value="18.4kt" label="CO₂e avoided / yr" />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="relative">
            <div className="relative overflow-visible">
              <img
                src="/hero.svg" // transparent PNG or SVG
                width={1600}
                height={1200}
                alt="AutoViaX Autonomous Vehicle"
                className="h-full w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partners */}
      <Section className="py-12 md:py-14">
        <Reveal>
          <p className="text-center font-mono text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
            Trusted by mobility and logistics leaders
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="text-center font-display text-sm tracking-[0.18em] text-foreground/40 transition-colors duration-300 hover:text-primary"
              >
                {p}
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Positioning */}
      <Section className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <Eyebrow>The positioning</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              Autonomy is not a vehicle problem. It is a network problem.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base leading-relaxed text-muted-foreground">
              Sensors already see enough. What fleets lack is a layer that reconciles thousands of
              simultaneous observations into one defensible decision , fast enough to act, traceable
              enough to certify. AutoViaX is that layer: an intelligence spine spanning the vehicle
              edge, the depot and the enterprise, so autonomy scales as an operating model rather than
              a pilot.
            </p>
          </Reveal>
        </div>
        <div className="hairline mt-14 h-px w-full" />
      </Section>

      {/* Features */}
      <Section id="feature">
        <Reveal>
          <Eyebrow>Capabilities</Eyebrow>

          <h2 className="mt-5 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
            Built differently, from the sensor up
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <GlassCard className="group h-full p-6">
                {/* Icon */}
                <div className="grid h-14 w-14 place-items-center rounded-xl border border-primary/25 bg-primary/10 p-2">
                  <img
                    src={f.icon}
                    alt={f.title}
                    className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-semibold">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>

                {/* Hover line */}
                <div className="hairline mt-6 h-px w-0 transition-all duration-500 group-hover:w-full" />
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Dashboard preview */}
      <Section className="relative">
        <AmbientGlow className="top-1/3 -left-40 h-[28rem] w-[28rem]" />
        <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <Eyebrow>Live operations</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl">One control surface for the whole network</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Operators see autonomy health, corridor performance, energy and emissions in a single
              live view , with the same data lineage engineers and auditors rely on.
            </p>
            <Link
              to="/product"
              className="group mt-7 inline-flex items-center gap-2 text-sm text-primary"
            >
              See the full product
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <OpsDashboard />
          </Reveal>
        </div>
      </Section>

      <Section className="relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/Reason%20(3).svg')",
          }}
        />

        {/* Dark overlay responsive for mobile and desktop */}
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-black/95 via-black/85 sm:via-black/60 to-black/65 sm:to-transparent" />

        {/* Slight overall overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10">
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow>Route intelligence</Eyebrow>

              <h2 className="mt-5 text-3xl sm:text-4xl">
                From planned path to living corridor
              </h2>

              <ol className="mt-8 space-y-6">
                {[
                  {
                    k: "01",
                    t: "Observe",
                    d: "Telemetry, traffic, weather, charge state and dock availability stream in continuously.",
                  },
                  {
                    k: "02",
                    t: "Reason",
                    d: "Scenario models simulate thousands of alternative corridors against your service constraints.",
                  },
                  {
                    k: "03",
                    t: "Act",
                    d: "The winning route is dispatched to the vehicle stack and the TMS in the same transaction.",
                  },
                  {
                    k: "04",
                    t: "Account",
                    d: "Energy, emissions and safety outcomes are written back to the ledger for reporting.",
                  },
                ].map((s, i) => (
                  <li
                    key={s.k}
                    className="flex gap-5"
                    style={{
                      transitionDelay: `${i * 60}ms`,
                    }}
                  >
                    <span className="shrink-0 pt-1 font-mono text-xs text-primary">
                      {s.k}
                    </span>

                    <div className="border-l border-border/70 pl-5">
                      <h3 className="text-base font-medium">
                        {s.t}
                      </h3>

                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {s.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Use Cases */}
     <Section id="usecase">
        <Reveal>
          <Eyebrow>Use cases</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
            Deployed where movement is the business
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {USE_CASES.map((u, i) => (
            <Reveal key={u.title} delay={i * 80}>
              <GlassCard className="h-full p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
                    {u.tag}
                  </span>

                  <img
                    src={u.image}
                    alt={u.title}
                    className="h-12 w-12 object-contain"
                  />
                </div>

                <h3 className="mt-6 text-xl">{u.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {u.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

 {/* Pricing */}
     <PayPalScriptProvider options={{ clientId: "BAAmyhBVTV_UaEz-gDuUaEmmlFee0WhtlzSUDJdkNIEwPDzpfeN2cbv0Uv3swe2pc7YTFs54rBHTuYei6I", currency: "USD" }}>
  <PricingSection />
</PayPalScriptProvider>


      {/* Testimonials */}
      <Section className="relative">
        <AmbientGlow className="-right-32 bottom-0 h-[26rem] w-[26rem]" />

        <Reveal>
          <Eyebrow>Field results</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl sm:text-4xl">
            What operators tell us
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={`${t.name}-${i}`} delay={i * 90}>
              <GlassCard className="flex h-full flex-col justify-between p-7">
                <p className="text-base leading-relaxed text-foreground/90">
                  “{t.quote}”
                </p>

                <div className="mt-8 border-t border-border pt-5 flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                  />

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {t.role}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

     

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl">Questions we hear from mobility teams</h2>
          </Reveal>
          <Reveal delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((f, i) => (
                <AccordionItem key={f.q} value={`i-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-base hover:text-primary hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-28">
        <Reveal>
          <div className="glass-strong glow-ring relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-14 md:py-20">
            <div className="grid-veil pointer-events-none absolute inset-0 opacity-25" />
            <div className="relative">
              <Eyebrow>Next step</Eyebrow>
              <h2 className="mx-auto mt-6 max-w-3xl text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Put your fleet on an intelligence layer that keeps learning
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
                A 30-minute session with our mobility engineers, mapped to your corridors, fleet mix
                and compliance regime.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <CTAButton to="/contact">
                  Book a demo <ArrowRight className="h-4 w-4" />
                </CTAButton>
                <CTAButton to="/about" variant="ghost">
                  Meet the company
                </CTAButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
