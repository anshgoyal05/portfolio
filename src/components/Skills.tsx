'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Cpu, Database, Network, Cloud, Users } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillItem {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
  color: string;
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categories: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Terminal className="h-5 w-5 text-[#F97316]" />,
      color: "from-orange-500/10 to-amber-500/0",
      skills: [
        { name: "Python", level: 90 },
        { name: "Go", level: 86 },
        { name: "JavaScript", level: 88 },
        { name: "TypeScript", level: 88 },
        { name: "Java", level: 82 },
        { name: "C++", level: 78 },
        { name: "C", level: 72 },
        { name: "HTML5 / CSS3", level: 92 }
      ]
    },
    {
      title: "Full-Stack & Frameworks",
      icon: <Cpu className="h-5 w-5 text-[#D4A017]" />,
      color: "from-amber-500/10 to-yellow-500/0",
      skills: [
        { name: "MERN Stack", level: 92 },
        { name: "Next.js", level: 90 },
        { name: "React 19", level: 90 },
        { name: "FastAPI", level: 85 },
        { name: "Node.js / Express", level: 88 },
        { name: "WebSockets", level: 84 },
        { name: "OpenCV", level: 78 },
        { name: "TensorFlow", level: 75 }
      ]
    },
    {
      title: "Databases & Systems",
      icon: <Database className="h-5 w-5 text-[#F59E0B]" />,
      color: "from-orange-500/10 to-red-500/0",
      skills: [
        { name: "PostgreSQL & pgvector", level: 86 },
        { name: "Redis & Pub/Sub", level: 85 },
        { name: "MongoDB", level: 90 },
        { name: "Docker", level: 82 },
        { name: "Kubernetes (Basics)", level: 74 },
        { name: "Git / GitHub", level: 92 },
        { name: "Linux / Bash", level: 82 }
      ]
    },
    {
      title: "CS Concepts & AI",
      icon: <Network className="h-5 w-5 text-[#9A3412]" />,
      color: "from-red-500/10 to-orange-500/0",
      skills: [
        { name: "Data Structures & Algos", level: 90 },
        { name: "Object Oriented Programming", level: 88 },
        { name: "Distributed Systems & CRDTs", level: 82 },
        { name: "Machine Learning / Vision AI", level: 80 },
        { name: "DBMS / SQL", level: 86 },
        { name: "REST APIs & JSON", level: 92 }
      ]
    },
    {
      title: "Cloud & Observability",
      icon: <Cloud className="h-5 w-5 text-[#D4A017]" />,
      color: "from-amber-500/10 to-orange-500/0",
      skills: [
        { name: "Microsoft Azure", level: 76 },
        { name: "Azure NLP & AI", level: 80 },
        { name: "Prometheus & Grafana", level: 80 },
        { name: "Vercel / Cloudflare", level: 88 }
      ]
    },
    {
      title: "Leadership & Community",
      icon: <Users className="h-5 w-5 text-[#F97316]" />,
      color: "from-orange-500/10 to-amber-500/0",
      skills: [
        { name: "ACM Student Leadership", level: 92 },
        { name: "Hackathon Coordination", level: 88 },
        { name: "Technical Mentoring", level: 86 },
        { name: "Public Speaking", level: 82 }
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for heading elements
      gsap.fromTo('.skills-reveal-el', 
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

      // Category buttons slide-in
      gsap.fromTo('.skills-category-btn',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.skills-categories-list',
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Fade-in list items on change of category
  useEffect(() => {
    gsap.fromTo('.skill-item-card',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out', overwrite: 'auto' }
    );
  }, [activeCategory]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen bg-[#FFFDF7] py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background warm soft ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[420px] h-[420px] bg-amber-100/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl z-10">
        
        {/* Title */}
        <div className="skills-reveal-el mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl font-display text-[#171717] uppercase">
              Skills
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-[#F97316]/30 to-transparent" />
          </div>
          <span className="mt-2 text-xs font-bold tracking-[0.25em] text-[#F97316] uppercase block">
            Technical Stack & Areas of Expertise
          </span>
        </div>

        {/* Layout: Sidebar Categories + Detail Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          
          {/* Sidebar categories select */}
          <div className="lg:col-span-4 skills-categories-list flex flex-col gap-3">
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#666666] mb-2 px-1">
              Select Category
            </p>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`skills-category-btn group flex items-center justify-between p-4.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  activeCategory === idx
                    ? 'bg-white border-[#D4A017] shadow-[0_4px_20px_rgba(212,160,23,0.12)]'
                    : 'bg-white/60 border-[#EAEAEA] hover:border-[#F59E0B]/40 hover:bg-white'
                }`}
                data-cursor="pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                    activeCategory === idx ? 'bg-[#FAF7F0] border border-[#EAEAEA]' : 'bg-[#FAF7F0]'
                  }`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
                      activeCategory === idx ? 'text-[#171717]' : 'text-[#666666] group-hover:text-[#171717]'
                    }`}>
                      {cat.title}
                    </h3>
                    <span className="text-[10px] text-[#666666] block mt-0.5">
                      {cat.skills.length} skills listed
                    </span>
                  </div>
                </div>
                
                {/* Visual active indicator */}
                <div className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  activeCategory === idx ? 'bg-[#F97316] shadow-[0_0_8px_#F97316]' : 'bg-[#EAEAEA]'
                }`} />
              </button>
            ))}
          </div>

          {/* Active Skills Grid */}
          <div className="lg:col-span-8 p-8 rounded-3xl bg-white border border-[#EAEAEA] shadow-[0_4px_25px_rgba(0,0,0,0.03)] relative overflow-hidden">
            {/* Ambient card background glow */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${categories[activeCategory].color} blur-3xl opacity-60 z-0 pointer-events-none`} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              
              {/* Category Subhead */}
              <div className="flex items-center gap-3 mb-8 border-b border-[#EAEAEA] pb-4">
                <div className="p-2 rounded-xl bg-[#FAF7F0] border border-[#EAEAEA]">
                  {categories[activeCategory].icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#171717]">
                    {categories[activeCategory].title}
                  </h3>
                  <p className="text-xs text-[#666666] mt-0.5">
                    Core technical proficiencies and hands-on production tooling
                  </p>
                </div>
              </div>

              {/* Skills Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {categories[activeCategory].skills.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-item-card group flex items-center justify-center p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAEAEA] hover:border-[#F97316]/50 hover:bg-white hover:shadow-[0_4px_16px_rgba(249,115,22,0.1)] transition-all duration-300"
                  >
                    <h4 className="text-sm font-semibold tracking-tight text-[#171717] group-hover:text-[#F97316] transition-colors duration-300 text-center">
                      {skill.name}
                    </h4>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
