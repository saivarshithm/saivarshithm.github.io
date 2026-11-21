import React, { useState, useEffect } from 'react';
import { CommandPalette } from './CommandPalette';
import { Github, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 pt-3 pointer-events-none"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)'
      }}
    >
      <div
        className={`max-w-5xl mx-auto rounded-full transition-all duration-300 pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-2.5 ${
          isScrolled
            ? 'bg-[#FBF8F2]/90 backdrop-blur-xl border border-[#EBDFCD] shadow-[0_12px_36px_-6px_rgba(74,48,26,0.14)]'
            : 'bg-[#FBF8F2]/60 backdrop-blur-md border border-[#EBDFCD]/60 shadow-[0_4px_16px_-2px_rgba(74,48,26,0.06)]'
        }`}
      >
        {/* Brand: saivarshith. */}
        <a
          href="#bench"
          className="flex items-center gap-2.5 group"
          aria-label="Saivarshith Mitukula"
        >
          <div className="w-8 h-8 rounded-full bg-[#171615] flex items-center justify-center text-white font-mono font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
            SM
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base sm:text-lg tracking-tight text-[#2E241E] group-hover:text-[#8C5E14] transition-colors">
              saivarshith<span className="text-[#8C5E14]">.</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide text-[#5C3826]">
          <a href="#bench" className="hover:text-[#2E241E] transition-colors py-1">
            Bench
          </a>
          <a href="#flagships" className="hover:text-[#2E241E] transition-colors py-1">
            Projects
          </a>
          <a href="#repositories" className="hover:text-[#2E241E] transition-colors py-1">
            Repos
          </a>
          <a href="#capabilities" className="hover:text-[#2E241E] transition-colors py-1">
            Stack
          </a>
          <a href="#experience" className="hover:text-[#2E241E] transition-colors py-1">
            Experience
          </a>
          <a href="#connect" className="hover:text-[#2E241E] transition-colors py-1">
            Connect
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <CommandPalette />

          <a
            href="https://github.com/saivarshithm"
            target="_blank"
            rel="noopener noreferrer"
            className="black-pill-button px-3.5 py-1.5 text-xs font-mono flex items-center gap-1.5 tap-target"
            aria-label="Star on GitHub"
          >
            <Github className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
