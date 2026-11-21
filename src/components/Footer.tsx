import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  Send
} from 'lucide-react';
import { PROFILE_INFO } from '../data/projects';

export const Footer: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const connectLinks = [
    {
      key: 'github',
      label: 'GitHub',
      handle: '@saivarshithm',
      url: PROFILE_INFO.links.github,
      icon: Github
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      handle: 'saivarshithmitukula',
      url: PROFILE_INFO.links.linkedin,
      icon: Linkedin
    },
    {
      key: 'instagram',
      label: 'Instagram',
      handle: '@saivarshithm',
      url: PROFILE_INFO.links.instagram,
      icon: Instagram
    },
    {
      key: 'x',
      label: 'X (Twitter)',
      handle: '@Saivarshithm',
      url: PROFILE_INFO.links.x,
      icon: Twitter
    },
    {
      key: 'orcid',
      label: 'ORCID Record',
      handle: '0009-0007-7773-7587',
      url: PROFILE_INFO.links.orcid,
      icon: BookOpen
    }
  ];

  return (
    <footer id="connect" className="relative mt-20 bg-[#040507] text-white pt-20 pb-28 md:pb-20 px-4 sm:px-6 lg:px-8 rounded-t-[36px] sm:rounded-t-[48px] overflow-hidden border-t border-white/10">
      {/* Subtle Phosphor Top Edge Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand & Philosophy Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono font-bold text-sm text-white">
                  SM
                </div>
                <span className="font-bold text-2xl text-white tracking-tight font-display">
                  saivarshith<span className="text-amber-400">.</span>dev
                </span>
              </div>

              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                Electrical &amp; Electronics Engineering undergraduate at National Institute of Technology Karnataka, Surathkal.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 font-bold tracking-widest border border-emerald-500/20">
                  DESIGN · BUILD · VERIFY
                </span>
                <span className="text-xs font-mono text-zinc-500">NITK EEE &apos;27</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2.5 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEMS ONLINE · DEPLOYED AT SAIVARSHITHM.DEV</span>
            </div>
          </div>

          {/* Social Channels Column with One-Click Copy */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
                <Send className="w-3.5 h-3.5" />
                Verified Engineering Coordinates
              </span>
              <span className="text-[11px] font-mono text-zinc-500">Click to copy or launch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {connectLinks.map((item) => {
                const Icon = item.icon;
                const isCopied = copiedKey === item.key;

                return (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.07] transition-all flex items-center justify-between gap-3 group"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 min-w-0 flex-1 tap-target"
                      aria-label={`Open ${item.label}`}
                    >
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 group-hover:text-emerald-400 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                          {item.label}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400 truncate">
                          {item.handle}
                        </div>
                      </div>
                    </a>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyToClipboard(item.url, item.key)}
                        className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all tap-target"
                        aria-label={`Copy ${item.label} link`}
                        title="Copy Link"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-zinc-400 hover:text-emerald-400 hover:bg-white/10 transition-all tap-target"
                        aria-label={`Visit ${item.label}`}
                        title="Open Link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Status Bar & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Saivarshith Mitukula. Built with Astro, React &amp; Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">NITK Surathkal, Karnataka, India</span>
            <span>·</span>
            <span className="text-emerald-400 font-semibold">100/100 Lighthouse Target</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
