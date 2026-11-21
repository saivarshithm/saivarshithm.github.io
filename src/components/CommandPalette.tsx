import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Command, 
  X, 
  ExternalLink, 
  Cpu, 
  Layers, 
  Briefcase, 
  Terminal, 
  Github,
  Linkedin,
  Twitter,
  Instagram,
  BookOpen
} from 'lucide-react';
import { FLAGSHIP_PROJECTS, PROFILE_INFO } from '../data/projects';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleNavigate = (hash: string) => {
    setIsOpen(false);
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredItems = [
    { id: 'nav-bench', type: 'Nav', title: 'The Bench (Hero & Oscilloscope)', action: () => handleNavigate('#bench'), icon: Cpu },
    { id: 'nav-flagships', type: 'Nav', title: 'Flagship Systems & Case Studies', action: () => handleNavigate('#flagships'), icon: Layers },
    { id: 'nav-repos', type: 'Nav', title: 'Live GitHub Repository Explorer', action: () => handleNavigate('#repositories'), icon: Terminal },
    { id: 'nav-stack', type: 'Nav', title: 'Capabilities & Toolchains Matrix', action: () => handleNavigate('#capabilities'), icon: Layers },
    { id: 'nav-exp', type: 'Nav', title: 'Milestones & ISRO Timeline', action: () => handleNavigate('#experience'), icon: Briefcase },
    { id: 'nav-connect', type: 'Nav', title: 'Connect & Academic IDs', action: () => handleNavigate('#connect'), icon: ExternalLink },

    {
      id: 'copy-github',
      type: 'Action',
      title: 'Copy GitHub Profile URL',
      detail: PROFILE_INFO.links.github,
      action: () => copyToClipboard(PROFILE_INFO.links.github, 'GitHub URL'),
      icon: Github
    },
    {
      id: 'copy-linkedin',
      type: 'Action',
      title: 'Copy LinkedIn Profile URL',
      detail: PROFILE_INFO.links.linkedin,
      action: () => copyToClipboard(PROFILE_INFO.links.linkedin, 'LinkedIn URL'),
      icon: Linkedin
    },
    {
      id: 'copy-instagram',
      type: 'Action',
      title: 'Copy Instagram URL',
      detail: PROFILE_INFO.links.instagram,
      action: () => copyToClipboard(PROFILE_INFO.links.instagram, 'Instagram URL'),
      icon: Instagram
    },
    {
      id: 'copy-x',
      type: 'Action',
      title: 'Copy X (Twitter) URL',
      detail: PROFILE_INFO.links.x,
      action: () => copyToClipboard(PROFILE_INFO.links.x, 'X URL'),
      icon: Twitter
    },
    {
      id: 'copy-orcid',
      type: 'Action',
      title: 'Copy ORCID Record ID',
      detail: '0009-0007-7773-7587',
      action: () => copyToClipboard(PROFILE_INFO.links.orcid, 'ORCID URL'),
      icon: BookOpen
    },

    ...FLAGSHIP_PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      type: 'Project',
      title: proj.title,
      detail: `${proj.category} · ${proj.period}`,
      action: () => handleNavigate('#flagships'),
      icon: Cpu
    }))
  ].filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.detail && item.detail.toLowerCase().includes(q)) ||
      item.type.toLowerCase().includes(q)
    );
  });

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 border border-white/10 flex items-center gap-1.5 transition-all tap-target"
        aria-label="Open Command Menu"
      >
        <Command className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden sm:inline">Menu</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-zinc-400 border border-white/10">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl rounded-3xl border border-white/15 bg-[#10141B] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-white/10 px-4 py-3.5 flex items-center gap-3 bg-[#080A0D]/60">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command, jump to section, or search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all tap-target"
            aria-label="Close command menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full text-left p-3 rounded-2xl hover:bg-white/5 flex items-center justify-between gap-3 text-xs font-mono transition-colors group tap-target border border-transparent hover:border-white/10"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 group-hover:text-emerald-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-white font-semibold truncate group-hover:text-emerald-300 transition-colors">{item.title}</div>
                      {item.detail && (
                        <div className="text-zinc-400 text-[11px] truncate">{item.detail}</div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 shrink-0">
                    {item.type}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs font-mono text-zinc-500">
              No matching commands or projects found.
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-[#080A0D]/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span>{copiedText ? `✓ Copied ${copiedText} to clipboard!` : 'Press Esc to close'}</span>
          <span className="text-emerald-400/80">Saivarshith Mitukula · NITK Surathkal</span>
        </div>
      </div>
    </div>
  );
};
