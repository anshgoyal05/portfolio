'use client';

import { useEffect, useRef } from 'react';
import { GraduationCap, MapPin, Award, Heart, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useResumeModal } from './ResumeModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openResumeModal } = useResumeModal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal title and dividers
      gsap.fromTo('.about-reveal-el', 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Fade-in cards
      gsap.fromTo('.about-card',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-cards-container',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: <GraduationCap className="h-5 w-5 text-[#F97316]" />,
      label: 'University',
      value: 'Chitkara University',
      sub: 'B.E. Computer Science & Eng. (BECSE)',
    },
    {
      icon: <Award className="h-5 w-5 text-[#D4A017]" />,
      label: 'Academic Standing',
      value: 'CGPA: 9.16 / 10',
      sub: 'Top Tier in Batch (2024 - 2028)',
    },
    {
      icon: <MapPin className="h-5 w-5 text-[#F59E0B]" />,
      label: 'Location',
      value: 'Himachal Pradesh, India',
      sub: 'Chitkara University Solan',
    },
    {
      icon: <Heart className="h-5 w-5 text-[#9A3412]" />,
      label: 'Interests',
      value: 'AI Grievances, Distributed Systems',
      sub: 'Hackathons, Real-Time Collaboration',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-[#FFFDF7] py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background warm festive glow */}
      <div className="absolute right-0 bottom-0 w-[450px] h-[450px] bg-amber-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl z-10">
        
        {/* Header */}
        <div className="about-reveal-el mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl font-display text-[#171717] uppercase">
              About Me
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-[#F97316]/30 to-transparent" />
          </div>
          <span className="mt-2 text-xs font-bold tracking-[0.25em] text-[#F97316] uppercase block">
            Who I am & what I strive for
          </span>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-[#666666]">
            <p className="about-reveal-el text-lg md:text-xl font-medium leading-relaxed text-[#171717]">
              I am a Computer Science Engineering student specializing in Full-Stack Development (MERN Stack), Distributed Systems in Go, and AI-powered applications.
            </p>
            <p className="about-reveal-el text-sm md:text-base leading-relaxed text-[#666666]">
              I focus on building end-to-end applications that solve real-world problems. Whether it&apos;s architecting horizontally scalable real-time editors in Go with CRDTs, building AI-driven urban grievance platforms, or automating statutory GST 3-way reconciliation for Indian MSMEs, I enjoy writing clean, type-safe, resilient software.
            </p>
            <p className="about-reveal-el text-sm md:text-base leading-relaxed text-[#666666]">
              Beyond engineering, I am deeply involved in student community leadership. As Vice Chair of the Chitkara University ACM Student Chapter, I oversee chapter strategy and technical programming across hackathons, workshops, and coding competitions.
            </p>

            {/* Resume preview modal CTA */}
            <div className="about-reveal-el pt-6 flex flex-wrap gap-4">
              <button
                onClick={openResumeModal}
                className="group relative flex items-center justify-center rounded-full bg-[#171717] hover:bg-[#F97316] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.3)] transition-all duration-300 cursor-pointer"
                data-cursor="magnetic"
              >
                <div className="flex items-center gap-2.5">
                  <span>View Resume / CV</span>
                  <Eye className="h-4 w-4 text-[#F59E0B] group-hover:text-white transition-colors" />
                </div>
              </button>
              <a
                href="#contact"
                className="flex items-center justify-center rounded-full border border-[#EAEAEA] bg-white hover:bg-[#FAF7F0] hover:border-[#171717] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#171717] shadow-sm transition-all duration-300"
                data-cursor="pointer"
              >
                My Journey & Goals
              </a>
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-5 about-cards-container grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="about-card p-6 rounded-2xl bg-white border border-[#EAEAEA] flex flex-col justify-between h-[180px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(245,158,11,0.09)] hover:border-[#F59E0B]/40 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EAEAEA] group-hover:scale-105 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#666666] block mb-1">
                    {stat.label}
                  </span>
                  <h3 className="text-base font-bold text-[#171717] tracking-tight leading-snug">
                    {stat.value}
                  </h3>
                  <span className="text-[11px] text-[#666666] block mt-1">
                    {stat.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
