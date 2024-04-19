export const hasReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false // Default to false if window is not available
