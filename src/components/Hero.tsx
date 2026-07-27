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
      className="relative flex min-h-screen flex-col justify-between bg-black pt-28 pb-10 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Background glow layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-950/15 via-black to-black opacity-80 z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[120px] bg-blur-orb pointer-events-none" />

      <div className="z-10 flex flex-col flex-1 justify-center max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          
          {/* Main Titles and Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="overflow-hidden mb-2">
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-teal-400 uppercase block">
                Welcome to my creative space
              </span>
            </div>
            
            <h1
              ref={titleRef}
              className="text-6xl font-black leading-[0.9] tracking-tighter md:text-8xl lg:text-[7.5rem] font-display text-white"
            >
              <div className="overflow-hidden h-fit py-1 block">
                <span className="hero-title-word inline-block">ANSH</span>
              </div>
              <div className="overflow-hidden h-fit py-1 block">
                <span className="hero-title-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
                  GOYAL
                </span>
              </div>
            </h1>

            {/* Dynamic Role Rotator */}
            <div ref={textRotatorRef} className="mt-8 flex items-center gap-2.5 text-lg md:text-2xl text-neutral-400 font-medium h-[1.5em] overflow-hidden">
              <span>I am a</span>
              <div className="relative font-bold text-white h-full w-[240px]">
                {roles.map((role, idx) => (
                  <span
                    key={role}
                    className={`absolute left-0 top-0 transition-all duration-700 ease-in-out ${
                      idx === currentRoleIndex
                        ? 'translate-y-0 opacity-100'
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

            <p className="mt-6 max-w-lg text-sm md:text-base leading-relaxed text-neutral-400">
              Computer Science student at Chitkara University. Building AI-powered web portals, MERN stacks, and high-performance software systems.
            </p>

            {/* Call to action buttons */}
            <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-wider text-black transition-colors duration-300"
                data-cursor="magnetic"
              >
                <span className="relative z-10">View Work</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-teal-400 to-blue-500 group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </a>
              <a
                href="#contact"
                className="group relative flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-white"
                data-cursor="pointer"
              >
                <span className="relative z-10">Let's Connect</span>
              </a>
            </div>
          </div>

          {/* Profile Frame with reveal and parallax */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div
              ref={imageRef}
              className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-3xl overflow-hidden border border-white/10 group shadow-[0_0_50px_rgba(13,255,255,0.03)] bg-neutral-900"
              style={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 border-[6px] border-black/85 rounded-3xl z-10 pointer-events-none" />
              <div className="absolute inset-0 border border-white/10 rounded-3xl z-10 pointer-events-none" />
              
              <Image
                src="/portrait.jpg"
                alt="Ansh Goyal Portrait"
                fill
                priority
                className="hero-parallax-img object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                sizes="(max-width: 768px) 300px, 380px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="z-10 flex w-full justify-between items-center max-w-7xl mx-auto border-t border-white/5 pt-6 text-[10px] tracking-widest text-neutral-500 uppercase">
        <div>B.E. CSE // Chitkara University</div>
        <button
          onClick={handleScrollDown}
          className="group flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          data-cursor="magnetic"
        >
          <span>Scroll Down</span>
          <ArrowDown className="h-3 w-3 animate-bounce group-hover:text-teal-400 transition-colors" />
        </button>
        <div>Solan, India</div>
      </div>
    </section>
  );
}
