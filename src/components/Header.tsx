'use client';

import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { useResumeModal } from './ResumeModal';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openResumeModal } = useResumeModal();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? 'glass-panel bg-[#FFFDF7]/90 py-3.5 border-b border-[#EAEAEA] shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, '#')}
          className="group text-xl font-black tracking-tight text-[#171717] font-display"
          data-cursor="magnetic"
        >
          ANSH<span className="text-[#F97316] group-hover:text-[#D4A017] transition-colors duration-300">.</span>G
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative text-xs font-semibold tracking-wider text-[#666666] transition-colors duration-300 hover:text-[#171717]"
              data-cursor="pointer"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={openResumeModal}
            className="flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-5 py-2 text-[11px] font-semibold text-[#171717] transition-all duration-300 hover:border-[#D4A017] hover:text-[#F97316] hover:shadow-[0_2px_12px_rgba(212,160,23,0.12)] cursor-pointer"
            data-cursor="magnetic"
          >
            Resume <FileText className="h-3.5 w-3.5 text-[#F97316]" />
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#171717] hover:text-[#F97316] transition-colors duration-300 md:hidden p-1 rounded-lg"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="fixed inset-0 top-[57px] z-[999] flex flex-col items-center justify-center bg-[#FFFDF7]/98 backdrop-blur-2xl border-b border-[#EAEAEA] md:hidden">
          <nav className="flex flex-col items-center gap-8 text-center animate-fade-in py-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-2xl font-bold tracking-tight text-[#171717] hover:text-[#F97316] transition-colors font-display"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                openResumeModal();
              }}
              className="mt-4 flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#171717] shadow-sm hover:border-[#D4A017] hover:text-[#F97316] transition-all cursor-pointer"
            >
              Preview Resume <FileText className="h-4 w-4 text-[#F97316]" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

