import React, { useState, useEffect } from 'react';
import { CommandPalette } from './CommandPalette';
import { Github, ExternalLink } from 'lucide-react';

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
            ? 'bg-[#10141B]/90 backdrop-blur-xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
            : 'bg-[#10141B]/60 backdrop-blur-md border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
        }`}
      >
        {/* Brand Monogram + Title */}
        <a
          href="#bench"
          className="flex items-center gap-2.5 group"
          aria-label="Saivarshith Mitukula"
        >
          <div className="w-8 h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white font-mono font-bold text-xs shadow-inner group-hover:scale-105 group-hover:border-emerald-500/50 transition-all">
            SM
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              saivarshith<span className="text-amber-400">.</span>dev
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Systems Active" />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide text-zinc-400 font-mono">
          <a href="#bench" className="hover:text-emerald-400 transition-colors py-1">
            // Bench
          </a>
          <a href="#flagships" className="hover:text-emerald-400 transition-colors py-1">
            // Flagships
          </a>
          <a href="#repositories" className="hover:text-sky-400 transition-colors py-1">
            // Repos
          </a>
          <a href="#capabilities" className="hover:text-amber-400 transition-colors py-1">
            // Stack
          </a>
          <a href="#experience" className="hover:text-zinc-200 transition-colors py-1">
            // Journey
          </a>
        </nav>

        {/* Right Actions: Command Palette & GitHub */}
        <div className="flex items-center gap-2 sm:gap-3">
          <CommandPalette />

          <a
            href="https://github.com/saivarshithm"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 text-xs font-mono tap-target"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">saivarshithm</span>
            <ExternalLink className="w-3 h-3 text-zinc-400 hidden sm:inline" />
          </a>
        </div>
      </div>
    </header>
  );
};
