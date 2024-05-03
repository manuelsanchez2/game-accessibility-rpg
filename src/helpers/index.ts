export const hasReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false // Default to false if window is not available

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
