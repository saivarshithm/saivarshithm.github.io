import React from 'react';
import { CommandPalette } from './CommandPalette';
import { Github, ExternalLink, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080A0D]/85 border-b border-white/[0.08]"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Callout */}
        <a
          href="#bench"
          className="flex items-center gap-3 group"
          aria-label="Saivarshith Mitukula - Home"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-xs text-white group-hover:border-emerald-400 transition-colors shadow-sm">
            SM
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              saivarshithm
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>EEE · NITK &apos;27</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-300">
          <a href="#bench" className="hover:text-emerald-400 transition-colors py-1">
            01. Bench
          </a>
          <a href="#flagships" className="hover:text-emerald-400 transition-colors py-1">
            02. Flagships
          </a>
          <a href="#repositories" className="hover:text-emerald-400 transition-colors py-1">
            03. Repos
          </a>
          <a href="#capabilities" className="hover:text-emerald-400 transition-colors py-1">
            04. Stack
          </a>
          <a href="#experience" className="hover:text-emerald-400 transition-colors py-1">
            05. Milestones
          </a>
          <a href="#connect" className="hover:text-emerald-400 transition-colors py-1">
            06. Connect
          </a>
        </nav>

        {/* Actions: Command Menu + GitHub Profile */}
        <div className="flex items-center gap-2.5">
          <CommandPalette />

          <a
            href="https://github.com/saivarshithm"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/10 transition-all tap-target"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
