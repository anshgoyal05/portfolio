/** Detect Safari (excluding Chrome/Chromium on iOS/macOS). */
export function isSafari(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome|CriOS|Chromium|Edg|OPR|Firefox|FxiOS/.test(ua);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Safari + reduced-motion: skip Lenis, custom cursor, heavy blur, mix-blend, scrub animations. */
export function prefersReducedEffects(): boolean {
  return isSafari() || prefersReducedMotion();
}
