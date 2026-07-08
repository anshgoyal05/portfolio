'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        lerp: 0.08,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
