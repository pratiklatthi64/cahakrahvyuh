// Chakravyuh Vibe Coding — 6-Shot Cinematic Video Registry
// All shots generated via Google Flow / Veo 3. Arranged in narrative order:
// outer ring → coders → products → HUD panels → corridor → core.

export interface ChakravyuhVideo {
  /** Unique identifier */
  id: string
  /** Shot number (1-based, narrative order) */
  shot: number
  /** Short display name shown in the HUD watermark */
  name: string
  /** Which Chakravyuh layer this represents */
  layer: 'approach' | 'ring-1' | 'ring-2' | 'corridor' | 'core'
  /** Detailed description for aria/debugging */
  description: string
  /** Public path served from /public */
  src: string
}

export const CHAKRAVYUH_VIDEOS: ChakravyuhVideo[] = [
  {
    id: 'shot1-approach',
    shot: 1,
    name: 'OUTER FORMATION — APPROACH',
    layer: 'approach',
    description:
      'Aerial camera enters the giant Chakravyuh spiral formation from outside — obsidian stone floor with glowing cyan circuit grooves, starfield above.',
    src: '/videos/shot1-chakravyuh-approach.mp4',
  },
  {
    id: 'shot2-coders',
    shot: 2,
    name: 'RING I — CODERS IN THE FORMATION',
    layer: 'ring-1',
    description:
      'Inside the outermost ring: vibe coders sit at floating holographic terminals arranged in a circle inside ancient bronze and stone chambers. Code streams cascade.',
    src: '/videos/shot2-coders-typing.mp4',
  },
  {
    id: 'shot3-products',
    shot: 3,
    name: 'RING I — CODE BECOMES PRODUCT',
    layer: 'ring-1',
    description:
      'Code streams reorganize and transform into holographic website interfaces and product screens that materialize around the terminals. The vibe-coding loop made visible.',
    src: '/videos/shot3-products-manifest.mp4',
  },
  {
    id: 'shot4-hud',
    shot: 4,
    name: 'RING II — INFORMATION FORMATION',
    layer: 'ring-2',
    description:
      'Second ring inner wall: large holographic HUD panels embedded in stone archways display hackathon data — register, dates, judging info — in IIT-fest command-center style.',
    src: '/videos/shot4-hud-panels.mp4',
  },
  {
    id: 'shot5-corridor',
    shot: 5,
    name: 'CORRIDOR — THE PASSAGE',
    layer: 'corridor',
    description:
      'First-person dolly through the Sanskrit-circuit corridor. Bronze octagonal archways repeat, cyan floor circuits pulse ahead, volumetric god-rays beckon from the core.',
    src: '/videos/shot5-corridor-flythrough.mp4',
  },
  {
    id: 'shot6-core',
    shot: 6,
    name: 'THE CORE — ARMILLARY SPHERE',
    layer: 'core',
    description:
      "The epicenter: three concentric bronze orbital rings rotating at different axes around a glowing cyan plasma energy orb. The Chakravyuh's heart. Register here.",
    src: '/videos/shot6-armillary-core.mp4',
  },
]

// Total shots
export const TOTAL_SHOTS = CHAKRAVYUH_VIDEOS.length

// Map: scroll progress on Home page (0–1) → shot index
// Split the journey into 6 equal bands
export function getHomeScrollShot(progress: number): number {
  const band = 1 / TOTAL_SHOTS
  return Math.min(TOTAL_SHOTS - 1, Math.floor(progress / band))
}

// Map: route pathname → shot index shown on that page
export const ROUTE_SHOT: Record<string, number> = {
  '/':              0, // dynamic via scroll
  '/how-it-works':  1, // Coders Ring I
  '/journey':       3, // HUD Ring II (journey info)
  '/prizes':        5, // Core — the reward
  '/judges':        3, // HUD panels — judges as AI agents
  '/partners':      0, // Approach
  '/register':      5, // Core — register here
  '/shortlist':     4, // Corridor — getting through
  '/faq':           1, // Coders Ring I
  '/contact':       2, // Products Ring I
}
