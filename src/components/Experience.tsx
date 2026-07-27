'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronRight, ChevronLeft, X, Maximize2 } from 'lucide-react';
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
  images: string[];
}

function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Auto-play effect
  useEffect(() => {
    if (isHovered || isLightboxOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, isHovered, isLightboxOpen]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-neutral-950/85 group/slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Images */}
      <div className="relative w-full h-full bg-neutral-950/90">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-zoom-in ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            onClick={() => setIsLightboxOpen(true)}
          >
            {/* Blurred background image to fill frame */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt=""
              aria-hidden="true"
              className="slider-blur-bg absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
            />
            {/* Main uncropped image centered */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${title} image ${idx + 1}`}
              className="relative w-full h-full object-contain z-10 transition-transform duration-700 hover:scale-102"
            />
          </div>
        ))}
      </div>

      {/* Slide Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 hover:bg-black/75 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 hover:bg-black/75 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Hover Zoom Icon Indicator */}
      <div className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-black/40 border border-white/10 text-neutral-300 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 backdrop-blur-sm pointer-events-none">
        <Maximize2 className="h-3.5 w-3.5" />
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-4 bg-teal-400' : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center backdrop-blur-md transition-all duration-300 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-md cursor-pointer"
            aria-label="Close fullscreen view"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Fullscreen Image Container */}
          <div 
            className="relative max-w-[90%] max-h-[85vh] aspect-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[currentIndex]}
              alt={`${title} image fullscreen`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg border border-white/5 shadow-2xl"
            />
          </div>

          {/* Lightbox Index / Title Overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-neutral-400 font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
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
      tags: ["Leadership", "Event Management", "Technical Mentoring", "Public Relations"],
      images: [
        "/images/experience/acm/acm-event-1.jpg",
        "/images/experience/acm/acm-event-2.jpg",
        "/images/experience/acm/acm-banner.gif",
        "/images/experience/acm/acm-team.jpg"
      ]
    },
    {
      role: "Member",
      organization: "Chitkara Enterprise Lab",
      location: "Chitkara University, Solan",
      duration: "Jan 2026 – Present",
      points: [
        "Engage in startup-focused learning, innovation programmes, and entrepreneurial development initiatives, transforming ideas into practical solutions with industry mentorship."
      ],
      tags: ["Entrepreneurship", "Innovation", "Business Design", "Startup Ecosystems"],
      images: [
        "/images/experience/enterprise/enterprise-lab-1.jpg",
        "/images/experience/enterprise/enterprise-banner.gif",
        "/images/experience/enterprise/enterprise-lab-2.jpg",
        "/images/experience/enterprise/enterprise-presentation.jpg",
        "/images/experience/enterprise/enterprise-team.jpg"
      ]
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

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                  <div className="md:col-span-7 flex flex-col justify-between h-full">
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
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mt-auto">
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

                  <div className="md:col-span-5 flex flex-col justify-center">
                    <ImageSlider images={exp.images} title={exp.organization} />
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
