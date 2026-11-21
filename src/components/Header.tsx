import React, { useState, useEffect } from 'react';
import { CommandPalette } from './CommandPalette';
import { CredentialsModal } from './CredentialsModal';
import { Award, FileText } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 px-4 sm:px-6 ${
          isScrolled
            ? 'bg-[#09090B]/85 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)'
        }}
      >
        <div className="max-w-6xl mx-auto h-14 flex items-center justify-between">
          {/* Left Brand: saivarshithm.dev with phosphor emerald status dot */}
          <a
            href="#bench"
            className="flex items-center gap-2 group tap-target"
            aria-label="Saivarshith Mitukula"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="font-mono text-sm sm:text-base font-semibold text-[#F4F4F5] tracking-tight group-hover:text-emerald-400 transition-colors">
              saivarshithm<span className="text-zinc-500">.</span>dev
            </span>
          </a>

          {/* Right Navigation & Tools */}
          <div className="flex items-center gap-2 sm:gap-4">
            <nav className="hidden md:flex items-center gap-5 text-xs font-mono text-[#A1A1AA]">
              <a href="#flagships" className="hover:text-[#F4F4F5] transition-colors py-1">
                Projects
              </a>
              <a href="#buck-lab" className="hover:text-emerald-400 transition-colors py-1">
                Buck Sim Lab
              </a>
              <a href="#repositories" className="hover:text-[#F4F4F5] transition-colors py-1">
                Repos
              </a>
              <a
                href="/resume"
                className="hover:text-emerald-400 transition-colors py-1 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>/resume</span>
              </a>
            </nav>

            {/* Credentials Button */}
            <button
              onClick={() => setShowCredentials(true)}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-[#F4F4F5] flex items-center gap-1.5 transition-all tap-target"
              aria-label="View Credentials"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">[Credentials]</span>
              <span className="sm:hidden font-mono text-[11px]">NITK &apos;27</span>
            </button>

            {/* Command Palette Trigger */}
            <CommandPalette />
          </div>
        </div>
      </header>

      {/* Quick-Spec Credentials Modal */}
      <CredentialsModal
        isOpen={showCredentials}
        onClose={() => setShowCredentials(false)}
      />
    </>
  );
};
