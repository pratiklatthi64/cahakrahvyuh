// Stylised, non-photographic bronze-and-cyan silhouette. Swap for public/judges/<slug>.webp later.
export default function JudgeAvatar({ name, variant }: { name: string; variant: number }) {
  const halo = [52, 60, 46, 56][variant % 4]
  return (
    <svg viewBox="0 0 200 220" role="img" aria-label={`Stylised silhouette avatar for the ${name} judge agent`} className="w-full h-auto">
      <defs>
        <linearGradient id={`b${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e0b866" /><stop offset="1" stopColor="#5b4520" />
        </linearGradient>
      </defs>
      <rect width="200" height="220" fill="#0a1020" />
      <circle cx="100" cy="95" r={halo + 40} fill="none" stroke="#b08d4a" strokeOpacity=".35" />
      <circle cx="100" cy="95" r={halo + 22} fill="none" stroke="#2de2e6" strokeOpacity=".5" strokeDasharray="4 8" />
      <circle cx="100" cy="85" r="34" fill={`url(#b${variant})`} />
      <path d="M30 220 C34 150 70 130 100 130 C130 130 166 150 170 220 Z" fill={`url(#b${variant})`} />
      <circle cx="100" cy="150" r="7" fill="#2de2e6" />
      <circle cx="100" cy="150" r="14" fill="none" stroke="#2de2e6" strokeOpacity=".6" />
    </svg>
  )
}
