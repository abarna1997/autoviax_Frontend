import { useState } from "react";
import { ArrowRight, Check, Sparkles, X } from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { AmbientGlow, CTAButton, Eyebrow, Section } from "./Primitives";

type BillingPeriod = "monthly" | "annual";

interface PlanTier {
  id: string;
  name: string;
  badge?: string;
  recommended?: boolean;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  unit: string;
  periodLabel: string;
  features: string[];
  ctaLabel: string;
  ctaVariant: "primary" | "ghost";
}

const PLANS: PlanTier[] = [
  {
    id: "pilot",
    name: "Pilot Corridor",
    description:
      "Designed for logistics operators and carriers validating autonomous corridors or yard automation.",
    monthlyPrice: 99,
    annualPrice: 79,
    unit: "$",
    periodLabel: "per month",
    features: [
      "Up to 25 connected vehicles / autonomous units",
      "Sub-120ms perception & edge telemetry sync",
      "Continuous corridor route optimisation",
      "Standard TMS, WMS & telematics adapters",
      "30-day decision lineage & intervention replay",
      "Standard business hours engineering support",
    ],
    ctaLabel: "Launch Corridor Pilot",
    ctaVariant: "ghost",
  },
  {
    id: "fleet-scale",
    name: "Fleet Scale",
    badge: "MOST POPULAR",
    recommended: true,
    description:
      "Full network orchestration for commercial operators running mixed-autonomy and long-haul fleets.",
    monthlyPrice: 249,
    annualPrice: 199,
    unit: "$",
    periodLabel: "per month",
    features: [
      "Up to 250 connected vehicles / autonomous units",
      "Ultra-low sub-40ms multi-sensor perception fusion",
      "Live yard, terminal and corridor dynamic rerouting",
      "Automated CO₂e, ESG and compliance audit reporting",
      "Predictive dwell, charging and handover dispatch",
      "Scenario simulation studio for route safety testing",
      "24/7 dedicated mission control SLA (99.95% uptime)",
    ],
    ctaLabel: "Deploy Fleet Scale",
    ctaVariant: "primary",
  },
  {
    id: "global-oem",
    name: "Global Network & OEM",
    badge: "CUSTOM INFRASTRUCTURE",
    description:
      "Tailored infrastructure for automotive manufacturers, tier-1 suppliers, and intermodal authorities.",
    monthlyPrice: null,
    annualPrice: null,
    unit: "",
    periodLabel: "tailored contract",
    features: [
      "Unlimited connected fleet size & geographical hubs",
      "Vehicle-agnostic custom sensor stack & edge adapters",
      "ISO 26262 & UNECE WP.29 homologation assurance",
      "Sovereign cloud, private VPC or on-prem deployment",
      "Fleet learning loops with raw perception dataset lineage",
      "Dedicated mobility solutions architect & 24/7 priority SLA",
    ],
    ctaLabel: "Speak with Engineers",
    ctaVariant: "ghost",
  },
];

export function PricingSection() {
  const [period, setPeriod] = useState<BillingPeriod>("annual");
  const [selectedPlan, setSelectedPlan] = useState<{
    tier: PlanTier;
    price: number;
  } | null>(null);

  const handleSelectPlan = (plan: PlanTier) => {
    const price = period === "annual" ? plan.annualPrice : plan.monthlyPrice;
    if (price !== null) {
      setSelectedPlan({ tier: plan, price });
    }
  };

  return (
    <Section id="pricing" className="relative overflow-hidden py-24 md:py-32">
      <AmbientGlow className="top-1/4 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 opacity-30" />
      <AmbientGlow className="-bottom-20 right-[-10rem] h-[26rem] w-[26rem] opacity-20" />

      {/* Header */}
      <div className="relative text-center">
        <Reveal>
          <Eyebrow>Transparent Mobility Tiers</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Predictable intelligence pricing for <span className="text-gradient">every fleet scale</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Deploy on a single corridor or orchestrate an entire global logistics network.
            Vehicle-agnostic, zero rip-and-replace, fully auditable.
          </p>
        </Reveal>

        {/* Billing period switcher */}
        <Reveal delay={100}>
          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setPeriod("monthly")}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-300 sm:text-sm",
                period === "monthly"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setPeriod("annual")}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-300 sm:text-sm",
                period === "annual"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>Annual Billing</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold tracking-tight uppercase",
                  period === "annual"
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-primary/20 text-primary",
                )}
              >
                Save 20%
              </span>
            </button>
          </div>
        </Reveal>
      </div>

      {/* Pricing cards */}
      <div className="relative mt-14 grid gap-8 lg:grid-cols-3 lg:items-stretch">
        {PLANS.map((plan, index) => {
          const isAnnual = period === "annual";
          const displayPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          const isPaypalTier = plan.id === "pilot" || plan.id === "fleet-scale";

          return (
            <Reveal key={plan.id} delay={index * 100} className="flex">
              <div
                className={cn(
                  "relative flex w-full flex-col justify-between rounded-3xl p-8 transition-all duration-500",
                  plan.recommended
                    ? "glass-strong glow-ring border-primary/40 shadow-[0_20px_80px_-25px_rgba(151,207,255,0.35)]"
                    : "glass border-border hover:border-primary/30",
                )}
              >
                {plan.badge && (
                  <div className="mb-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase",
                        plan.recommended
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "border border-border bg-secondary/70 text-foreground/80",
                      )}
                    >
                      {plan.recommended && <Sparkles className="h-3 w-3" />}
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="font-display text-2xl tracking-tight text-foreground">{plan.name}</h3>
                  <p className="mt-3 min-h-[44px] text-sm leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>

                  <div className="mt-6 border-t border-border pt-6">
                    {displayPrice !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                          {plan.unit}
                          {displayPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">/{plan.periodLabel}</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                          Custom
                        </span>
                        <span className="text-sm text-muted-foreground">/ enterprise pricing</span>
                      </div>
                    )}

                    <p className="mt-2 text-xs text-muted-foreground/80">
                      {displayPrice !== null
                        ? isAnnual
                          ? "Billed annually · Dedicated corridor SLA"
                          : "Flexible monthly agreement"
                        : "Bespoke scope & infrastructure deployment"}
                    </p>
                  </div>

                  <div className="mt-8 space-y-3.5">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-foreground/60 uppercase">
                      Included Capabilities:
                    </p>
                    <ul className="space-y-3 text-sm">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3">
                          <span
                            className={cn(
                              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs",
                              plan.recommended
                                ? "border border-primary/40 bg-primary/20 text-primary"
                                : "border border-border bg-surface text-muted-foreground",
                            )}
                          >
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="text-muted-foreground/90">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 pt-4">
                  {isPaypalTier ? (
                    <button
                      type="button"
                      onClick={() => handleSelectPlan(plan)}
                      className={cn(
                        "inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-all duration-200",
                        plan.ctaVariant === "primary"
                          ? "bg-primary text-primary-foreground shadow-lg hover:brightness-110"
                          : "border border-border bg-surface/50 text-foreground hover:bg-surface",
                      )}
                    >
                      {plan.ctaLabel} <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <CTAButton
                      to="/contact"
                      variant={plan.ctaVariant}
                      className="w-full justify-center py-3.5"
                    >
                      {plan.ctaLabel} <ArrowRight className="h-4 w-4" />
                    </CTAButton>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* PayPal Checkout Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold">{selectedPlan.tier.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Total due:{" "}
              <span className="font-semibold text-foreground">
                ${selectedPlan.price.toLocaleString()} USD
              </span>{" "}
              ({period})
            </p>

            <div className="mt-6">
              <PayPalButtons
                key={`${selectedPlan.tier.id}-${selectedPlan.price}`}
                style={{ layout: "vertical", shape: "pill" }}
                createOrder={(_data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        description: `${selectedPlan.tier.name} (${period})`,
                        amount: {
                          currency_code: "USD",
                          value: selectedPlan.price.toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (_data, actions) => {
                  if (actions.order) {
                    const details = await actions.order.capture();
                    alert(`Payment successful! Transaction ID: ${details.id}`);
                    setSelectedPlan(null);
                  }
                }}
                onError={(err) => {
                  console.error("PayPal Checkout Error:", err);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}