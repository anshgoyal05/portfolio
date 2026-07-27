'use client';

import { useEffect, useRef } from 'react';
import { Download, GraduationCap, MapPin, Award, Heart, Eye } from 'lucide-react';
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
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.2)',
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
      icon: <GraduationCap className="h-5 w-5 text-teal-400" />,
      label: 'University',
      value: 'Chitkara University',
      sub: 'B.E. Computer Science & Eng. (BECSE)',
    },
    {
      icon: <Award className="h-5 w-5 text-purple-400" />,
      label: 'Academic Standing',
      value: 'CGPA: 9.16 / 10',
      sub: 'Top Tier in Batch (2024 - 2028)',
    },
    {
      icon: <MapPin className="h-5 w-5 text-teal-400" />,
      label: 'Location',
      value: 'Himachal Pradesh, India',
      sub: 'Chitkara University Solan',
    },
    {
      icon: <Heart className="h-5 w-5 text-purple-400" />,
      label: 'Interests',
      value: 'AI Grievances, Ed-Tech',
      sub: 'Hackathons, Startup Incubators',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-black py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background soft glow */}
      <div className="absolute right-0 bottom-0 w-[450px] h-[450px] bg-teal-900/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl z-10">
        
        {/* Header */}
        <div className="about-reveal-el mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl font-display text-white uppercase">
              About Me
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-teal-400/30 to-transparent" />
          </div>
          <span className="mt-2 text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase block">
            Who I am & what I strive for
          </span>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300">
            <p className="about-reveal-el text-lg md:text-xl font-medium leading-relaxed text-white">
              I am a Computer Science Engineering student specializing in Full-Stack Development (MERN Stack), AI-powered applications, and scalable software systems.
            </p>
            <p className="about-reveal-el text-sm md:text-base leading-relaxed text-neutral-400">
              I focus on building end-to-end applications that solve real-world problems. Whether it's orchestrating AI-driven urban grievance platforms or developing facial matching algorithms, I enjoy writing clean, type-safe code that scales. With a solid foundation in Data Structures, Algorithms, and Object-Oriented Programming, I bring modern web frameworks like Next.js and FastAPI together with machine learning to create high-performance systems.
            </p>
            <p className="about-reveal-el text-sm md:text-base leading-relaxed text-neutral-400">
              Beyond engineering, I am deeply involved in student community leadership. As Vice Chair of our ACM Student Chapter, I oversee technical programming and guide student groups to run coding events and hackathons.
            </p>

            {/* Resume preview modal CTA */}
            <div className="about-reveal-el pt-6 flex flex-wrap gap-4">
              <button
                onClick={openResumeModal}
                className="group relative flex items-center justify-center p-[1.5px] rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 transition-all duration-300 hover:shadow-[0_0_25px_rgba(45,212,191,0.35)] cursor-pointer"
                data-cursor="magnetic"
              >
                <div className="flex items-center gap-2.5 rounded-full bg-black px-8 py-4 transition-all duration-300 group-hover:bg-transparent text-xs font-bold uppercase tracking-wider text-white">
                  <span>View Resume / CV</span>
                  <Eye className="h-4 w-4 text-teal-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                </div>
              </button>
              <a
                href="#contact"
                className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
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
                className="about-card p-6 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-md flex flex-col justify-between h-[180px] hover:border-white/15 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-neutral-800/80 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block mb-1">
                    {stat.label}
                  </span>
                  <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                    {stat.value}
                  </h3>
                  <span className="text-[11px] text-neutral-400 block mt-1">
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
