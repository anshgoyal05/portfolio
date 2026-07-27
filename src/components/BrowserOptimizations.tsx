'use client';

import { useEffect } from 'react';
import { prefersReducedEffects } from '@/lib/browser';

export default function BrowserOptimizations() {
  useEffect(() => {
    document.documentElement.dataset.effects = prefersReducedEffects() ? 'lite' : 'full';
  }, []);

  return null;
}
