/** Anneau de progression (SVG). Purement visuel : l'annonce vocale est gérée par le parent. */
export function ProgressRing({ value, size = 160, compact = false }: { value: number; size?: number; compact?: boolean }) {
  const stroke = compact ? 8 : 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const id = `ring-${size}-${compact ? 'c' : 'l'}`;
  return (
    <div className="relative mx-auto shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2fb99a" />
            <stop offset="100%" stopColor="#1f86d3" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#dbe9f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <span className={`absolute inset-0 grid place-items-center font-display font-bold tabular-nums text-navy-900 ${compact ? 'text-lg' : 'text-4xl'}`} aria-hidden>{value}%</span>
    </div>
  );
}
