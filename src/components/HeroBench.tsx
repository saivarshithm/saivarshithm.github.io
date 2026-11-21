import React from 'react';
import { TerminalCard } from './TerminalCard';
import { Github, ArrowDown, FileText, ExternalLink, Cpu, Zap, ShieldCheck } from 'lucide-react';
import { PROFILE_INFO } from '../data/projects';

export const HeroBench: React.FC = () => {
  return (
    <section
      id="bench"
      className="relative min-h-[85dvh] pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-center overflow-x-clip"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headline, Bio & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Live Engineering Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-400 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>EEE @ NITK Surathkal · Ex-ISRO URSC Research Intern</span>
          </div>

          {/* Fluid Headline */}
          <h1 className="text-[clamp(2.1rem,6vw,3.75rem)] font-extrabold tracking-tight text-[#F4F4F5] leading-[1.08] font-sans">
            Saivarshith Mitukula
          </h1>

          {/* Core Subtitle & Positioning */}
          <p className="mt-3 text-lg sm:text-xl font-semibold text-zinc-200">
            Digital Silicon, Power Electronics &amp; Software Systems.
          </p>

          <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] max-w-xl leading-relaxed">
            Designing pipelined RISC-V processors, space-grade power converters, and fast developer tools. Undergraduate researcher at NITK Surathkal with former appointment at ISRO URSC Satellite Centre.
          </p>

          {/* Quick Metrics Capsule Strip */}
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
            <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>RV32IM (1.57 CPI)</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span>ISRO 100 kHz Bus</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>SKY130 PDK VLSI</span>
            </span>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#flagships"
              className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2 tap-target"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/saivarshithm"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#F4F4F5] font-mono text-xs sm:text-sm border border-white/10 transition-all flex items-center gap-2 tap-target"
            >
              <Github className="w-4 h-4 text-emerald-400" />
              <span>saivarshithm</span>
            </a>

            <a
              href="/resume"
              className="px-4 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#F4F4F5] font-mono text-xs sm:text-sm border border-white/10 transition-all flex items-center gap-1.5 tap-target"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>/resume</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Terminal Card & Portrait Badge */}
        <div className="lg:col-span-5 flex flex-col gap-4 items-center w-full">
          {/* Portrait Header Strip */}
          <div className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#111216] border border-white/10 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src="/saivarshith.jpg"
                alt="Saivarshith Mitukula"
                width={42}
                height={42}
                className="w-10 h-10 rounded-lg object-cover border border-white/15"
              />
              <div>
                <span className="block text-xs font-semibold text-[#F4F4F5]">Saivarshith M.</span>
                <span className="block text-[11px] font-mono text-zinc-400">NITK EEE &apos;27 · Roll: 231EE240</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              ACTIVE
            </span>
          </div>

          {/* Interactive Code Terminal */}
          <TerminalCard />
        </div>
      </div>
    </section>
  );
};
