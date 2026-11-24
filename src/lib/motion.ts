export const lowMotion =
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true)
