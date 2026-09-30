import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Box,
  Cpu,
  Database,
  Eye,
  GitBranch,
  Layers,
  Network,
  Radio,
  Scale,
  ShieldAlert,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/site/Reveal";
import { AmbientGlow, CTAButton, Eyebrow, GlassCard, Section } from "@/components/site/Primitives";
import { OpsDashboard } from "@/components/site/OpsDashboard";
import archImg from "@/assets/architecture.jpg";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "AutoViaX — Autonomous Mobility Intelligence Platform & NVIDIA Architecture" },
      {
        name: "description",
        content:
          "AutoViaX bridges edge perception and cloud-scale fleet orchestration using NVIDIA DriveWorks, Omniverse Isaac Sim, TensorRT, and AWS GPU infrastructure.",
      },
      { property: "og:title", content: "AutoViaX Technical Platform Overview" },
      {
        property: "og:description",
        content:
          "Edge-to-cloud spatial AI acceleration, real-time synthetic simulation, zero-copy NvStreams sensor pipelines, and NVIDIA hardware acceleration.",
      },
    ],
  }),
  component: ProductPage,
});

const WORKFLOW = [
  {
    icon: Radio,
    step: "Ingest",
    title: "Zero-Copy Sensor Stream Ingestion",
    body: "Multi-camera, LiDAR, Radar, and IMU telemetry land directly in unified GPU VRAM via NVIDIA DriveWorks SAL and zero-copy NvStreams pipeline structures.",
  },
  {
    icon: Eye,
    step: "Perceive",
    title: "Spatial AI & 3D Occupancy Fusion",
    body: "Custom PyTorch 3D perception backbones run sub-100ms multi-sensor fusion at the vehicle edge using Isaac ROS GEMs and NITROS acceleration.",
  },
  {
    icon: Box,
    step: "Simulate",
    title: "Omniverse Digital Twin Scenarios",
    body: "NVIDIA Isaac Sim generates synthetic, physically accurate multi-sensor ground truths to post-train spatial AI models across long-tail edge-case scenarios.",
  },
  {
    icon: Zap,
    step: "Optimize",
    title: "TensorRT Trajectory Planning",
    body: "Quantized FP16/INT8 Vision-Language-Action (VLA) models execute sub-millisecond route dynamic recalculations and scenario-scored motion plans.",
  },
  {
    icon: Database,
    step: "Account",
    title: "Immutable Evidence Ledger",
    body: "Per-frame decision lineage, audit logs, and emissions telemetry write to an immutable ledger on cloud orchestration nodes for complete traceability.",
  },
];

const MODULES = [
  {
    key: "perception",
    label: "Edge Spatial Perception",
    icon: Cpu,
    headline: "Zero-copy multi-sensor fusion at the edge",
    points: [
      "DriveWorks SAL ingestion bypassing host-to-device PCIe bottlenecks",
      "Sub-millisecond visual SLAM, path planning, and obstacle avoidance",
      "Degraded-sensor fallback policies managed by Isaac ROS GEMs",
      "Scenario frame replay backed by 24-month lineage logs",
    ],
  },
  {
    key: "simulation",
    label: "Omniverse Digital Twins",
    icon: Layers,
    headline: "Photorealistic long-tail scenario generation",
    points: [
      "NVIDIA Omniverse-powered digital twins of supply chain corridors",
      "Isaac Sim synthetic data generation (SDG) for edge-case training",
      "OpenUSD environment pipelines for multi-agent physics modeling",
      "Cosmos foundation model integration for automated scene synthesis",
    ],
  },
  {
    key: "inference",
    label: "TensorRT Execution Core",
    icon: Zap,
    headline: "Quantized low-latency neural inference",
    points: [
      "ONNX export and TensorRT INT8/FP16 precision quantization",
      "Transformer-based occupancy networks running on Tensor Cores",
      "Zero-copy hardware memory passing via ROS 2 NITROS bridge",
      "Targeted execution on Jetson Thor FP4/FP8 Transformer Engines",
    ],
  },
  {
    key: "orchestration",
    label: "Cloud Fleet Orchestration",
    icon: Network,
    headline: "Distributed EKS microservices & safety assurance",
    points: [
      "Amazon EKS orchestration using the NVIDIA Container Toolkit",
      "Direct exposure of CUDA cores, Tensor Cores, and Ray Tracing GPUs",
      "Predictive handover, depot slots, and dynamic route optimization",
      "Immutable decision ledger built for homologation and regulatory audit",
    ],
  },
];

const SDK_INTEGRATIONS = [
  "NVIDIA DriveWorks",
  "NVIDIA DriveOS",
  "NVIDIA Omniverse",
  "NVIDIA Isaac Sim",
  "NVIDIA TensorRT",
  "NVIDIA Isaac ROS",
  "AWS EC2 H100 / L40S",
  "NVIDIA DRIVE Orin / Thor",
];

export default function ProductPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-5 pt-36 pb-14 sm:px-8 sm:pt-44">
        <AmbientGlow className="top-[-8rem] left-1/3 h-[32rem] w-[32rem]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <Reveal>
            <Eyebrow>Technical Architecture Profile</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-5xl text-[2.4rem] leading-[1.05] sm:text-6xl">
              Spatial AI Acceleration &amp; Digital Twins, <span className="text-gradient">edge to cloud</span>.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              AutoViaX bridges edge spatial perception and cloud-scale fleet orchestration. Powered by the NVIDIA Physical AI ecosystem—DriveWorks, Isaac Sim, Omniverse, and TensorRT—our platform delivers real-time spatio-temporal intelligence across global autonomous networks.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTAButton
                to="https://app.autoviax.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the Dashboard <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <CTAButton
                to="https://autoviax.net/"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                Visit AutoViaX.net
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Spatial Workflow */}
      <Section id="workflow">
        <Reveal>
          <Eyebrow>End-to-End Pipeline</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl sm:text-4xl">
            From multi-modal sensor ingestion to orchestrated physical movement
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {WORKFLOW.map((w, i) => (
            <Reveal key={w.step} delay={i * 70}>
              <GlassCard className="relative h-full p-6">
                <span className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
                  {String(i + 1).padStart(2, "0")} · {w.step}
                </span>
                <w.icon className="mt-5 h-5 w-5 text-primary" />
                <h3 className="mt-4 text-base font-semibold">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* NVIDIA Architecture Modules */}
      <Section id="modules" className="relative">
        <AmbientGlow className="top-1/4 -right-40 h-[28rem] w-[28rem]" />
        <Reveal>
          <Eyebrow>SDK Matrix &amp; Core Runtime</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl sm:text-4xl">
            Hardware-bound AI microservices bypassing host bottlenecks
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <Tabs defaultValue="perception" className="mt-10 w-full">
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
              {MODULES.map((m) => (
                <TabsTrigger
                  key={m.key}
                  value={m.key}
                  className="rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-muted-foreground data-[state=active]:border-primary/40 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  {m.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {MODULES.map((m) => (
              <TabsContent key={m.key} value={m.key} className="mt-8">
                <GlassCard hover={false} className="glass-strong grid gap-8 p-7 md:grid-cols-2 md:p-10">
                  <div>
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-primary/25 bg-primary/10">
                      <m.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-6 text-2xl sm:text-3xl">{m.headline}</h3>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Built for high-throughput spatial execution using custom PyTorch backbones, ROS 2 NITROS acceleration, and NVIDIA Container Toolkit on AWS EKS.
                    </p>
                  </div>
                  <ul className="space-y-4">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-3 border-b border-border pb-4 text-sm">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </Section>

      {/* Control Center Dashboard */}
      <Section id="interface">
        <Reveal>
          <Eyebrow>Control Room Interface</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl sm:text-4xl">
            AutoViaX Autonomous Command Center
          </h2>
          <p className="mt-5 max-w-3xl text-sm text-muted-foreground sm:text-base">
            Real-time fleet spatial intelligence dashboard designed for zero-latency operator visibility, scenario scoring, and direct hardware telemetry links.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <OpsDashboard />
        </Reveal>
      </Section>

      {/* Physical AI Stack & Hardware Topology */}
      <Section id="architecture" className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={archImg}
                loading="lazy"
                width={1408}
                height={1008}
                alt="AutoViaX NVIDIA SDK and AWS Accelerated Hardware Pipeline Diagram"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Eyebrow>NVIDIA Ecosystem Topology</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl">Eradicating host-to-device PCIe bottlenecks</h2>
            <div className="mt-8 space-y-5">
              {[
                {
                  icon: Terminal,
                  t: "In-Vehicle & Fleet Edge Nodes",
                  d: "NVIDIA DRIVE Orin and DRIVE Thor embedded architectures running deterministic real-time inference for zero-latency local SLAM and perception.",
                },
                {
                  icon: Layers,
                  t: "Simulation Tier (AWS EC2 G5 / L40S)",
                  d: "NVIDIA Omniverse and Isaac Sim instances handling multi-agent OpenUSD physics rendering, synthetic data generation, and scenario generation.",
                },
                {
                  icon: Cpu,
                  t: "Foundational Model Training Tier (AWS EC2 P5 / H100)",
                  d: "High-throughput HBM3 memory bandwidth cluster for training large-parameter spatial Transformer models and Vision-Language-Action (VLA) backbones.",
                },
              ].map((a) => (
                <div key={a.t} className="flex gap-4 border-l border-border pl-5">
                  <a.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-base font-medium">{a.t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-14">
            <p className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
              Accelerated with NVIDIA Hardware &amp; SDK Packs
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {SDK_INTEGRATIONS.map((i) => (
                <span
                  key={i}
                  className="rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Future Technical Roadmap */}
      <Section id="roadmap">
        <Reveal>
          <Eyebrow>Technical Roadmap (Q3–Q4)</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl sm:text-4xl">
            Next-generation Physical AI &amp; foundation model integration
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal delay={60}>
            <GlassCard className="p-8">
              <div className="flex items-center gap-3">
                <GitBranch className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">NVIDIA Cosmos &amp; Foundation Models</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Integrating NVIDIA Cosmos transfer pipelines to augment synthetic scene generation, accelerating the training of end-to-end vision-based mobility foundation models across long-tail edge-case corridors.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={120}>
            <GlassCard className="p-8">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Jetson Thor Architecture Migration</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Migrating low-power edge compute pipelines to the Jetson Thor platform, utilizing specialized FP4/FP8 Transformer Engines to achieve higher TOPS per watt for autonomous ground vehicles and logistics units.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-28">
        <Reveal>
          <div className="glass-strong glow-ring relative overflow-hidden rounded-3xl px-6 py-14 sm:px-14">
            <div className="grid-veil pointer-events-none absolute inset-0 opacity-20" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="max-w-xl text-3xl sm:text-4xl">
                  Deploy AutoViaX on your GPU infrastructure
                </h2>
                <p className="mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
                  Request technical architecture blueprints, benchmark zero-copy pipelines, or evaluate our AWS EC2 P5/L40S cluster configurations.
                </p>
              </div>
              <CTAButton to="/contact">
                Schedule Technical Review <ArrowRight className="h-4 w-4" />
              </CTAButton>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}