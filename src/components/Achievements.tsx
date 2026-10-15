'use client';

import { useEffect, useRef } from 'react';
import { Trophy, Landmark, Flame, Award } from 'lucide-react';
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
      title: "Code With Bharat 3.0",
      sub: "Top 10 Finalist (Team Nexus Flow)",
      desc: "Built wa-crm-intelligence in a 36-hour national hackathon, beating out 65+ competing teams to secure a Top 10 national ranking with an AI revenue intelligence platform.",
      icon: <Trophy className="h-6 w-6 text-[#F97316]" />,
      tag: "TOP 10 NATIONALLY"
    },
    {
      title: "HackIndia 2026",
      sub: "National Coding Challenge Participant & Contender",
      desc: "Collaborated with technical minds on a national scale, building and showcasing end-to-end full-stack software solutions under intense timeline limits.",
      icon: <Award className="h-6 w-6 text-[#D4A017]" />,
      tag: "HACKATHONS"
    },
    {
      title: "ChitkaraVerse 2026",
      sub: "Lead Technical Coordinator & Contributor",
      desc: "Coordinated volunteer squads, designed tech events structure, and guided technical initiatives during the university's flagship annual tech festival.",
      icon: <Flame className="h-6 w-6 text-[#F59E0B]" />,
      tag: "COMMUNITY"
    },
    {
      title: "Student Symposium 2025",
      sub: "Innovation & Research Presentation Participant",
      desc: "Presented innovative concepts and startup-focused research project ideas in front of academic judges and industry mentors.",
      icon: <Landmark className="h-6 w-6 text-[#9A3412]" />,
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
      className="relative bg-[#FFFDF7] py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background warm soft glow */}
      <div className="absolute right-10 bottom-10 w-[350px] h-[350px] bg-orange-100/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl z-10">
        
        {/* Header */}
        <div className="ach-reveal-el mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl font-display text-[#171717] uppercase">
              Achievements
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-[#F97316]/30 to-transparent" />
          </div>
          <span className="mt-2 text-xs font-bold tracking-[0.25em] text-[#F97316] uppercase block">
            Hackathons, Awards, and Leadership Highlights
          </span>
        </div>

        {/* Grid cards layout */}
        <div className="ach-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((ach, idx) => (
            <div
              key={idx}
              className="ach-card group relative p-6 sm:p-7 rounded-3xl bg-white border border-[#EAEAEA] shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:border-[#D4A017]/40 hover:shadow-[0_10px_30px_rgba(245,158,11,0.08)] transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start border-b border-[#EAEAEA] pb-4 mb-4">
                  <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EAEAEA] group-hover:scale-105 transition-transform duration-300">
                    {ach.icon}
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-[#F97316] bg-[#FAF7F0] border border-[#EAEAEA] px-3 py-1 rounded-full">
                    {ach.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#171717] tracking-tight leading-snug group-hover:text-[#F97316] transition-colors duration-300">
                  {ach.title}
                </h3>
                <p className="text-xs font-semibold text-[#D4A017] mt-1">
                  {ach.sub}
                </p>
                <p className="text-xs text-[#666666] mt-3 leading-relaxed">
                  {ach.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[9px] uppercase font-bold tracking-widest text-[#666666] group-hover:text-[#171717] transition-colors duration-300 pt-4 mt-6 border-t border-[#EAEAEA]">
                <span>Verified Milestone</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
