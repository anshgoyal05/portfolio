'use client';

import { Printer, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      
      {/* Floating control bar - hidden when printing */}
      <div className="mx-auto max-w-4xl mb-6 flex justify-between items-center bg-neutral-800/80 border border-white/5 glass-panel px-6 py-4 rounded-2xl print:hidden">
        <Link 
          href="/"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
        <div className="flex items-center gap-3">
          <a
            href="/Ansh_Goyal_Resume.pdf"
            download="Ansh_Goyal_Resume.pdf"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-teal-400 hover:bg-teal-500 text-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(45,212,191,0.2)]"
          >
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* A4 Resume Sheet Container */}
      <div className="mx-auto max-w-4xl bg-white text-black p-8 sm:p-12 shadow-2xl rounded-2xl print:shadow-none print:rounded-none print:p-0 font-serif leading-relaxed text-sm">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight uppercase text-black font-sans">
            ANSH GOYAL
          </h1>
          <p className="text-xs sm:text-sm text-neutral-800 font-sans font-medium">
            B.E. Computer Science & Engineering · Chitkara University
          </p>
          <p className="text-xs text-neutral-600 font-mono">
            goyalansh.in@gmail.com | <a href="https://linkedin.com/in/anshgoyal05" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">linkedin.com/in/anshgoyal05</a> | <a href="https://github.com/anshgoyal05" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">github.com/anshgoyal05</a>
          </p>
        </div>

        {/* Section: About */}
        <div className="mt-8">
          <h2 className="text-sm font-bold tracking-widest text-black uppercase font-sans border-b border-black pb-1 mb-3">
            ABOUT
          </h2>
          <p className="text-neutral-800 text-justify text-xs leading-relaxed">
            Computer Science Engineering student specializing in Full-Stack Development (MERN Stack), AI-powered applications, and scalable software systems. Built end-to-end projects using the MERN stack (MongoDB, Express.js, React, Node.js), Next.js, FastAPI, PostgreSQL, Docker, TensorFlow, and OpenCV, with one year of hands-on OOP programming experience and a strong foundation in data structures and algorithms.
          </p>
        </div>

        {/* Section: Experience */}
        <div className="mt-6">
          <h2 className="text-sm font-bold tracking-widest text-black uppercase font-sans border-b border-black pb-1 mb-4">
            EXPERIENCE
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-baseline font-sans text-xs">
                <span className="font-bold text-black">Member - Chitkara Enterprise Lab</span>
                <span className="text-neutral-600 font-medium">Jan 2026 – Present</span>
              </div>
              <p className="text-[11px] font-sans text-neutral-700 italic">Chitkara University · Solan</p>
              <ul className="mt-1.5 text-xs text-neutral-800 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-800 font-bold select-none">→</span>
                  <span>Engaging in startup-focused learning, innovation programmes, and entrepreneurial development initiatives, transforming ideas into practical solutions with industry mentorship.</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline font-sans text-xs">
                <span className="font-bold text-black">Vice Chair - ACM Student Chapter</span>
                <span className="text-neutral-600 font-medium">Jul 2026 – Present</span>
              </div>
              <p className="text-[11px] font-sans text-neutral-700 italic">Chitkara University ACM Student Chapter</p>
              <ul className="mt-1.5 text-xs text-neutral-800 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-800 font-bold select-none">→</span>
                  <span>Serve on the executive leadership team, setting chapter strategy and overseeing technical programming across 12+ events attended by 500+ students.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-800 font-bold select-none">→</span>
                  <span>Coordinate student volunteers and technical teams to deliver hackathons, workshops, and coding competitions.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section: Projects */}
        <div className="mt-6">
          <h2 className="text-sm font-bold tracking-widest text-black uppercase font-sans border-b border-black pb-1 mb-4">
            PROJECTS
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-baseline font-sans text-xs">
                <span className="font-bold text-black">CivicSync - AI-Driven Urban Grievance Prioritization & Accountability</span>
                <a href="https://github.com/anshgoyal05/CivicSync.git" target="_blank" rel="noopener noreferrer" className="text-neutral-600 underline font-mono text-[10px]">github.com/anshgoyal05/CivicSync</a>
              </div>
              <p className="text-[10px] font-sans text-neutral-600 font-semibold uppercase tracking-wider">Next.js · FastAPI · PostgreSQL · Docker · Python · Machine Learning · TypeScript</p>
              <ul className="mt-1 text-xs text-neutral-800 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-800 font-bold select-none">→</span>
                  <span>Led a hackathon team building a full-stack AI grievance platform (Next.js, FastAPI, PostgreSQL, Docker) that automates complaint prioritization and department routing using machine learning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-800 font-bold select-none">→</span>
                  <span>Implemented analytics dashboards, workflow tracking, and role-based access controls to improve transparency and accountability.</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline font-sans text-xs">
                <span className="font-bold text-black">RescueNet - Missing Persons Identification Platform</span>
                <a href="https://github.com/anshgoyal05/RescueNet" target="_blank" rel="noopener noreferrer" className="text-neutral-600 underline font-mono text-[10px]">github.com/anshgoyal05/RescueNet</a>
              </div>
              <p className="text-[10px] font-sans text-neutral-600 font-semibold uppercase tracking-wider">MERN Stack (MongoDB, Express.js, React, Node.js) · OpenCV · TensorFlow · JavaScript · TypeScript</p>
              <ul className="mt-1 text-xs text-neutral-800 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-800 font-bold select-none">→</span>
                  <span>Built an AI-powered missing-person identification platform on the MERN stack with OpenCV and TensorFlow for facial similarity matching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-800 font-bold select-none">→</span>
                  <span>Designed a client-server architecture (Express.js/Node.js backend, React frontend, MongoDB storage) supporting image uploads, feature extraction, and real-time matching.</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline font-sans text-xs">
                <span className="font-bold text-black">Attendance-App - Attendance Tracking & Analytics Platform</span>
                <a href="https://github.com/anshgoyal05/attendance-app" target="_blank" rel="noopener noreferrer" className="text-neutral-600 underline font-mono text-[10px]">github.com/anshgoyal05/attendance-app</a>
              </div>
              <p className="text-[10px] font-sans text-neutral-600 font-semibold uppercase tracking-wider">Next.js · Prisma · PostgreSQL</p>
              <ul className="mt-1 text-xs text-neutral-800 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-800 font-bold select-none">→</span>
                  <span>Built a full-stack attendance tracking platform with Next.js, Prisma, and PostgreSQL, featuring automated attendance logging and an analytics dashboard.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-800 font-bold select-none">→</span>
                  <span>Added PDF/Excel export functionality for streamlined attendance reporting.</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline font-sans text-xs">
                <span className="font-bold text-black">Infra Horti Event Expo</span>
                <a href="https://github.com/anshgoyal05/infra-horti-event-expo" target="_blank" rel="noopener noreferrer" className="text-neutral-600 underline font-mono text-[10px]">github.com/anshgoyal05/infra-horti-event-expo</a>
              </div>
              <p className="text-[10px] font-sans text-neutral-600 font-semibold uppercase tracking-wider">React 19 · Vite 8 · React Router 7 · Node.js · Express.js · SQLite3 · JWT · CSS3</p>
              <ul className="mt-1 text-xs text-neutral-800 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-800 font-bold select-none">→</span>
                  <span>Built a full-stack web portal showcasing university events, infrastructure, and a nursery database using a React SPA frontend and a Node.js/Express API, secured with JWT authentication.</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline font-sans text-xs">
                <span className="font-bold text-black">CaptivatingJourneys - Multi-Destination Travel Website</span>
                <a href="https://github.com/anshgoyal05/CaptivatingJourneys" target="_blank" rel="noopener noreferrer" className="text-neutral-600 underline font-mono text-[10px]">github.com/anshgoyal05/CaptivatingJourneys</a>
              </div>
              <p className="text-[10px] font-sans text-neutral-600 font-semibold uppercase tracking-wider">HTML5 · CSS3 · Python</p>
              <ul className="mt-1 text-xs text-neutral-800 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-800 font-bold select-none">→</span>
                  <span>Built a 40+ page responsive travel portal covering Rajasthan, Kashmir, Chandigarh, and Himachal, using semantic HTML and modular, reusable CSS components.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section: Education */}
        <div className="mt-6">
          <h2 className="text-sm font-bold tracking-widest text-black uppercase font-sans border-b border-black pb-1 mb-4">
            EDUCATION
          </h2>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-baseline font-sans text-xs font-bold text-black">
                <span>Bachelor of Engineering - Computer Science & Engineering (BECSE)</span>
                <span className="text-neutral-600 font-medium">Aug 2024 – Jun 2028</span>
              </div>
              <div className="flex justify-between items-baseline font-sans text-[11px] text-neutral-700">
                <span>Chitkara University, Himachal Pradesh</span>
                <span className="font-bold text-black">CGPA – 9.16</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline font-sans text-xs font-bold text-black">
                <span>Senior Secondary - Non-Medical (PCM)</span>
                <span className="text-neutral-600 font-medium">Jul 2022 – May 2024</span>
              </div>
              <div className="flex justify-between items-baseline font-sans text-[11px] text-neutral-700">
                <span>Sunrise Public School Banaundi, Ambala</span>
                <span className="font-semibold">Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Certifications & Achievements */}
        <div className="mt-6">
          <h2 className="text-sm font-bold tracking-widest text-black uppercase font-sans border-b border-black pb-1 mb-3">
            CERTIFICATIONS & ACHIEVEMENTS
          </h2>
          <p className="text-xs text-neutral-800 leading-relaxed text-justify">
            Develop Natural Language Solutions in Azure (Microsoft, Jun 2026) · Data Structures & Algorithms in Java & Python · Elements of AI (MinnaLearn) · Python Programming & Design Thinking (Infosys Springboard) · Student Symposium 2025 · ChitkaraVerse 2026 · HackIndia 2026
          </p>
        </div>

        {/* Section: Skills */}
        <div className="mt-6">
          <h2 className="text-sm font-bold tracking-widest text-black uppercase font-sans border-b border-black pb-1 mb-3">
            SKILLS
          </h2>
          
          <div className="space-y-1.5 text-xs text-neutral-800">
            <p><strong>Languages:</strong> Python, Java, C, C++, JavaScript, TypeScript, HTML5, CSS3</p>
            <p><strong>Full-Stack / Frameworks:</strong> MERN Stack (MongoDB, Express.js, React, Node.js), Next.js, FastAPI, OpenCV, TensorFlow</p>
            <p><strong>Tools & Databases:</strong> Git, GitHub, Docker, Linux, VS Code, npm, MongoDB, PostgreSQL</p>
            <p><strong>Concepts:</strong> OOP, Data Structures & Algorithms, DBMS, Computer Networks, Machine Learning, NLP, REST APIs</p>
            <p><strong>Cloud:</strong> Microsoft Azure</p>
            <p><strong>Leadership & Languages:</strong> Team Leadership, Event Management, Mentoring · English (Professional), Hindi (Native)</p>
          </div>
        </div>

      </div>
      
      {/* CSS print-specific overrides */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          /* Hide floating bar and other scroll decorations during native print */
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
