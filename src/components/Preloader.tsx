'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function Preloader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (pathname === '/resume') return;

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setIsLoaded(true);
              document.dispatchEvent(new Event('preloader-complete'));
            }
          });

          // Slide content out, then slide preloader cover up
          tl.to('.preloader-content', {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: 'power3.in'
          })
          .to('.preloader-container', {
            yPercent: -100,
            duration: 1.1,
            ease: 'power4.inOut'
          }, '-=0.2');
        }, 500);
      }
      setProgress(current);
    }, 40);

    return () => clearInterval(interval);
  }, [pathname]);

  if (pathname === '/resume' || isLoaded) return null;

  return (
    <div className="preloader-container fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[#FFFDF7] p-8 font-sans text-[#171717] select-none">
      {/* Top Header */}
      <div className="preloader-content flex w-full justify-between text-xs tracking-[0.25em] text-[#666666] uppercase">
        <div>Ansh Goyal</div>
        <div>Creative Portfolio // 2026</div>
      </div>
      
      {/* Center Branding */}
      <div className="preloader-content flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-black tracking-tighter md:text-9xl font-display text-[#171717]">
          A<span className="text-[#F97316]">.</span>G
        </h1>
        <span className="mt-4 text-[10px] tracking-[0.4em] text-[#666666] uppercase font-bold">
          AI & Full-Stack Developer
        </span>
      </div>

      {/* Bottom Info & Progress Counter */}
      <div className="preloader-content flex w-full items-end justify-between">
        <div className="hidden max-w-xs text-left text-[9px] uppercase tracking-widest text-[#666666] leading-relaxed md:block">
          Specializing in Distributed Systems, Next.js, and AI-powered platforms. Chitkara University BECSE.
        </div>
        <div className="font-mono text-7xl font-thin tracking-tighter md:text-9xl text-[#171717]/85">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}
