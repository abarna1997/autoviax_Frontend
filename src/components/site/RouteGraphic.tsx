export function RouteGraphic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 340" className={className} role="img" aria-label="Route optimization diagram">
      <defs>
        <linearGradient id="rg-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <g stroke="currentColor" strokeOpacity="0.08">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="600" y2={i * 40} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="340" />
        ))}
      </g>
      <path
        d="M40 280 C 150 300, 180 120, 300 160 S 470 90, 560 60"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="2"
        strokeDasharray="6 8"
      />
      <path
        d="M40 280 C 170 250, 210 170, 320 140 S 480 100, 560 60"
        fill="none"
        stroke="url(#rg-line)"
        strokeWidth="2.5"
        strokeDasharray="10 14"
        className="animate-dash"
      />
      {[
        [40, 280],
        [320, 140],
        [560, 60],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="16" fill="var(--primary)" opacity="0.08" />
          <circle cx={cx} cy={cy} r="4" fill="var(--primary)" />
        </g>
      ))}
    </svg>
  );
}
