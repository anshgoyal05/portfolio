'use client';

import { useEffect, useRef } from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  grade: string;
  details: string[];
}

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  const educationList: EducationItem[] = [
    {
      degree: "Bachelor of Engineering - Computer Science & Engineering (BECSE)",
      institution: "Chitkara University, Himachal Pradesh",
      duration: "Aug 2024 – Jun 2028",
      grade: "CGPA – 9.16 / 10",
      details: [
        "Focused study in Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), and Computer Networks.",
        "Active member of the ACM Student Chapter (serving as Vice Chair) and Chitkara Enterprise Lab."
      ]
    },
    {
      degree: "Senior Secondary - Non-Medical (PCM)",
      institution: "Sunrise Public School Banaundi, Ambala",
      duration: "Jul 2022 – May 2024",
      grade: "Completed",
      details: [
        "Rigorous coursework in Physics, Chemistry, Mathematics, and Computer Science foundations.",
        "Developed solid algorithmic and logical problem-solving skills."
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.edu-reveal-el', 
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

      gsap.fromTo('.edu-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.edu-list',
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
      id="education"
      ref={containerRef}
      className="relative bg-black py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute right-0 top-1/2 w-[350px] h-[350px] bg-teal-950/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-5xl z-10">
        
        {/* Header */}
        <div className="edu-reveal-el mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl font-display text-white uppercase">
              Education
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-teal-400/30 to-transparent" />
          </div>
          <span className="mt-2 text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase block">
            Academic Background & Core Studies
          </span>
        </div>

        {/* Education list */}
        <div className="edu-list space-y-6">
          {educationList.map((edu, idx) => (
            <div
              key={idx}
              className="edu-card group p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 hover:bg-neutral-900/60 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-white/5 pb-4 mb-4">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-teal-400 transition-colors duration-300">
                    {edu.degree}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <GraduationCap className="h-4 w-4 text-neutral-500" />
                    <span>{edu.institution}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-4 py-1 text-xs text-neutral-300">
                    <Calendar className="h-3.5 w-3.5 text-purple-400" />
                    <span className="font-mono font-medium">{edu.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-1 text-xs text-teal-400 font-bold">
                    <Award className="h-3.5 w-3.5" />
                    <span>{edu.grade}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {edu.details.map((detail, dIdx) => (
                  <p key={dIdx} className="text-neutral-400 text-sm md:text-base leading-relaxed flex items-start gap-2.5">
                    <BookOpen className="h-4 w-4 text-teal-400 mt-1 flex-shrink-0" />
                    <span>{detail}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
