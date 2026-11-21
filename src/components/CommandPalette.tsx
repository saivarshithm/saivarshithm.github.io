import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Command, 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
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
    { id: 'nav-flagships', type: 'Nav', title: 'Flagship Hardware & Software', action: () => handleNavigate('#flagships'), icon: Layers },
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
      title: 'Copy Instagram Profile URL (@saivarshithm)',
      detail: PROFILE_INFO.links.instagram,
      action: () => copyToClipboard(PROFILE_INFO.links.instagram, 'Instagram URL'),
      icon: Instagram
    },
    {
      id: 'copy-orcid',
      type: 'Action',
      title: 'Copy ORCID ID (0009-0007-7773-7587)',
      detail: PROFILE_INFO.links.orcid,
      action: () => copyToClipboard(PROFILE_INFO.links.orcid, 'ORCID ID'),
      icon: BookOpen
    },

    ...FLAGSHIP_PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      type: 'Project',
      title: p.title,
      detail: p.subtitle,
      action: () => {
        setIsOpen(false);
        if (p.url) window.open(p.url, '_blank');
        else if (p.repo) window.open(p.repo, '_blank');
        else handleNavigate('#flagships');
      },
      icon: Cpu
    }))
  ].filter((item) => {
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.detail && item.detail.toLowerCase().includes(query.toLowerCase())) ||
      item.type.toLowerCase().includes(query.toLowerCase())
    );
  });

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="glass-button px-3.5 py-1.5 text-xs font-mono font-medium text-[#2E241E] flex items-center gap-1.5 tap-target"
        aria-label="Open Command Menu"
      >
        <Command className="w-3.5 h-3.5 text-[#8C5E14]" />
        <span>Menu</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/60 text-[10px] text-[#5C3826] border border-[#EBDFCD]">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl paper-sheet rounded-[28px] border border-[#EBDFCD] bg-[#FBF8F2] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-[#EBDFCD] px-4 py-3.5 flex items-center gap-3 bg-[#FAF6F0]">
          <Search className="w-5 h-5 text-[#8C5E14] shrink-0" />
          <input
            type="text"
            placeholder="Type a command, jump to section, or search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-[#2E241E] placeholder-[#5C3826]/60 focus:outline-none font-mono"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-white text-[#5C3826] hover:text-[#2E241E] transition-all tap-target"
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
                  className="w-full text-left p-3 rounded-2xl hover:bg-white flex items-center justify-between gap-3 text-xs font-mono transition-colors group tap-target border border-transparent hover:border-[#EBDFCD]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-[#FAF6F0] border border-[#EBDFCD] text-[#5C3826] group-hover:text-[#8C5E14] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[#2E241E] font-bold truncate">{item.title}</div>
                      {item.detail && (
                        <div className="text-[#5C3826] text-[11px] truncate">{item.detail}</div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-[#8C5E14] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#FAF6F0] border border-[#EBDFCD] shrink-0">
                    {item.type}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs font-mono text-[#5C3826]">
              No matching commands or projects found.
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-[#FAF6F0] border-t border-[#EBDFCD] flex items-center justify-between text-[11px] font-mono text-[#5C3826]">
          <span>{copiedText ? `✓ Copied ${copiedText} to clipboard!` : 'Press Esc to close'}</span>
          <span>Saivarshith Mitukula</span>
        </div>
      </div>
    </div>
  );
};
