'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { ExternalLink, Code2, CheckCircle2, Star, GitFork, Sparkles, Search } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VERIFIED_PROJECTS, ProjectItem } from '@/data/github-projects';

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

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(VERIFIED_PROJECTS);
  const [activeTab, setActiveTab] = useState<'pinned' | 'ai-systems' | 'fullstack' | 'all'>('pinned');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveSynced, setIsLiveSynced] = useState(false);

  // Dynamic GitHub integration: fetch enriched live stats with safe fallback
  useEffect(() => {
    let isMounted = true;
    async function loadGitHubData() {
      try {
        const res = await fetch('/api/github');
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.projects)) {
          setProjectsList(data.projects);
          if (data.source === 'live') {
            setIsLiveSynced(true);
          }
        }
      } catch (err) {
        console.warn('Using verified static fallbacks for GitHub projects:', err);
      }
    }

    loadGitHubData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter logic
  const filteredProjects = useMemo(() => {
    let list = projectsList;

    if (activeTab === 'pinned') {
      list = list.filter((p) => p.isPinned);
    } else if (activeTab === 'ai-systems') {
      list = list.filter((p) =>
        ['wa-crm-intelligence', 'collabflow', 'recon-bot', 'CivicSync', 'citytwin-ai', 'mdify-ai'].includes(p.id)
      );
    } else if (activeTab === 'fullstack') {
      list = list.filter((p) =>
        ['RescueNet', 'CaptivatingJourneys', 'campushub', 'attendance-app', 'Tech-Quotient', 'infra-horti-event-expo'].includes(p.id)
      );
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [projectsList, activeTab, searchQuery]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-reveal-el', 
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

      gsap.fromTo('.proj-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.proj-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Trigger gentle card transition on tab change
  useEffect(() => {
    gsap.fromTo('.proj-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', overwrite: 'auto' }
    );
  }, [activeTab, searchQuery]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen bg-[#FFFDF7] py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background warm festive ambient layers */}
      <div className="absolute left-1/3 bottom-0 w-[450px] h-[450px] bg-orange-100/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl z-10">
        
        {/* Header */}
        <div className="proj-reveal-el mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl font-display text-[#171717] uppercase">
                  Projects
                </h2>
                <div className="h-[2px] w-24 bg-gradient-to-r from-[#F97316]/40 to-transparent" />
              </div>
              <span className="mt-2 text-xs font-bold tracking-[0.25em] text-[#F97316] uppercase block">
                Verified Repositories & Pinned Works
              </span>
            </div>

            {/* GitHub Sync Status Badge */}
            <div className="flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-4 py-1.5 shadow-sm w-fit">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLiveSynced ? 'bg-[#F97316]' : 'bg-[#D4A017]'}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLiveSynced ? 'bg-[#F97316]' : 'bg-[#D4A017]'}`} />
              </span>
              <span className="text-[10px] font-semibold text-[#666666] tracking-wider uppercase">
                {isLiveSynced ? 'Live Synced with GitHub' : 'GitHub Verified Portfolio'}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Filter Bar & Search */}
        <div className="proj-reveal-el mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#EAEAEA] pb-6">
          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('pinned')}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'pinned'
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'bg-white border border-[#EAEAEA] text-[#666666] hover:text-[#171717] hover:border-[#D4A017]/40'
              }`}
            >
              <Star className={`h-3.5 w-3.5 ${activeTab === 'pinned' ? 'text-[#D4A017] fill-[#D4A017]' : 'text-[#666666]'}`} />
              <span>Pinned Projects (6)</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-systems')}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'ai-systems'
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'bg-white border border-[#EAEAEA] text-[#666666] hover:text-[#171717] hover:border-[#D4A017]/40'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#F97316]" />
              <span>AI & Distributed Systems</span>
            </button>

            <button
              onClick={() => setActiveTab('fullstack')}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'fullstack'
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'bg-white border border-[#EAEAEA] text-[#666666] hover:text-[#171717] hover:border-[#D4A017]/40'
              }`}
            >
              <Code2 className="h-3.5 w-3.5 text-[#F59E0B]" />
              <span>Full-Stack Web</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'bg-white border border-[#EAEAEA] text-[#666666] hover:text-[#171717] hover:border-[#D4A017]/40'
              }`}
            >
              All Repositories ({projectsList.length})
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666666]" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#EAEAEA] bg-white pl-9 pr-4 py-2 text-xs text-[#171717] placeholder-[#666666]/70 focus:border-[#F97316] focus:outline-none focus:ring-1 focus:ring-[#F97316] shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Project cards grid */}
        <div className="proj-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="proj-card group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-[#EAEAEA] shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(245,158,11,0.09)] hover:border-[#D4A017]/40 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle warm hover wash */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF7] via-white to-[#FAF7F0] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-5">
                
                {/* Meta Category & Badges */}
                <div className="flex justify-between items-start gap-2 border-b border-[#EAEAEA] pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#F97316]">
                      {proj.category}
                    </span>
                    {proj.badge && (
                      <span className="text-[9px] font-semibold text-[#D4A017] flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        {proj.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {proj.isPinned && (
                      <span
                        className="p-1.5 rounded-lg bg-[#FAF7F0] border border-[#EAEAEA] text-[#D4A017]"
                        title="Pinned on GitHub profile"
                      >
                        <Star className="h-3.5 w-3.5 fill-[#D4A017]" />
                      </span>
                    )}
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white border border-[#EAEAEA] hover:border-[#171717] hover:bg-[#171717] text-[#171717] hover:text-white transition-all duration-300 shadow-sm"
                      data-cursor="magnetic"
                      aria-label={`View ${proj.name} GitHub Repository`}
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#FAF7F0] border border-[#EAEAEA] hover:border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white transition-all duration-300 shadow-sm"
                        data-cursor="magnetic"
                        aria-label={`Open ${proj.name} live demo`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Name & Tagline */}
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#171717] group-hover:text-[#F97316] transition-colors duration-300 flex items-center justify-between">
                    <span>{proj.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF7F0] border border-[#EAEAEA] text-[#666666] font-normal">
                      {proj.language}
                    </span>
                  </h3>
                  <p className="mt-2 text-xs font-medium text-[#666666] leading-relaxed">
                    {proj.tagline}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 text-[#666666] text-xs leading-relaxed">
                  {proj.description.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#F97316] mt-0.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Bottom: Tech Stack & Actions */}
              <div className="relative z-10 pt-5 mt-6 border-t border-[#EAEAEA] flex flex-col gap-3">
                <div className="flex items-center justify-between text-[10px] font-semibold text-[#666666]">
                  <div className="flex items-center gap-1.5 uppercase tracking-wider">
                    <Code2 className="h-3.5 w-3.5 text-[#F97316]" />
                    <span>Tech Stack</span>
                  </div>
                  
                  {/* Live Star & Fork Indicators */}
                  {(proj.stars !== undefined && proj.stars > 0) && (
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="flex items-center gap-0.5 text-[#D4A017]">
                        <Star className="h-3 w-3 fill-[#D4A017]" /> {proj.stars}
                      </span>
                      {proj.forks !== undefined && proj.forks > 0 && (
                        <span className="flex items-center gap-0.5 text-[#666666]">
                          <GitFork className="h-3 w-3" /> {proj.forks}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.slice(0, 5).map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-medium bg-[#FAF7F0] border border-[#EAEAEA] px-2.5 py-1 rounded-md text-[#171717]"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 5 && (
                    <span className="text-[10px] font-medium bg-[#FAF7F0] border border-[#EAEAEA] px-2 py-1 rounded-md text-[#666666]">
                      +{proj.tech.length - 5}
                    </span>
                  )}
                </div>

                {/* Call to action button */}
                <div className="pt-2">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-white border border-[#EAEAEA] hover:border-[#171717] hover:bg-[#FAF7F0] py-2.5 text-xs font-semibold text-[#171717] transition-all duration-300 shadow-sm"
                  >
                    <span>Explore on GitHub</span>
                    <GithubIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state if search yields no results */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center rounded-3xl bg-white border border-[#EAEAEA] p-8 shadow-sm">
            <p className="text-sm font-semibold text-[#171717]">No projects match your query &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('pinned');
              }}
              className="mt-3 text-xs font-bold text-[#F97316] hover:underline cursor-pointer"
            >
              Reset filters to Pinned Projects
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
