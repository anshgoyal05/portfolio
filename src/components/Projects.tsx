'use client';

import { useEffect, useRef } from 'react';
import { ExternalLink, Code2, Layers, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const gsapSource = gsap;

interface ProjectItem {
  name: string;
  category: string;
  description: string[];
  tech: string[];
  github: string;
  demo?: string;
  gradient: string;
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: ProjectItem[] = [
    {
      name: "CivicSync",
      category: "AI-Driven Grievance & Accountability Platform",
      description: [
        "Led a hackathon team building a full-stack AI grievance platform that automates complaint prioritization and department routing using ML models.",
        "Implemented analytics dashboards, workflow tracking, and role-based access controls to improve civic transparency."
      ],
      tech: ["Next.js", "FastAPI", "PostgreSQL", "Docker", "Python", "Machine Learning", "TypeScript"],
      github: "https://github.com/anshgoyal05/CivicSync",
      gradient: "from-teal-500/10 via-cyan-500/5 to-transparent"
    },
    {
      name: "RescueNet",
      category: "AI-Powered Missing Persons Identification",
      description: [
        "Built a missing-person identification platform on the MERN stack with OpenCV and TensorFlow for facial similarity matching.",
        "Designed client-server architecture supporting high-performance image uploads, face feature extraction, and real-time matching."
      ],
      tech: ["MongoDB", "Express.js", "React", "Node.js", "OpenCV", "TensorFlow", "JavaScript", "TypeScript"],
      github: "https://github.com/anshgoyal05/RescueNet",
      gradient: "from-purple-500/10 via-indigo-500/5 to-transparent"
    },
    {
      name: "Attendance-App",
      category: "Attendance Tracking & Analytics Platform",
      description: [
        "Built a full-stack attendance tracking platform featuring automated attendance logging and an analytics dashboard.",
        "Added PDF/Excel export functionality for streamlined attendance reporting."
      ],
      tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "TypeScript"],
      github: "https://github.com/anshgoyal05/attendance-app",
      gradient: "from-blue-500/10 via-sky-500/5 to-transparent"
    },
    {
      name: "Infra Horti Event Expo",
      category: "Full-Stack Web Portal & Admin Dashboard",
      description: [
        "Built a full-stack web portal showcasing university events, infrastructure, and a nursery database using React SPA and Express API.",
        "Secured with JWT authentication and featuring a comprehensive admin control dashboard."
      ],
      tech: ["React 19", "Vite 8", "React Router 7", "Node.js", "Express.js", "SQLite3", "JWT"],
      github: "https://github.com/anshgoyal05/infra-horti-event-expo",
      gradient: "from-purple-500/10 via-pink-500/5 to-transparent"
    },
    {
      name: "CaptivatingJourneys",
      category: "Multi-Destination Travel Website",
      description: [
        "Built a 40+ page responsive travel portal covering Rajasthan, Kashmir, Chandigarh, and Himachal.",
        "Developed using semantic HTML, structured routing concepts, and modular, reusable CSS components."
      ],
      tech: ["HTML5", "CSS3", "Python", "Responsive Design"],
      github: "https://github.com/anshgoyal05/CaptivatingJourneys",
      gradient: "from-teal-500/10 via-teal-500/5 to-transparent"
    }
  ];

  useEffect(() => {
    const ctx = gsapSource.context(() => {
      // Reveal header elements
      gsapSource.fromTo('.proj-reveal-el', 
        { y: 35, opacity: 0 },
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

      // Card reveal animations
      gsapSource.fromTo('.proj-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.proj-grid',
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
      id="projects"
      ref={containerRef}
      className="relative min-h-screen bg-black py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background visual layers */}
      <div className="absolute left-1/3 bottom-0 w-[450px] h-[450px] bg-purple-950/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl z-10">
        
        {/* Header */}
        <div className="proj-reveal-el mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl font-display text-white uppercase">
              Projects
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-teal-400/30 to-transparent" />
          </div>
          <span className="mt-2 text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase block">
            Selected Works & Open-Source Contributions
          </span>
        </div>

        {/* Project cards grid */}
        <div className="proj-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className={`proj-card relative group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-neutral-900/30 border border-white/5 backdrop-blur-xl overflow-hidden hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.01)] transition-all duration-500`}
            >
              {/* Dynamic decorative backdrop gradients */}
              <div className={`absolute inset-0 bg-gradient-to-b ${proj.gradient} z-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60 pointer-events-none`} />
              
              <div className="relative z-10 space-y-6">
                
                {/* Meta Category & Actions */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-neutral-900 border border-white/5 hover:border-white/20 text-neutral-400 hover:text-white transition-all duration-300"
                      data-cursor="magnetic"
                      aria-label={`View ${proj.name} GitHub Repository`}
                    >
                      <GithubIcon className="h-4.5 w-4.5" />
                    </a>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-white group-hover:text-teal-400 transition-colors duration-300">
                    {proj.name}
                  </h3>
                </div>

                {/* Bullets */}
                <ul className="space-y-3 text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {proj.description.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal-500/80 mt-0.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Bottom Tech pills */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-neutral-500 tracking-wider">
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.slice(0, 5).map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[9px] font-mono bg-neutral-950 border border-white/5 px-2.5 py-1 rounded text-neutral-300 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 5 && (
                    <span className="text-[9px] font-mono bg-neutral-950 border border-white/5 px-2.5 py-1 rounded text-neutral-500">
                      +{proj.tech.length - 5} MORE
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
