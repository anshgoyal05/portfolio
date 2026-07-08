'use client';

import { useEffect, useRef } from 'react';
import { Trophy, Compass, Landmark, Flame } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Achievement {
  title: string;
  sub: string;
  desc: string;
  icon: React.ReactNode;
  tag: string;
}

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);

  const achievements: Achievement[] = [
    {
      title: "HackIndia 2026",
      sub: "National Coding Challenge Participant & Contender",
      desc: "Collaborated with technical minds on a national scale, building and showcasing end-to-end full-stack software solutions under intense timeline limits.",
      icon: <Trophy className="h-6 w-6 text-teal-400" />,
      tag: "HACKATHONS"
    },
    {
      title: "ChitkaraVerse 2026",
      sub: "Lead Technical Coordinator & Contributor",
      desc: "Coordinated volunteer squads, designed tech events structure, and guided technical initiatives during the university's flagship annual tech festival.",
      icon: <Flame className="h-6 w-6 text-purple-400" />,
      tag: "COMMUNITY"
    },
    {
      title: "Student Symposium 2025",
      sub: "Innovation & Research Presentation Participant",
      desc: "Presented innovative concepts and startup-focused research project ideas in front of academic judges and industry mentors.",
      icon: <Landmark className="h-6 w-6 text-teal-400" />,
      tag: "SYMPOSIUM"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ach-reveal-el', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo('.ach-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ach-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative bg-black py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background soft glow overlay */}
      <div className="absolute right-10 bottom-10 w-[350px] h-[350px] bg-teal-950/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="mx-auto w-full max-w-5xl z-10">
        
        {/* Header */}
        <div className="ach-reveal-el mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl font-display text-white uppercase">
              Achievements
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-teal-400/30 to-transparent" />
          </div>
          <span className="mt-2 text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase block">
            Hackathons, Awards, and Leadership Highlights
          </span>
        </div>

        {/* Grid cards layout */}
        <div className="ach-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => (
            <div
              key={idx}
              className="ach-card group relative p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 hover:bg-neutral-900/60 hover:shadow-[0_0_35px_rgba(255,255,255,0.01)] transition-all duration-500 flex flex-col justify-between h-[300px]"
            >
              <div>
                <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-5">
                  <div className="p-3 rounded-2xl bg-neutral-800 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                    {ach.icon}
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-teal-400 bg-teal-400/5 border border-teal-400/20 px-3 py-1 rounded-full">
                    {ach.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-teal-400 transition-colors duration-300">
                  {ach.title}
                </h3>
                <p className="text-xs font-semibold text-neutral-400 mt-1">
                  {ach.sub}
                </p>
                <p className="text-xs text-neutral-500 mt-3 leading-relaxed">
                  {ach.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[9px] uppercase font-bold tracking-widest text-neutral-400 group-hover:text-white transition-colors duration-300 pt-4 mt-auto border-t border-white/5">
                <span>Milestone Achieved</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
