import { useState } from 'react'
import { journey } from '../data/event'

export default function JourneyRings({ compact }: { compact?: boolean }) {
  const [active, setActive] = useState(0)
  const radii = [230, 195, 160, 125, 90, 52]
  return (
    <div className={`grid gap-8 ${compact ? '' : 'md:grid-cols-2'} items-center`}>
      <svg viewBox="-250 -250 500 500" className="hidden md:block w-full max-w-[520px] mx-auto" role="img" aria-label="Six concentric rings showing the journey from Register to The core">
        {radii.map((r, i) => (
          <g key={r} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
            <circle r={r} fill="none" stroke="transparent" strokeWidth="30" />
            <circle r={r} fill="none" stroke={active === i ? '#2de2e6' : '#b08d4a'} strokeWidth={active === i ? 3 : 1.5}
              strokeDasharray={i === 5 ? '0' : `${r / 1.5} 10`} style={{ transition: 'all .5s' }} />
            <text x="0" y={-r + 4} textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fill={active === i ? '#2de2e6' : '#e0b866'}>{i + 1}</text>
          </g>
        ))}
        <circle r="18" fill="#2de2e6" opacity=".85" className="pulse" />
      </svg>
      <ol className="list-none m-0 p-0 grid gap-3">
        {journey.map((j, i) => (
          <li key={j.stage}>
            <button onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
              className={`w-full text-left panel p-4 transition-all duration-500 ${active === i ? '!border-cyan' : ''}`} aria-current={active === i}>
              <span className="label">Ring {i + 1} · {j.date}</span>
              <span className="block font-display text-xl text-gold mt-1">{j.stage}</span>
              <span className={`block text-[#c9c3b4] overflow-hidden transition-all duration-500 ${active === i ? 'max-h-40 mt-2' : 'max-h-0 md:max-h-0'}`}>{j.detail}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
