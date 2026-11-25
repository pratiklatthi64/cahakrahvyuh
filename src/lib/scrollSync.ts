// Shared mutable scroll state for 60fps synchronization across:
// 1. GSAP ScrollTrigger / Lenis
// 2. Three.js 3D Camera, Rings & Particles (ChakravyuhScene)
// 3. Multi-layer VideoBackdrop continuous crossfading
//
// Per-frame values live here — NEVER in React state — to guarantee zero scroll jank.

export const scrollSync = {
  /** Normalized scroll progress on the current page [0..1] */
  progress: 0,
  /** Smoothed progress for buttery camera & video blending [0..1] */
  smoothProgress: 0,
  /** Instantaneous scroll velocity (positive = down, negative = up) */
  velocity: 0,
  /** Smoothed scroll velocity for warp-speed particle/FOV effects */
  smoothVelocity: 0,
  /** Continuous shot position [0..5.0] across the 6 Chakravyuh shots */
  shotFloat: 0,
  /** Whether the current route is Home (/) */
  isHome: true,
}

/**
 * Compute continuous opacity [0..1] for shot index `i` (0..5) given `shotFloat` (0..5).
 * Uses overlapping smoothstep crossfades so there is never a hard cut or black gap.
 */
export function getShotOpacity(shotIndex: number, shotFloat: number): number {
  const dist = Math.abs(shotFloat - shotIndex)
  if (dist >= 1) return 0
  // Smoothstep falloff: 1 at center, 0 at distance 1
  const t = 1 - dist
  return t * t * (3 - 2 * t)
}
