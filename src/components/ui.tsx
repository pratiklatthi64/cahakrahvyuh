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
      <p className="font-mono text-xs tracking-[.16em] uppercase text-[#c9c3b4] mb-2">{label}</p>
      <div className="inline-flex border border-bronze/35 bg-obsidian/70 backdrop-blur-md divide-x divide-bronze/25">
        {cells.map(([k, v]) => (
          <div key={k} className="px-4 py-2.5 min-w-[68px] sm:min-w-[84px] text-center">
            <div className="font-mono text-2xl sm:text-3xl text-cyan tabular-nums leading-none">
              {String(v).padStart(2, '0')}
            </div>
            <div className="font-mono text-[.65rem] tracking-[.15em] uppercase text-bronze mt-1">{k}</div>
          </div>
        ))}
      </div>
      {r.done && <p className="label mt-2 !text-gold">Time reached</p>}
    </div>
  )
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <header className="pt-32 pb-10 px-5 max-w-6xl mx-auto">
      <p className="font-mono text-xs tracking-[.18em] uppercase text-cyan mb-2">{eyebrow}</p>
      <h1 className="bronze-text text-4xl sm:text-6xl font-extrabold leading-[1.06]">{title}</h1>
      {sub && <p className="mt-4 max-w-xl text-lg text-[#d8d3c6]">{sub}</p>}
      <div className="mt-8 h-px bg-bronze/30" />
    </header>
  )
}

export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`px-5 max-w-6xl mx-auto pb-16 ${className}`}>{children}</section>
}

export function ComingSoon({ children = 'Coming soon' }: { children?: ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-[.15em] uppercase text-bronze border border-bronze/40 px-2.5 py-0.5 inline-block">
      {children}
    </span>
  )
}
