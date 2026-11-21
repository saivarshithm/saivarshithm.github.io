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
    <footer id="connect" className="relative mt-20 bg-[#171615] text-white pt-20 pb-28 md:pb-20 px-4 sm:px-6 lg:px-8 rounded-t-[36px] sm:rounded-t-[48px] overflow-hidden">
      {/* Subtle Warm Top Edge Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#8C5E14]/40 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand & Philosophy Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono font-bold text-sm text-white">
                  SM
                </div>
                <span className="font-bold text-2xl text-white tracking-tight">
                  saivarshith<span className="text-[#8C5E14]">.</span>
                </span>
              </div>

              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                Electrical &amp; Electronics Engineering undergraduate at National Institute of Technology Karnataka, Surathkal.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-white/10 text-amber-300 font-bold tracking-widest border border-white/10">
                  DESIGN · BUILD · VERIFY
                </span>
                <span className="text-xs font-mono text-zinc-400">NITK EEE &apos;27</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2.5 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEMS ONLINE · HOSTED ON GITHUB PAGES</span>
            </div>
          </div>

          {/* Social Channels Column with One-Click Copy */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>DIRECT CHANNELS &amp; CONTACT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {connectLinks.map((item) => {
                const Icon = item.icon;
                const isCopied = copiedKey === item.key;

                return (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/25 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-white/5 text-zinc-300 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[11px] font-mono text-zinc-400 truncate">{item.handle}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => copyToClipboard(item.url, item.key)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all tap-target"
                        title={`Copy ${item.label} Link`}
                        aria-label={`Copy ${item.label} link`}
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
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all tap-target"
                        title={`Visit ${item.label}`}
                        aria-label={`Visit ${item.label}`}
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

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} Saivarshith Mitukula. Built with Astro 5, React 19 &amp; Tailwind CSS v4.
          </div>
          <a href="#bench" className="hover:text-white transition-colors">
            Return to Top ↑
          </a>
        </div>

        {/* EdgeDrop Giant Signature Watermark */}
        <div className="mt-12 text-center overflow-hidden select-none pointer-events-none opacity-10">
          <span className="font-extrabold text-[54px] sm:text-[90px] md:text-[120px] tracking-tighter text-white block leading-none">
            saivarshithm
          </span>
        </div>
      </div>
    </footer>
  );
};
