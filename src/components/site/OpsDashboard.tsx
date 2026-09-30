import { useEffect, useState } from "react";
import { Activity, BatteryCharging, Gauge, Leaf, Route as RouteIcon, ShieldCheck } from "lucide-react";
import { GlassCard } from "./Primitives";

const FLEET = [
  { id: "AVX-2201", city: "Rotterdam", status: "Autonomous", load: 92, eta: "12m" },
  { id: "AVX-1184", city: "Detroit", status: "Convoy", load: 74, eta: "31m" },
  { id: "AVX-0937", city: "Singapore", status: "Charging", load: 38, eta: "—" },
  { id: "AVX-4410", city: "Hamburg", status: "Autonomous", load: 81, eta: "07m" },
];

function useTicker(base: number, spread: number) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const t = setInterval(() => {
      setV(base + (Math.random() - 0.5) * spread);
    }, 2600);
    return () => clearInterval(t);
  }, [base, spread]);
  return v;
}

function Sparkline({ seed = 1 }: { seed?: number }) {
  const pts = Array.from({ length: 26 }, (_, i) => {
    const y = 26 + Math.sin(i / 2.1 + seed) * 9 + Math.cos(i / 1.3 + seed * 2) * 4;
    return `${(i / 25) * 100},${y}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="h-14 w-full">
      <defs>
        <linearGradient id={`spark-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke="var(--primary)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <polygon points={`${pts} 100,50 0,50`} fill={`url(#spark-${seed})`} />
    </svg>
  );
}

export function OpsDashboard() {
  const uptime = useTicker(99.2, 0.6);
  const saved = useTicker(18.4, 2.2);

  return (
    <GlassCard hover={false} className="glass-strong p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-primary" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Live operations · Global mesh
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">v4.2 · edge sync 40ms</span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-void/50 p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-foreground">Fleet autonomy index</p>
            <span className="font-mono text-xs text-primary">{uptime.toFixed(2)}%</span>
          </div>
          <Sparkline seed={1} />
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Gauge, k: "Avg speed", v: "58 km/h" },
              { icon: RouteIcon, k: "Routes live", v: "1,284" },
              { icon: ShieldCheck, k: "Interventions", v: "0.004/km" },
              { icon: BatteryCharging, k: "Energy", v: "1.9 kWh/km" },
            ].map((m) => (
              <div key={m.k} className="rounded-lg border border-border/70 bg-surface/60 p-3">
                <m.icon className="h-4 w-4 text-primary" />
                <p className="mt-2 text-[11px] text-muted-foreground">{m.k}</p>
                <p className="font-display text-sm text-foreground">{m.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-void/50 p-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-primary" />
            <p className="text-sm text-foreground">Emissions avoided</p>
          </div>
          <p className="mt-3 font-display text-3xl text-foreground">
            {saved.toFixed(1)}
            <span className="ml-1 text-sm text-muted-foreground">kt CO₂e / yr</span>
          </p>
          <div className="mt-4 space-y-3">
            {[
              { k: "Route efficiency", v: 78 },
              { k: "Idle reduction", v: 64 },
              { k: "Load consolidation", v: 51 },
            ].map((b) => (
              <div key={b.k}>
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>{b.k}</span>
                  <span>{b.v}%</span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-1000"
                    style={{ width: `${b.v}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-void/50">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <p className="text-sm text-foreground">Active units</p>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground sm:hidden">
            Scroll table →
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="text-[11px] tracking-widest text-muted-foreground uppercase">
                <th className="px-4 py-2 font-normal">Unit</th>
                <th className="px-4 py-2 font-normal">Corridor</th>
                <th className="px-4 py-2 font-normal">Mode</th>
                <th className="px-4 py-2 font-normal">Load</th>
                <th className="px-4 py-2 font-normal">ETA</th>
              </tr>
            </thead>
            <tbody>
              {FLEET.map((f) => (
                <tr key={f.id} className="border-t border-border/70 transition-colors hover:bg-secondary/40">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{f.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{f.city}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
                      {f.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-1 w-20 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-primary" style={{ width: `${f.load}%` }} />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{f.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </GlassCard>
  );
}
