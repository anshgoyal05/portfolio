'use client';

import { useEffect, useRef } from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Certificate {
  name: string;
  issuer: string;
  date?: string;
  category: string;
}

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);

  const certificates: Certificate[] = [
    {
      name: "Develop Natural Language Solutions in Azure",
      issuer: "Microsoft",
      date: "Jun 2026",
      category: "AI & Cloud NLP"
    },
    {
      name: "Data Structures & Algorithms in Java & Python",
      issuer: "University Partner / Study Program",
      category: "Algorithms"
    },
    {
      name: "Elements of AI",
      issuer: "MinnaLearn",
      category: "AI Fundamentals"
    },
    {
      name: "Python Programming & Design Thinking",
      issuer: "Infosys Springboard",
      category: "Software Design"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-reveal-el', 
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

      gsap.fromTo('.cert-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cert-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="relative bg-[#FFFDF7] py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background warm ambient glow */}
      <div className="absolute left-1/4 top-1/3 w-[300px] h-[300px] bg-orange-100/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto w-full max-w-5xl z-10">
        
        {/* Header */}
        <div className="cert-reveal-el mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl font-display text-[#171717] uppercase">
              Certifications
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-[#F97316]/30 to-transparent" />
          </div>
          <span className="mt-2 text-xs font-bold tracking-[0.25em] text-[#F97316] uppercase block">
            Accredited Achievements & Specialized Knowledge
          </span>
        </div>

        {/* Certificate card grid */}
        <div className="cert-grid grid grid-cols-1 sm:grid-cols-2 gap-5">
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className="cert-card group p-6 rounded-3xl bg-white border border-[#EAEAEA] shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:border-[#D4A017]/40 hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] transition-all duration-500 flex items-start gap-4"
            >
              <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EAEAEA] text-[#D4A017] group-hover:scale-105 group-hover:text-[#F97316] transition-all duration-300">
                <Award className="h-5 w-5" />
              </div>

              <div className="flex-1 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F97316]">
                  {cert.category}
                </span>
                
                <h3 className="text-sm sm:text-base font-bold text-[#171717] group-hover:text-[#F97316] transition-colors duration-300">
                  {cert.name}
                </h3>
                
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-[#666666] font-semibold">{cert.issuer}</span>
                  {cert.date && (
                    <>
                      <span className="text-[10px] text-[#EAEAEA]">•</span>
                      <span className="text-[10px] font-mono text-[#666666] font-semibold">{cert.date}</span>
                    </>
                  )}
                </div>
              </div>

              <ShieldCheck className="h-5 w-5 text-[#D4A017] opacity-30 group-hover:opacity-100 transition-opacity duration-300 self-center flex-shrink-0" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
