// Stylised, non-photographic bronze-and-cyan silhouette. Swap for public/judges/<slug>.webp later.
export default function JudgeAvatar({ name, variant }: { name: string; variant: number }) {
  const halo = [54, 62, 48, 58][variant % 4]
  const rot = [0, 30, 45, 15][variant % 4]
  return (
    <svg viewBox="0 0 200 220" role="img" aria-label={`Stylised silhouette avatar for the ${name} judge agent`} className="w-full h-auto block">
      <defs>
        <linearGradient id={`b${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d995" />
          <stop offset="0.55" stopColor="#b08d4a" />
          <stop offset="1" stopColor="#4c3818" />
        </linearGradient>
        <radialGradient id={`g${variant}`} cx="50%" cy="44%" r="50%">
          <stop offset="0%" stopColor="#2de2e6" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0a1020" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="220" fill="#0a1020" />
      <rect width="200" height="220" fill={`url(#g${variant})`} />
      {/* Concentric Chakravyuh geometry */}
      <g transform={`rotate(${rot} 100 95)`}>
        <circle cx="100" cy="95" r={halo + 42} fill="none" stroke="#b08d4a" strokeOpacity=".35" strokeDasharray="18 8" />
        <circle cx="100" cy="95" r={halo + 24} fill="none" stroke="#2de2e6" strokeOpacity=".55" strokeDasharray="5 9" />
        <circle cx="100" cy="95" r={halo + 8} fill="none" stroke="#b08d4a" strokeOpacity=".25" />
      </g>
      {/* Silhouette */}
      <circle cx="100" cy="84" r="32" fill={`url(#b${variant})`} />
      <path d="M32 220 C36 152 70 132 100 132 C130 132 164 152 168 220 Z" fill={`url(#b${variant})`} />
      {/* AI Core Node */}
      <circle cx="100" cy="154" r="6" fill="#2de2e6" />
      <circle cx="100" cy="154" r="13" fill="none" stroke="#2de2e6" strokeOpacity=".65" />
      <line x1="100" y1="167" x2="100" y2="220" stroke="#2de2e6" strokeOpacity=".4" strokeWidth="1.5" />
    </svg>
  )
}
