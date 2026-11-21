import React, { useState, useEffect } from 'react';
import { Cpu, Layers, Terminal, Wrench, Send } from 'lucide-react';

export const MobileDock: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('bench');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['bench', 'flagships', 'repositories', 'capabilities', 'connect'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'bench', label: 'Bench', icon: Cpu, href: '#bench' },
    { id: 'flagships', label: 'Projects', icon: Layers, href: '#flagships' },
    { id: 'repositories', label: 'Repos', icon: Terminal, href: '#repositories' },
    { id: 'capabilities', label: 'Stack', icon: Wrench, href: '#capabilities' },
    { id: 'connect', label: 'Connect', icon: Send, href: '#connect' }
  ];

  return (
    <nav
      className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md pointer-events-auto"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
      aria-label="Mobile Navigation Dock"
    >
      <div className="rounded-full px-2 py-2 flex items-center justify-around border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl bg-[#10141B]/90">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              className={`tap-target flex flex-col items-center justify-center gap-1 rounded-full transition-all duration-150 active:scale-95 min-w-[54px] min-h-[48px] ${
                isActive
                  ? 'text-emerald-300 bg-emerald-500/20 font-bold border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-wider">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
