'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Quick setters for high performance smooth translations
    const xCursor = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power3.out" });
    const yCursor = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power3.out" });
    const xFollower = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power3.out" });
    const yFollower = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power3.out" });

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xCursor(e.clientX - 4);
      yCursor(e.clientY - 4);
      xFollower(e.clientX - 20);
      yFollower(e.clientY - 20);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('[data-cursor]');
      
      if (interactive) {
        isHovering = true;
        const type = interactive.getAttribute('data-cursor');
        
        if (type === 'pointer') {
          gsap.to(follower, {
            scale: 1.8,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'var(--color-teal-glow, #0df)',
            duration: 0.3,
            overwrite: 'auto'
          });
          gsap.to(cursor, {
            scale: 0.6,
            backgroundColor: 'var(--color-teal-glow, #0df)',
            duration: 0.3,
            overwrite: 'auto'
          });
        } else if (type === 'magnetic') {
          gsap.to(follower, {
            scale: 2.4,
            borderColor: 'var(--color-purple-glow, #8a2be2)',
            backgroundColor: 'rgba(138, 43, 226, 0.12)',
            duration: 0.3,
            overwrite: 'auto'
          });
          gsap.to(cursor, {
            scale: 0,
            duration: 0.3,
            overwrite: 'auto'
          });
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('[data-cursor]');
      
      if (interactive && !e.relatedTarget) {
        // If we are leaving the element completely
        resetCursor();
      } else if (interactive && e.relatedTarget) {
        const newTarget = e.relatedTarget as HTMLElement;
        if (!newTarget.closest('[data-cursor]')) {
          resetCursor();
        }
      }
    };

    const resetCursor = () => {
      isHovering = false;
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        duration: 0.3,
        overwrite: 'auto'
      });
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: '#ffffff',
        duration: 0.3,
        overwrite: 'auto'
      });
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-white transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } hidden md:block`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      <div
        ref={followerRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-white/30 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } hidden md:block`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
}
