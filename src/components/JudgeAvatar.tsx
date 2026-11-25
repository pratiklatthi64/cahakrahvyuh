// Stylised, non-photographic bronze-and-cyan silhouettes. Swap for public/judges/<slug>.webp later.
export default function JudgeAvatar({ name, variant }: { name: string; variant: number }) {
  const id = variant % 4
  const halo = [54, 62, 48, 58][id]
  const rot = [0, 30, 45, 15][id]

  return (
    <svg
      viewBox="0 0 200 220"
      role="img"
      aria-label={`Stylised silhouette avatar for the ${name} judge agent`}
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d995" />
          <stop offset="0.55" stopColor="#b08d4a" />
          <stop offset="1" stopColor="#4c3818" />
        </linearGradient>
        <radialGradient id={`g${id}`} cx="50%" cy="44%" r="50%">
          <stop offset="0%" stopColor="#2de2e6" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#0a1020" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="200" height="220" fill="#0a1020" />
      <rect width="200" height="220" fill={`url(#g${id})`} />

      {/* Concentric Chakravyuh geometry */}
      <g transform={`rotate(${rot} 100 95)`}>
        <circle cx="100" cy="95" r={halo + 42} fill="none" stroke="#b08d4a" strokeOpacity=".35" strokeDasharray="18 8" />
        <circle cx="100" cy="95" r={halo + 24} fill="none" stroke="#2de2e6" strokeOpacity=".55" strokeDasharray="5 9" />
        <circle cx="100" cy="95" r={halo + 8} fill="none" stroke="#b08d4a" strokeOpacity=".25" />
      </g>

      {/* Base bust silhouette */}
      <circle cx="100" cy="84" r="31" fill={`url(#b${id})`} />
      <path d="M32 220 C36 152 70 132 100 132 C130 132 164 152 168 220 Z" fill={`url(#b${id})`} />

      {/* Variant-specific cyber-mythic motif (purely stylized, non-photographic) */}
      {id === 0 && (
        // Bill Gates: architectural twin-lens visor
        <g stroke="#2de2e6" strokeWidth="1.8" fill="none">
          <rect x="76" y="76" width="20" height="12" rx="2" />
          <rect x="104" y="76" width="20" height="12" rx="2" />
          <line x1="96" y1="82" x2="104" y2="82" />
        </g>
      )}
      {id === 1 && (
        // Elon Musk: tilted orbital trajectory ring
        <ellipse cx="100" cy="84" rx="48" ry="14" transform="rotate(-22 100 84)" fill="none" stroke="#2de2e6" strokeWidth="1.6" strokeOpacity="0.8" />
      )}
      {id === 2 && (
        // Sam Altman: concentric neural prism
        <polygon points="100,44 136,84 100,124 64,84" fill="none" stroke="#2de2e6" strokeWidth="1.5" strokeOpacity="0.75" />
      )}
      {id === 3 && (
        // Dario Amodei: safety-alignment triad lattice
        <g stroke="#2de2e6" strokeWidth="1.4" strokeOpacity="0.8" fill="none">
          <polygon points="100,48 134,108 66,108" />
          <circle cx="100" cy="88" r="14" />
        </g>
      )}

      {/* AI Core Node */}
      <circle cx="100" cy="156" r="6" fill="#2de2e6" />
      <circle cx="100" cy="156" r="13" fill="none" stroke="#2de2e6" strokeOpacity=".65" />
      <line x1="100" y1="169" x2="100" y2="220" stroke="#2de2e6" strokeOpacity=".4" strokeWidth="1.5" />
    </svg>
  )
}
