'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { prefersReducedEffects } from '@/lib/browser';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const pendingMoveRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setEnabled(!prefersReducedEffects() && !isTouchDevice);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const xCursor = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power3.out', force3D: true });
    const yCursor = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power3.out', force3D: true });
    const xFollower = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power3.out', force3D: true });
    const yFollower = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power3.out', force3D: true });

    const setVisible = (visible: boolean) => {
      if (isVisibleRef.current === visible) return;
      isVisibleRef.current = visible;
      cursor.style.opacity = visible ? '1' : '0';
      follower.style.opacity = visible ? '1' : '0';
    };

    const flushMove = () => {
      rafIdRef.current = null;
      const point = pendingMoveRef.current;
      if (!point) return;

      setVisible(true);
      xCursor(point.x - 4);
      yCursor(point.y - 4);
      xFollower(point.x - 20);
      yFollower(point.y - 20);
    };

    const onMouseMove = (e: MouseEvent) => {
      pendingMoveRef.current = { x: e.clientX, y: e.clientY };
      if (rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(flushMove);
      }
    };

    const resetCursor = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(23, 23, 23, 0.25)',
        duration: 0.3,
        overwrite: 'auto',
      });
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: '#171717',
        duration: 0.3,
        overwrite: 'auto',
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('[data-cursor]');
      if (!interactive) return;

      const type = interactive.getAttribute('data-cursor');

      if (type === 'pointer') {
        gsap.to(follower, {
          scale: 1.8,
          backgroundColor: 'rgba(249, 115, 22, 0.08)',
          borderColor: '#F97316',
          duration: 0.3,
          overwrite: 'auto',
        });
        gsap.to(cursor, {
          scale: 0.6,
          backgroundColor: '#F97316',
          duration: 0.3,
          overwrite: 'auto',
        });
      } else if (type === 'magnetic') {
        gsap.to(follower, {
          scale: 2.2,
          borderColor: '#D4A017',
          backgroundColor: 'rgba(212, 160, 23, 0.12)',
          duration: 0.3,
          overwrite: 'auto',
        });
        gsap.to(cursor, {
          scale: 0,
          duration: 0.3,
          overwrite: 'auto',
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('[data-cursor]');

      if (interactive && !e.relatedTarget) {
        resetCursor();
      } else if (interactive && e.relatedTarget) {
        const newTarget = e.relatedTarget as HTMLElement;
        if (!newTarget.closest('[data-cursor]')) {
          resetCursor();
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseleave', () => setVisible(false));
    document.addEventListener('mouseenter', () => setVisible(true));

    return () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#171717] opacity-0 hidden md:block"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-[#171717]/25 opacity-0 hidden md:block"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
}
