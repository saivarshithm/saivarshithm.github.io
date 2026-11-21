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
import { FLAGSHIP_PROJECTS, FALLBACK_REPOS, PROFILE_INFO } from '../data/projects';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Global keydown listener for ⌘K or Ctrl+K or Escape
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
    // Navigation
    { id: 'nav-bench', type: 'Nav', title: 'The Bench (Hero & Oscilloscope)', action: () => handleNavigate('#bench'), icon: Cpu },
    { id: 'nav-flagships', type: 'Nav', title: 'Flagship Hardware & Software', action: () => handleNavigate('#flagships'), icon: Layers },
    { id: 'nav-repos', type: 'Nav', title: 'Live GitHub Repository Explorer', action: () => handleNavigate('#repositories'), icon: Terminal },
    { id: 'nav-stack', type: 'Nav', title: 'Capabilities & Toolchains Matrix', action: () => handleNavigate('#capabilities'), icon: Layers },
    { id: 'nav-exp', type: 'Nav', title: 'Experience & ISRO Timeline', action: () => handleNavigate('#experience'), icon: Briefcase },
    { id: 'nav-connect', type: 'Nav', title: 'Connect & Academic IDs', action: () => handleNavigate('#connect'), icon: ExternalLink },

    // Quick Copies
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

    // Projects
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
      /* Trigger button rendered in header or floating */
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-gray-300 border border-white/10 transition-all tap-target"
        aria-label="Open Command Menu"
      >
        <Command className="w-3.5 h-3.5 text-emerald-400" />
        <span>Menu</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-gray-400 border border-white/10">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl card-glass rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-white/10 px-4 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command, jump to section, or search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none font-mono"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all tap-target"
            aria-label="Close command menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full text-left p-3 rounded-xl hover:bg-white/[0.06] flex items-center justify-between gap-3 text-xs font-mono transition-colors group tap-target"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-white font-medium truncate">{item.title}</div>
                      {item.detail && (
                        <div className="text-gray-400 text-[11px] truncate">{item.detail}</div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase px-2 py-0.5 rounded bg-white/[0.03] shrink-0">
                    {item.type}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs font-mono text-gray-400">
              No matching commands or projects found.
            </div>
          )}
        </div>

        {/* Footer notification */}
        <div className="px-4 py-2 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
          <span>{copiedText ? `✓ Copied ${copiedText} to clipboard!` : 'Press Esc to close'}</span>
          <span>Saivarshith Mitukula</span>
        </div>
      </div>
    </div>
  );
};
