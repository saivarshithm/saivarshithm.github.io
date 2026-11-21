import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  Send
} from 'lucide-react';
import { PROFILE_INFO } from '../data/projects';
import { MosfetSymbol, LogicGateSymbol } from './SchematicSymbols';

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
      icon: Github,
      accent: 'emerald'
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      handle: 'saivarshithmitukula',
      url: PROFILE_INFO.links.linkedin,
      icon: Linkedin,
      accent: 'sky'
    },
    {
      key: 'x',
      label: 'X (Twitter)',
      handle: '@Saivarshithm',
      url: PROFILE_INFO.links.x,
      icon: Twitter,
      accent: 'sky'
    },
    {
      key: 'orcid',
      label: 'ORCID Record',
      handle: '0009-0007-7773-7587',
      url: PROFILE_INFO.links.orcid,
      icon: BookOpen,
      accent: 'amber'
    }
  ];

  return (
    <footer id="connect" className="relative border-t border-white/10 bg-[#06080B] pt-16 pb-24 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Left Brand & Philosophy Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs text-emerald-400">
                  SM
                </div>
                <span className="font-display font-bold text-lg text-white">
                  Saivarshith Mitukula
                </span>
              </div>
              <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
                Electrical &amp; Electronics Engineering undergraduate at National Institute of Technology Karnataka, Surathkal.
              </p>
              
              <div className="mt-4 flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-amber-300 font-semibold tracking-wider">
                  DESIGN · BUILD · VERIFY
                </span>
                <span className="text-xs font-mono text-gray-400">NITK EEE &apos;27</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs font-mono text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYSTEMS ONLINE · HOSTED ON GITHUB PAGES</span>
            </div>
          </div>

          {/* Right Connect Links Column with One-Click Copy */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>DIRECT CHANNELS &amp; REPOSITORIES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {connectLinks.map((item) => {
                const Icon = item.icon;
                const isCopied = copiedKey === item.key;

                return (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 group-hover:text-emerald-400 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-semibold text-white">{item.label}</div>
                        <div className="text-[11px] font-mono text-gray-400 truncate">{item.handle}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* One-click copy button */}
                      <button
                        onClick={() => copyToClipboard(item.url, item.key)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all tap-target"
                        title={`Copy ${item.label} URL`}
                        aria-label={`Copy ${item.label} link`}
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Direct visit button */}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition-all tap-target"
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

        {/* Bottom Micro Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            © {new Date().getFullYear()} Saivarshith Mitukula. Static SSG Engine powered by Astro &amp; React.
          </div>
          <div className="flex items-center gap-4">
            <a href="#bench" className="hover:text-white transition-colors">
              Return to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
