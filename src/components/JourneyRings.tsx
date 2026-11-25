import { useState } from 'react'
import { journey } from '../data/event'

// Staggered orbital node angles (degrees) so the 6 stages read like a true Chakravyuh spiral
const NODE_ANGLES = [-90, -35, 25, 85, 145, 210]
const RADII = [215, 180, 145, 112, 80, 48]

export default function JourneyRings({ compact }: { compact?: boolean }) {
  const [active, setActive] = useState(0)
  const current = journey[active]
  const activeAngleRad = (NODE_ANGLES[active] * Math.PI) / 180
  const activeR = RADII[active]
  const beamX = Math.cos(activeAngleRad) * activeR
  const beamY = Math.sin(activeAngleRad) * activeR

  return (
    <div className={`grid gap-8 lg:gap-12 items-center ${compact ? 'lg:grid-cols-[1fr_1.05fr]' : 'md:grid-cols-[1fr_1.05fr]'}`}>
      {/* Left: Interactive Chakravyuh Astrolabe */}
      <div className="hidden md:flex items-center justify-center relative">
        <svg
          viewBox="-250 -250 500 500"
          className="w-full max-w-[440px] mx-auto overflow-visible"
          role="img"
          aria-label="Interactive Chakravyuh formation showing the six stages from Register to The core"
        >
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2de2e6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#07090d" stopOpacity="0" />
            </radialGradient>
            <filter id="cyanGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle core aura */}
          <circle r="110" fill="url(#coreGlow)" />

          {/* Crosshair axis lines */}
          <line x1="-235" y1="0" x2="235" y2="0" stroke="#b08d4a" strokeOpacity="0.14" strokeDasharray="3 6" />
          <line x1="0" y1="-235" x2="0" y2="235" stroke="#b08d4a" strokeOpacity="0.14" strokeDasharray="3 6" />

          {/* Active radial targeting beam from core to selected ring node */}
          <line
            x1="0"
            y1="0"
            x2={beamX}
            y2={beamY}
            stroke="#2de2e6"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            strokeDasharray="4 4"
            style={{ transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />

          {/* 6 Concentric Spiral Rings */}
          {RADII.map((r, i) => {
            const isActive = active === i
            const angleRad = (NODE_ANGLES[i] * Math.PI) / 180
            const nx = Math.cos(angleRad) * r
            const ny = Math.sin(angleRad) * r

            return (
              <g
                key={r}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ cursor: 'pointer' }}
              >
                {/* Invisible hit target */}
                <circle r={r} fill="none" stroke="transparent" strokeWidth="26" />

                {/* Main ring arc */}
                <circle
                  r={r}
                  fill="none"
                  stroke={isActive ? '#2de2e6' : '#b08d4a'}
                  strokeOpacity={isActive ? 0.95 : 0.35}
                  strokeWidth={isActive ? 2.5 : 1.2}
                  strokeDasharray={i === 5 ? '0' : `${r * 1.1} ${r * 0.22}`}
                  filter={isActive ? 'url(#cyanGlow)' : undefined}
                  style={{ transition: 'all 0.45s ease' }}
                />

                {/* Orbital Node Marker */}
                <circle
                  cx={nx}
                  cy={ny}
                  r={isActive ? 13 : 9}
                  fill="#07090d"
                  stroke={isActive ? '#2de2e6' : '#b08d4a'}
                  strokeWidth={isActive ? 2 : 1.2}
                  style={{ transition: 'all 0.35s ease' }}
                />
                <text
                  x={nx}
                  y={ny + 3.5}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontFamily="JetBrains Mono"
                  fill={isActive ? '#2de2e6' : '#e0b866'}
                  style={{ pointerEvents: 'none' }}
                >
                  {i + 1}
                </text>
              </g>
            )
          })}

          {/* Center Core */}
          <circle r="15" fill="#2de2e6" opacity="0.9" filter="url(#cyanGlow)" className="pulse" />
          <circle r="22" fill="none" stroke="#2de2e6" strokeOpacity="0.45" strokeWidth="1" />
        </svg>
      </div>

      {/* Right: Spotlight + Clean Typographic Stage Selector (no stacked boxes) */}
      <div className="flex flex-col gap-6">
        {/* Active Stage Spotlight */}
        <div className="bg-obsidian/80 backdrop-blur-md border-l-2 border-cyan pl-6 pr-5 py-5">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs tracking-[.18em] uppercase text-cyan">
              Stage 0{active + 1} of 0{journey.length}
            </span>
            <span className="font-mono text-xs tracking-[.12em] text-bronze">{current.date}</span>
          </div>
          <h3 className="bronze-text text-2xl sm:text-3xl font-extrabold mt-2">{current.stage}</h3>
          <p className="mt-2 text-[#e9e4d8] leading-relaxed">{current.detail}</p>
        </div>

        {/* Clean Interactive Stage List / Mobile Vertical Spine */}
        <ol className="list-none m-0 p-0 border-l border-bronze/30 ml-2 space-y-1">
          {journey.map((j, i) => {
            const isActive = active === i
            return (
              <li key={j.stage} className="relative pl-6">
                {/* Timeline node */}
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-3.5 w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    background: isActive ? '#2de2e6' : '#07090d',
                    border: `1.5px solid ${isActive ? '#2de2e6' : '#b08d4a'}`,
                    boxShadow: isActive ? '0 0 10px #2de2e6' : 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`w-full text-left py-2 px-3 transition-colors duration-300 cursor-pointer flex items-baseline justify-between gap-4 ${
                    isActive ? 'bg-cyan/10 text-white' : 'text-[#c9c3b4] hover:text-gold'
                  }`}
                >
                  <span className={`font-display text-base sm:text-lg ${isActive ? 'text-gold' : ''}`}>
                    {j.stage}
                  </span>
                  <span className="font-mono text-xs text-bronze shrink-0">{j.date}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
