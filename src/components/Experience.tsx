'use client';

import { useEffect, useRef } from 'react';
import { Calendar, Briefcase, ChevronRight, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  duration: string;
  points: string[];
  tags: string[];
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const experiences: ExperienceItem[] = [
    {
      role: "Vice Chair",
      organization: "Chitkara University ACM Student Chapter",
      location: "Chitkara University, Solan",
      duration: "Jul 2026 – Present",
      points: [
        "Serve on the executive leadership team, setting chapter strategy and overseeing technical programming across 12+ events attended by 500+ students.",
        "Coordinate student volunteers and technical teams to deliver hackathons, workshops, and coding competitions."
      ],
      tags: ["Leadership", "Event Management", "Technical Mentoring", "Public Relations"]
    },
    {
      role: "Member",
      organization: "Chitkara Enterprise Lab",
      location: "Chitkara University, Solan",
      duration: "Jan 2026 – Present",
      points: [
        "Engage in startup-focused learning, innovation programmes, and entrepreneurial development initiatives, transforming ideas into practical solutions with industry mentorship."
      ],
      tags: ["Entrepreneurship", "Innovation", "Business Design", "Startup Ecosystems"]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header
      gsap.fromTo('.exp-reveal-el', 
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

      // Animate timeline nodes
      gsap.fromTo('.exp-timeline-node',
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.exp-timeline-line',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Slide in content cards
      gsap.fromTo('.exp-timeline-card',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.exp-timeline-line',
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen bg-black py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background radial lights */}
      <div className="absolute right-10 top-1/4 w-[350px] h-[350px] bg-teal-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-5xl z-10">
        
        {/* Header */}
        <div className="exp-reveal-el mb-20">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl font-display text-white uppercase">
              Experience
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-teal-400/30 to-transparent" />
          </div>
          <span className="mt-2 text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase block">
            Leadership Roles & Incubation History
          </span>
        </div>

        {/* Timeline container */}
        <div className="relative exp-timeline-line pl-8 sm:pl-16 border-l border-white/10 ml-4 sm:ml-8 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative">
              
              {/* Timeline marker */}
              <div className="exp-timeline-node absolute -left-[41px] sm:-left-[73px] top-1 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-neutral-900 border-2 border-white/15 flex items-center justify-center transition-all duration-500 group-hover:border-teal-400">
                <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-teal-400 shadow-[0_0_8px_#0df]" />
              </div>

              {/* Card Container */}
              <div className="exp-timeline-card group p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 hover:bg-neutral-900/60 hover:shadow-[0_0_30px_rgba(13,255,255,0.01)] transition-all duration-500">
                
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/5 pb-4 mb-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-teal-400 transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-neutral-400">
                        {exp.organization}
                      </span>
                      <span className="text-[10px] text-neutral-600">•</span>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 w-fit">
                    <Calendar className="h-3.5 w-3.5 text-purple-400" />
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-neutral-300">
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-3.5 text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <ChevronRight className="h-4.5 w-4.5 text-teal-400 mt-1 flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 bg-neutral-900 border border-white/5 px-3 py-1 rounded-full group-hover:border-neutral-800 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
