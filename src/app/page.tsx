import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#FFFDF7] text-[#171717] selection:bg-orange-500/15 selection:text-orange-700">
      {/* Subtle Warm Ambient Layer */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(transparent_50%,_rgba(245,158,11,0.02))] mix-blend-multiply opacity-40" aria-hidden="true" />
      
      {/* Global Navigation Header */}
      <Header />
      
      {/* Portfolio Main Sections */}
      <main className="flex-1 flex flex-col w-full">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}
