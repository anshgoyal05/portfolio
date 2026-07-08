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
    <div className="relative flex min-h-screen flex-col bg-black text-white selection:bg-teal-500/10 selection:text-teal-400">
      {/* Dynamic Background Noise Layer */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(transparent_50%,_rgba(0,0,0,0.1))] mix-blend-overlay opacity-30" />
      
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
