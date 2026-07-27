'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Printer, ArrowLeft, Download, X } from 'lucide-react';

interface ResumeModalContextType {
  isOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextType>({
  isOpen: false,
  openResumeModal: () => {},
  closeResumeModal: () => {},
});

export const useResumeModal = () => useContext(ResumeModalContext);

export function ResumeModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResumeModal = () => setIsOpen(true);
  const closeResumeModal = () => setIsOpen(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeResumeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.src = '/Ansh_Goyal_Resume.pdf';

      iframe.onload = () => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch {
          window.open('/Ansh_Goyal_Resume.pdf', '_blank');
        }
      };

      document.body.appendChild(iframe);
    }
  };

  return (
    <ResumeModalContext.Provider value={{ isOpen, openResumeModal, closeResumeModal }}>
      {children}

      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[10000] bg-neutral-950/95 overflow-y-auto overscroll-contain py-6 px-4 sm:px-6 transition-all duration-300 backdrop-blur-xl print:bg-transparent print:p-0 print:m-0 print:static print:z-auto print:overflow-visible"
          role="dialog"
          aria-modal="true"
          aria-label="Resume Preview Modal"
        >
          {/* Main scrollable container wrapper */}
          <div className="mx-auto max-w-4xl min-h-full flex flex-col justify-start pb-12 print:p-0 print:m-0 print:w-full print:max-w-full" data-lenis-prevent="true">
            
            {/* Sticky Floating Control Bar - Matches Screenshot (Hidden on print) */}
            <div className="sticky top-4 z-50 mb-4 flex flex-wrap justify-between items-center gap-4 bg-neutral-900/90 border border-white/10 glass-panel px-6 py-3 rounded-2xl print:hidden shadow-2xl backdrop-blur-xl">
              <button 
                onClick={closeResumeModal}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors cursor-pointer"
                data-cursor="pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Portfolio
              </button>

              <div className="flex items-center gap-3">
                {/* Download PDF button - Downloads the actual updated PDF file directly */}
                <a
                  href="/Ansh_Goyal_Resume.pdf"
                  download="Ansh_Goyal_Resume.pdf"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  data-cursor="magnetic"
                >
                  <Download className="h-4 w-4 text-teal-400" /> Download PDF
                </a>

                {/* Print / Save as PDF button - Prints the actual PDF document directly */}
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-black px-5 py-2 text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(45,212,191,0.3)] cursor-pointer"
                  data-cursor="magnetic"
                >
                  <Printer className="h-4 w-4" /> Print / Save as PDF
                </button>

                <button
                  onClick={closeResumeModal}
                  className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Preview"
                  data-cursor="pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* A4 Resume Sheet Container */}
            <div className="resume-print-sheet w-full bg-white text-black p-5 sm:p-7 md:p-8 shadow-2xl rounded-2xl print:shadow-none print:rounded-none print:p-0 font-sans leading-tight text-xs selection:bg-teal-200">
              
              {/* Header */}
              <div className="text-center space-y-0.5 border-b border-black pb-1.5">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-black font-sans">
                  ANSH GOYAL
                </h1>
                <p className="text-[11px] sm:text-xs text-neutral-800 font-sans font-semibold">
                  B.E. Computer Science & Engineering · Chitkara University
                </p>
                <p className="text-[10px] sm:text-[11px] text-neutral-700 font-mono flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5">
                  <a href="mailto:goyalansh.in@gmail.com" className="hover:underline">goyalansh.in@gmail.com</a>
                  <span>|</span>
                  <a href="https://linkedin.com/in/anshgoyal05" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">linkedin.com/in/anshgoyal05</a>
                  <span>|</span>
                  <a href="https://github.com/anshgoyal05" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">github.com/anshgoyal05</a>
                  <span>|</span>
                  <a href="https://anshgoyal.live" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">anshgoyal.live</a>
                  <span>|</span>
                  <span>+91 7404508326</span>
                </p>
              </div>

              {/* Section: About */}
              <div className="mt-2.5">
                <h2 className="text-[11px] sm:text-xs font-extrabold tracking-widest text-black uppercase font-sans border-b border-black pb-0.5 mb-1">
                  ABOUT
                </h2>
                <p className="text-neutral-800 text-justify text-[10.5px] leading-snug">
                  Computer Science Engineering student specializing in Full-Stack Development (MERN Stack), AI-powered applications, and scalable software systems. Built end-to-end projects using the MERN stack (MongoDB, Express.js, React, Node.js), Next.js, FastAPI, PostgreSQL, Docker, TensorFlow, and OpenCV, with one year of hands-on OOP programming experience and a strong foundation in data structures and algorithms.
                </p>
              </div>

              {/* Section: Experience */}
              <div className="mt-2.5">
                <h2 className="text-[11px] sm:text-xs font-extrabold tracking-widest text-black uppercase font-sans border-b border-black pb-0.5 mb-1">
                  EXPERIENCE
                </h2>
                
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs">
                      <span className="font-bold text-black">Member - Chitkara Enterprise Lab</span>
                      <span className="text-neutral-600 font-medium text-[10px]">Jan 2026 – Present</span>
                    </div>
                    <p className="text-[9.5px] font-sans text-neutral-700 italic">Chitkara University · Solan</p>
                    <ul className="mt-0.5 text-[10.5px] text-neutral-800 space-y-0.5 leading-snug">
                      <li className="flex items-start gap-1">
                        <span className="text-neutral-800 font-bold select-none">→</span>
                        <span>Engaging in startup-focused learning, innovation programmes, and entrepreneurial development initiatives, transforming ideas into practical solutions with industry mentorship.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs">
                      <span className="font-bold text-black">Vice Chair - ACM Student Chapter</span>
                      <span className="text-neutral-600 font-medium text-[10px]">Jul 2026 – Present</span>
                    </div>
                    <p className="text-[9.5px] font-sans text-neutral-700 italic">Chitkara University ACM Student Chapter</p>
                    <ul className="mt-0.5 text-[10.5px] text-neutral-800 space-y-0.5 leading-snug">
                      <li className="flex items-start gap-1">
                        <span className="text-neutral-800 font-bold select-none">→</span>
                        <span>Serve on the executive leadership team, setting chapter strategy and overseeing technical programming across 12+ events attended by 500+ students.</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-neutral-800 font-bold select-none">→</span>
                        <span>Coordinate student volunteers and technical teams to deliver hackathons, workshops, and coding competitions.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section: Projects */}
              <div className="mt-2.5">
                <h2 className="text-[11px] sm:text-xs font-extrabold tracking-widest text-black uppercase font-sans border-b border-black pb-0.5 mb-1">
                  PROJECTS
                </h2>
                
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs">
                      <span className="font-bold text-black">CivicSync - AI-Driven Urban Grievance Prioritization & Accountability</span>
                      <a href="https://github.com/anshgoyal05/CivicSync" target="_blank" rel="noopener noreferrer" className="text-neutral-600 underline font-mono text-[9.5px] hover:text-black">github.com/anshgoyal05/CivicSync</a>
                    </div>
                    <p className="text-[9px] font-sans text-neutral-600 font-semibold uppercase tracking-wider">Next.js · FastAPI · PostgreSQL · Docker · Python · Machine Learning · TypeScript</p>
                    <ul className="mt-0.5 text-[10.5px] text-neutral-800 space-y-0.5 leading-snug">
                      <li className="flex items-start gap-1">
                        <span className="text-neutral-800 font-bold select-none">→</span>
                        <span>Led a hackathon team building a full-stack AI grievance platform (Next.js, FastAPI, PostgreSQL, Docker) that automates complaint prioritization and department routing using machine learning.</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-neutral-800 font-bold select-none">→</span>
                        <span>Implemented analytics dashboards, workflow tracking, and role-based access controls to improve transparency and accountability.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs">
                      <span className="font-bold text-black">RescueNet - Missing Persons Identification Platform</span>
                      <a href="https://github.com/anshgoyal05/RescueNet" target="_blank" rel="noopener noreferrer" className="text-neutral-600 underline font-mono text-[9.5px] hover:text-black">github.com/anshgoyal05/RescueNet</a>
                    </div>
                    <p className="text-[9px] font-sans text-neutral-600 font-semibold uppercase tracking-wider">MERN Stack (MongoDB, Express.js, React, Node.js) · OpenCV · TensorFlow · JavaScript · TypeScript</p>
                    <ul className="mt-0.5 text-[10.5px] text-neutral-800 space-y-0.5 leading-snug">
                      <li className="flex items-start gap-1">
                        <span className="text-neutral-800 font-bold select-none">→</span>
                        <span>Built an AI-powered missing-person identification platform on the MERN stack with OpenCV and TensorFlow for facial similarity matching.</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-neutral-800 font-bold select-none">→</span>
                        <span>Designed a client-server architecture (Express.js/Node.js backend, React frontend, MongoDB storage) supporting image uploads, feature extraction, and real-time matching.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs">
                      <span className="font-bold text-black">Attendance-App - Attendance Tracking & Analytics Platform</span>
                      <a href="https://github.com/anshgoyal05/attendance-app" target="_blank" rel="noopener noreferrer" className="text-neutral-600 underline font-mono text-[9.5px] hover:text-black">github.com/anshgoyal05/attendance-app</a>
                    </div>
                    <p className="text-[9px] font-sans text-neutral-600 font-semibold uppercase tracking-wider">Next.js · Prisma · PostgreSQL</p>
                    <ul className="mt-0.5 text-[10.5px] text-neutral-800 space-y-0.5 leading-snug">
                      <li className="flex items-start gap-1">
                        <span className="text-neutral-800 font-bold select-none">→</span>
                        <span>Built a full-stack attendance tracking platform with Next.js, Prisma, and PostgreSQL, featuring automated attendance logging and an analytics dashboard.</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-neutral-800 font-bold select-none">→</span>
                        <span>Added PDF/Excel export functionality for streamlined attendance reporting.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs">
                      <span className="font-bold text-black">Infra Horti Event Expo</span>
                      <a href="https://github.com/anshgoyal05/infra-horti-event-expo" target="_blank" rel="noopener noreferrer" className="text-neutral-600 underline font-mono text-[9.5px] hover:text-black">github.com/anshgoyal05/infra-horti-event-expo</a>
                    </div>
                    <p className="text-[9px] font-sans text-neutral-600 font-semibold uppercase tracking-wider">React 19 · Vite 8 · React Router 7 · Node.js · Express.js · SQLite3 · JWT (JSON Web Tokens) · CSS3</p>
                    <ul className="mt-0.5 text-[10.5px] text-neutral-800 space-y-0.5 leading-snug">
                      <li className="flex items-start gap-1">
                        <span className="text-neutral-800 font-bold select-none">→</span>
                        <span>Built a full-stack web portal showcasing university events, infrastructure, and a nursery database using a React SPA frontend and a Node.js/Express API, secured with JWT authentication and featuring a comprehensive admin dashboard.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs">
                      <span className="font-bold text-black">CaptivatingJourneys - Multi-Destination Travel Website</span>
                      <a href="https://github.com/anshgoyal05/CaptivatingJourneys" target="_blank" rel="noopener noreferrer" className="text-neutral-600 underline font-mono text-[9.5px] hover:text-black">github.com/anshgoyal05/CaptivatingJourneys</a>
                    </div>
                    <p className="text-[9px] font-sans text-neutral-600 font-semibold uppercase tracking-wider">HTML5 · CSS3 · Python</p>
                    <ul className="mt-0.5 text-[10.5px] text-neutral-800 space-y-0.5 leading-snug">
                      <li className="flex items-start gap-1">
                        <span className="text-neutral-800 font-bold select-none">→</span>
                        <span>Built a 40+ page responsive travel portal covering Rajasthan, Kashmir, Chandigarh, and Himachal, using semantic HTML and modular, reusable CSS components.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section: Education */}
              <div className="mt-2.5">
                <h2 className="text-[11px] sm:text-xs font-extrabold tracking-widest text-black uppercase font-sans border-b border-black pb-0.5 mb-1">
                  EDUCATION
                </h2>
                
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs font-bold text-black">
                      <span>Bachelor of Engineering - Computer Science & Engineering (BECSE)</span>
                      <span className="text-neutral-600 font-medium text-[10px]">Aug 2024 – Jun 2028</span>
                    </div>
                    <div className="flex justify-between items-baseline font-sans text-[10.5px] text-neutral-700">
                      <span>Chitkara University, Himachal Pradesh</span>
                      <span className="font-bold text-black">(CGPA – 9.16)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs font-bold text-black">
                      <span>Senior Secondary - Non-Medical (PCM)</span>
                      <span className="text-neutral-600 font-medium text-[10px]">Jul 2022 – May 2024</span>
                    </div>
                    <div className="flex justify-between items-baseline font-sans text-[10.5px] text-neutral-700">
                      <span>Sunrise Public School Banaundi, Ambala</span>
                      <span className="font-semibold">Completed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Certifications & Achievements */}
              <div className="mt-2.5">
                <h2 className="text-[11px] sm:text-xs font-extrabold tracking-widest text-black uppercase font-sans border-b border-black pb-0.5 mb-1">
                  CERTIFICATIONS & ACHIEVEMENTS
                </h2>
                <p className="text-[10.5px] text-neutral-800 leading-snug text-justify">
                  Develop Natural Language Solutions in Azure (Microsoft, Jun 2026) · Data Structures & Algorithms in Java & Python · Elements of AI (MinnaLearn) · Python Programming & Design Thinking (Infosys Springboard) · Student Symposium 2025 · ChitkaraVerse 2026 · HackIndia 2026
                </p>
              </div>

              {/* Section: Skills */}
              <div className="mt-2.5">
                <h2 className="text-[11px] sm:text-xs font-extrabold tracking-widest text-black uppercase font-sans border-b border-black pb-0.5 mb-1">
                  SKILLS
                </h2>
                
                <div className="space-y-0.5 text-[10.5px] text-neutral-800">
                  <p><strong>Languages:</strong> Python, Java, C, C++, JavaScript, TypeScript, HTML5, CSS3</p>
                  <p><strong>Full-Stack / Frameworks:</strong> MERN Stack (MongoDB, Express.js, React, Node.js), Next.js, FastAPI, OpenCV, TensorFlow</p>
                  <p><strong>Tools & Databases:</strong> Git, GitHub, Docker, Linux, VS Code, npm, MongoDB, PostgreSQL</p>
                  <p><strong>Concepts:</strong> OOP, Data Structures & Algorithms, DBMS, Computer Networks, Machine Learning, NLP, REST APIs</p>
                  <p><strong>Cloud:</strong> Microsoft Azure</p>
                  <p><strong>Leadership & Languages:</strong> Team Leadership, Event Management, Mentoring · English (Professional), Hindi (Native)</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </ResumeModalContext.Provider>
  );
}
