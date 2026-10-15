'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedEffects } from '@/lib/browser';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRotatorRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const roles = ["Full-Stack Developer", "AI Developer", "ACM Vice Chair"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    // Intro animation once the preloader completes
    const handleIntro = () => {
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-title-word', 
        { yPercent: 100, opacity: 0 }, 
        { yPercent: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.1 }
      )
      .fromTo(textRotatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(imageRef.current,
        { scale: 1.3, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
        { scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut' },
        '-=1.2'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.8'
      );
    };

    document.addEventListener('preloader-complete', handleIntro);
    
    // Parallax effect on scroll (disabled on Safari — scrub + transform is costly)
    const ctx = gsap.context(() => {
      if (!prefersReducedEffects()) {
        gsap.to('.hero-parallax-img', {
          yPercent: 12,
          scale: 1.08,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => {
      document.removeEventListener('preloader-complete', handleIntro);
      ctx.revert();
    };
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col justify-between bg-[#FFFDF7] pt-28 pb-10 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Background warm festive ambient layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/30 via-[#FFFDF7] to-[#FFFDF7] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-orange-200/25 rounded-full blur-[130px] bg-blur-orb pointer-events-none" />

      <div className="z-10 flex flex-col flex-1 justify-center max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          
          {/* Main Titles and Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="overflow-hidden mb-3">
              <span className="text-[11px] md:text-xs font-bold tracking-[0.25em] text-[#F97316] uppercase block">
                Welcome to my creative space
              </span>
            </div>
            
            <h1
              ref={titleRef}
              className="text-6xl font-black leading-[0.92] tracking-tight md:text-8xl lg:text-[7.5rem] font-display text-[#171717]"
            >
              <div className="overflow-hidden h-fit py-1 block">
                <span className="hero-title-word inline-block">ANSH</span>
              </div>
              <div className="overflow-hidden h-fit py-1 block">
                <span className="hero-title-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#171717] via-[#9A3412] to-[#F97316]">
                  GOYAL
                </span>
              </div>
            </h1>

            {/* Dynamic Role Rotator */}
            <div ref={textRotatorRef} className="mt-8 flex items-center gap-2.5 text-lg md:text-2xl text-[#666666] font-medium h-[1.5em] overflow-hidden">
              <span>I am a</span>
              <div className="relative font-bold text-[#171717] h-full w-[260px]">
                {roles.map((role, idx) => (
                  <span
                    key={role}
                    className={`absolute left-0 top-0 transition-all duration-700 ease-in-out ${
                      idx === currentRoleIndex
                        ? 'translate-y-0 opacity-100 text-[#F97316]'
                        : idx === (currentRoleIndex - 1 + roles.length) % roles.length
                        ? '-translate-y-full opacity-0'
                        : 'translate-y-full opacity-0'
                    }`}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 max-w-lg text-sm md:text-base leading-relaxed text-[#666666]">
              Computer Science student at Chitkara University. Building distributed backends, AI-powered systems, and production web applications.
            </p>

            {/* Call to action buttons */}
            <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="group relative flex items-center justify-center overflow-hidden rounded-full bg-[#F97316] hover:bg-[#EA580C] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition-all duration-300"
                data-cursor="magnetic"
              >
                <span className="relative z-10">View Work</span>
              </a>
              <a
                href="#contact"
                className="group relative flex items-center justify-center overflow-hidden rounded-full border border-[#EAEAEA] bg-white hover:border-[#171717] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#171717] hover:bg-[#FAF7F0] shadow-sm transition-all duration-300"
                data-cursor="pointer"
              >
                <span className="relative z-10">Let&apos;s Connect</span>
              </a>
            </div>
          </div>

          {/* Profile Frame with reveal and parallax */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div
              ref={imageRef}
              className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-3xl overflow-hidden border border-[#EAEAEA] bg-white shadow-[0_20px_50px_rgba(212,160,23,0.08)] group"
              style={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 border border-[#EAEAEA] rounded-3xl z-10 pointer-events-none" />
              
              <Image
                src="/portrait.jpg"
                alt="Ansh Goyal Portrait"
                fill
                priority
                className="hero-parallax-img object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 300px, 380px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="z-10 flex w-full justify-between items-center max-w-7xl mx-auto border-t border-[#EAEAEA] pt-6 text-[10px] sm:text-[11px] font-medium tracking-widest text-[#666666] uppercase">
        <div>B.E. CSE // Chitkara University</div>
        <button
          onClick={handleScrollDown}
          className="group flex items-center gap-2 hover:text-[#171717] transition-colors cursor-pointer"
          data-cursor="magnetic"
        >
          <span>Scroll Down</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-[#F97316] group-hover:text-[#D4A017] transition-colors" />
        </button>
        <div>Solan, India</div>
      </div>
    </section>
  );
}
