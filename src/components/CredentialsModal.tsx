import React, { useEffect, useState } from 'react';
import { X, Award, Briefcase, GraduationCap, Copy, Check, ExternalLink } from 'lucide-react';
import { PROFILE_INFO } from '../data/projects';

interface CredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CredentialsModal: React.FC<CredentialsModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111216] p-6 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-base font-semibold text-[#F4F4F5] font-mono">
              ~/credentials/saivarshithm
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors tap-target"
            aria-label="Close credentials modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          {/* Education */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATION</span>
            </div>
            <div className="text-sm font-semibold text-white">
              B.Tech in Electrical &amp; Electronics Engineering
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">
              National Institute of Technology Karnataka (NITK), Surathkal · 2023 – Present
            </div>
            <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              CGPA: 8.56 / 10.0
            </div>
          </div>

          {/* ISRO Internship */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-1">
              <Briefcase className="w-4 h-4" />
              <span>RESEARCH APPOINTMENT</span>
            </div>
            <div className="text-sm font-semibold text-white">
              Summer Research Intern · Power Systems Group
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">
              U.R. Rao Satellite Centre (URSC), ISRO Bengaluru · May – Jun 2026
            </div>
            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              Engineered 11V–42V to 5V (4A, 20W) radiation-tolerant step-down converter with 100 kHz closed-loop PWM controller for satellite bus conditioning.
            </p>
          </div>

          {/* Honors & Benchmarks */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold mb-1">
              <Award className="w-4 h-4" />
              <span>HONORS &amp; BENCHMARKS</span>
            </div>
            <ul className="text-xs text-zinc-300 space-y-1.5 mt-2">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">›</span>
                <span><strong>HDLBits Global Rank ~1700</strong> in synthesizable Verilog &amp; FSM design.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">›</span>
                <span><strong>Convener, Tronix &amp; Event Lead, EESA Day 2026</strong> at NITK Surathkal.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">›</span>
                <span><strong>Real-Time PID Ball Balancer:</strong> Closed-loop analog-embedded mechatronics system with resistive touch-panel feedback.</span>
              </li>
            </ul>
          </div>

          {/* Quick-Copy Links */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {[
              { key: 'github', label: 'GitHub', val: PROFILE_INFO.links.github },
              { key: 'linkedin', label: 'LinkedIn', val: PROFILE_INFO.links.linkedin },
              { key: 'orcid', label: 'ORCID', val: PROFILE_INFO.links.orcid },
              { key: 'x', label: 'X (Twitter)', val: PROFILE_INFO.links.x }
            ].map((link) => (
              <button
                key={link.key}
                onClick={() => copyText(link.val, link.key)}
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white flex items-center justify-between gap-1 transition-all"
              >
                <span>{link.label}</span>
                {copiedKey === link.key ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Press ESC to dismiss</span>
          <a
            href="/resume"
            className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View Full Resume</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
