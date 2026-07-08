'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowDownToLine } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
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
          ? 'bg-black/60 py-3.5 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, '#')}
          className="group text-xl font-black tracking-tighter text-white font-display"
          data-cursor="magnetic"
        >
          ANSH<span className="text-teal-400 group-hover:text-purple-400 transition-colors duration-300">.</span>G
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative text-xs font-semibold uppercase tracking-widest text-neutral-400 transition-colors duration-300 hover:text-white"
              data-cursor="pointer"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
            data-cursor="magnetic"
          >
            Resume <ArrowDownToLine className="h-3 w-3" />
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-teal-400 transition-colors duration-300 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="fixed inset-0 top-[57px] z-[999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl md:hidden">
          <nav className="flex flex-col items-center gap-10 text-center animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-3xl font-black tracking-tight text-neutral-300 hover:text-white transition-colors uppercase font-display"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
            >
              View Resume <ArrowDownToLine className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
