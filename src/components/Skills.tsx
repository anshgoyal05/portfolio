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
  level: number; // 0 to 100
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
  color: string; // Tailwind class color for glow
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categories: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Terminal className="h-5 w-5 text-teal-400" />,
      color: "from-teal-500/20 to-teal-500/0",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 88 },
        { name: "TypeScript", level: 85 },
        { name: "Java", level: 80 },
        { name: "C++", level: 75 },
        { name: "C", level: 70 },
        { name: "HTML5 / CSS3", level: 92 }
      ]
    },
    {
      title: "Full-Stack & Frameworks",
      icon: <Cpu className="h-5 w-5 text-purple-400" />,
      color: "from-purple-500/20 to-purple-500/0",
      skills: [
        { name: "MERN Stack", level: 92 },
        { name: "Next.js", level: 88 },
        { name: "React", level: 90 },
        { name: "FastAPI", level: 82 },
        { name: "Node.js / Express", level: 88 },
        { name: "OpenCV", level: 78 },
        { name: "TensorFlow", level: 75 }
      ]
    },
    {
      title: "Databases & Tools",
      icon: <Database className="h-5 w-5 text-blue-400" />,
      color: "from-blue-500/20 to-blue-500/0",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 90 },
        { name: "Docker", level: 80 },
        { name: "Git / GitHub", level: 92 },
        { name: "Linux / Bash", level: 80 },
        { name: "npm / Yarn", level: 88 },
        { name: "VS Code", level: 95 }
      ]
    },
    {
      title: "CS Concepts",
      icon: <Network className="h-5 w-5 text-teal-400" />,
      color: "from-teal-500/20 to-teal-500/0",
      skills: [
        { name: "Data Structures & Algos", level: 90 },
        { name: "Object Oriented Programming", level: 88 },
        { name: "Machine Learning / NLP", level: 78 },
        { name: "DBMS / SQL", level: 85 },
        { name: "REST APIs", level: 90 },
        { name: "Computer Networks", level: 80 }
      ]
    },
    {
      title: "Cloud Services",
      icon: <Cloud className="h-5 w-5 text-purple-400" />,
      color: "from-purple-500/20 to-purple-500/0",
      skills: [
        { name: "Microsoft Azure", level: 75 },
        { name: "Azure NLP API", level: 80 },
        { name: "App Hosting / Vercel", level: 88 }
      ]
    },
    {
      title: "Leadership",
      icon: <Users className="h-5 w-5 text-blue-400" />,
      color: "from-blue-500/20 to-blue-500/0",
      skills: [
        { name: "Team Leadership", level: 90 },
        { name: "Event Management", level: 85 },
        { name: "Technical Mentoring", level: 88 }
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
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', overwrite: 'auto' }
    );
  }, [activeCategory]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen bg-black py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-950/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl z-10">
        
        {/* Title */}
        <div className="skills-reveal-el mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl font-display text-white uppercase">
              Skills
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-teal-400/30 to-transparent" />
          </div>
          <span className="mt-2 text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase block">
            Technical Stack & Areas of Expertise
          </span>
        </div>

        {/* Layout: Sidebar Categories + Detail Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          
          {/* Sidebar categories select */}
          <div className="lg:col-span-4 skills-categories-list flex flex-col gap-3">
            <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-2 px-1">
              Select Category
            </p>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`skills-category-btn group flex items-center justify-between p-4.5 rounded-2xl border text-left transition-all duration-300 ${
                  activeCategory === idx
                    ? 'bg-neutral-900 border-white/10 shadow-[0_0_30px_rgba(13,255,255,0.02)]'
                    : 'bg-transparent border-white/5 hover:border-white/15'
                }`}
                data-cursor="pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    activeCategory === idx ? 'bg-neutral-800 border border-white/10' : 'bg-neutral-900/50'
                  }`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
                      activeCategory === idx ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                    }`}>
                      {cat.title}
                    </h3>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      {cat.skills.length} skills listed
                    </span>
                  </div>
                </div>
                
                {/* Visual active bulb indicator */}
                <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  activeCategory === idx ? 'bg-teal-400 shadow-[0_0_10px_#0df]' : 'bg-neutral-800'
                }`} />
              </button>
            ))}
          </div>

          {/* Active Skills Grid */}
          <div className="lg:col-span-8 p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden">
            {/* Glowing card background filter */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${categories[activeCategory].color} blur-3xl opacity-50 z-0 pointer-events-none`} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              
              {/* Category Subhead */}
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                <div className="p-1.5 rounded-lg bg-neutral-800 border border-white/10">
                  {categories[activeCategory].icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {categories[activeCategory].title}
                </h3>
              </div>

              {/* Skills Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories[activeCategory].skills.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-item-card group flex items-center justify-center p-4.5 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.01)]"
                  >
                    <h4 className="text-sm font-bold tracking-tight text-white group-hover:text-teal-400 transition-colors duration-300 text-center">
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
