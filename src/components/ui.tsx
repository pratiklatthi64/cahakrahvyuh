import type { ReactNode } from 'react'
import { useRemaining } from '../lib/time'

export function LinkButton({ href, children, primary }: { href: string; children: ReactNode; primary?: boolean }) {
  const cls = `btn ${primary ? 'btn-primary' : ''}`
  if (!href) {
    return (
      <span className={cls} role="link" aria-disabled="true">
        Link coming soon
      </span>
    )
  }
  return (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export function Countdown({ target, label }: { target: string; label: string }) {
  const r = useRemaining(target)
  const cells = [
    ['Days', r.days],
    ['Hours', r.hours],
    ['Min', r.minutes],
    ['Sec', r.seconds],
  ] as const
  return (
    <div role="timer" aria-label={label}>
      <p className="label mb-2">{label}</p>
      <div className="flex gap-2 sm:gap-3">
        {cells.map(([k, v]) => (
          <div key={k} className="holo px-3 py-2 min-w-[64px] sm:min-w-[84px] text-center">
            <div className="font-mono text-2xl sm:text-4xl text-cyan tabular-nums">{String(v).padStart(2, '0')}</div>
            <div className="label !text-[.6rem] !text-bronze">{k}</div>
          </div>
        ))}
      </div>
      {r.done && <p className="label mt-2 !text-gold">Time reached</p>}
    </div>
  )
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <header className="pt-32 pb-12 px-5 max-w-6xl mx-auto">
      <p className="label mb-3">{eyebrow}</p>
      <h1 className="bronze-text text-4xl sm:text-6xl font-extrabold">{title}</h1>
      {sub && <p className="mt-4 max-w-2xl text-lg text-[#c9c3b4]">{sub}</p>}
    </header>
  )
}

export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`px-5 max-w-6xl mx-auto pb-16 ${className}`}>{children}</section>
}

export function ComingSoon({ children = 'Coming soon' }: { children?: ReactNode }) {
  return <span className="font-mono text-xs tracking-[.2em] uppercase text-bronze border border-dashed border-bronze/50 px-3 py-1 inline-block">{children}</span>
}

/** Slow concentric rings, the Chakravyuh motif. Pure CSS/SVG, no WebGL. */
export function RingsBackdrop({ strong }: { strong?: boolean }) {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vmax] h-[160vmax] ${strong ? 'opacity-70' : 'opacity-35'}`} viewBox="-500 -500 1000 1000">
        {[480, 400, 330, 265, 205, 150, 100, 55].map((r, i) => (
          <g key={r} className={i % 2 ? 'spin-rev' : 'spin-slow'} style={{ transformOrigin: 'center' }}>
            <circle r={r} fill="none" stroke={i % 3 === 0 ? '#2de2e6' : '#b08d4a'} strokeWidth={i % 3 === 0 ? 0.8 : 1.4} strokeDasharray={`${r / 2} ${r / 6} ${r / 14} ${r / 6}`} opacity={0.7 - i * 0.05} />
          </g>
        ))}
        <circle r="18" fill="#2de2e6" className="pulse" opacity=".7" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07090d_75%)]" />
    </div>
  )
}
