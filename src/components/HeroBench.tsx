import React from 'react';
import { BenchInteractiveWidget } from './BenchInteractiveWidget';
import { SignalCanvas } from './SignalCanvas';
import { Github, ArrowDown, Sparkles, ExternalLink, Cpu, Terminal, Zap } from 'lucide-react';
import { PROFILE_INFO } from '../data/projects';

export const HeroBench: React.FC = () => {
  return (
    <section
      id="bench"
      className="relative min-h-[100dvh] pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-center overflow-hidden"
    >
      {/* Background Electromagnetic Oscilloscope Canvas */}
      <SignalCanvas className="absolute inset-0 pointer-events-none opacity-40 z-0" />

      {/* Top Tracked-Out Category Badge */}
      <div className="relative z-10 flex flex-col items-center text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.4)] text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>NITK SURATHKAL · EX-ISRO URSC RESEARCH INTERN</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.04] max-w-4xl font-display">
          Saivarshith Mitukula
        </h1>

        {/* Tagline / Subtitle */}
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl font-normal leading-relaxed">
          Architecting <span className="font-semibold text-emerald-400">digital silicon &amp; space-grade power</span> by day, vibe-coding <span className="font-semibold text-sky-400">fast software platforms</span> by night.
        </p>

        {/* CTA Buttons in Dark Silicon Capsule Style */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#flagships"
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2 tap-target hover:scale-[1.02]"
          >
            <span>Explore Engineering</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/saivarshithm"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 backdrop-blur-md transition-all flex items-center gap-2 tap-target hover:border-white/25"
          >
            <Github className="w-4 h-4 text-emerald-400" />
            <span>GitHub (@saivarshithm)</span>
          </a>

          <a
            href="https://filevault.cc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 backdrop-blur-md transition-all flex items-center gap-2 tap-target hover:border-sky-400/50"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>FileVault.cc</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>
      </div>

      {/* Tactile Workbench Stage: Photo Print + Silicon Telemetry Cards */}
      <div className="relative z-10 mt-8 mb-12 flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Hardware Desk Telemetry Card (Left) */}
        <div className="hidden lg:block w-64 p-4 rounded-2xl bg-[#10141B]/80 border border-white/10 backdrop-blur-md shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform">
          <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Silicon &amp; Power Bench</span>
          </div>
          <p className="text-xs text-zinc-300 font-mono leading-relaxed">
            &ldquo;RV32IM pipelined core (1.57 CPI) + ISRO 100 kHz space converter magnetic design.&rdquo;
          </p>
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>SKY130 VLSI</span>
            <span className="text-emerald-400">VERIFIED</span>
          </div>
        </div>

        {/* Saivarshith Portrait with Glass-Carbon Frame */}
        <div className="relative group">
          <div className="relative p-2 rounded-3xl bg-[#10141B] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl group-hover:border-emerald-500/40 transition-all duration-300">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-black/60">
              <img
                src="/saivarshith.jpg"
                alt="Saivarshith Mitukula"
                width={256}
                height={256}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D]/70 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="mt-3 px-2 pb-1 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold font-mono text-white">
                  Saivarshith M.
                </span>
                <span className="block text-[10px] text-zinc-400 font-mono">
                  NITK EEE &apos;27 · Roll: 231EE240
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Software & Platform Telemetry Card (Right) */}
        <div className="hidden lg:block w-64 p-4 rounded-2xl bg-[#10141B]/80 border border-white/10 backdrop-blur-md shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform">
          <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-sky-400 font-bold mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>Vibe-Coded Platforms</span>
          </div>
          <p className="text-xs text-zinc-300 font-mono leading-relaxed">
            &ldquo;Zero-setup end-to-end encrypted sharing via Web Crypto API + Antigravity autonomous agent workflows.&rdquo;
          </p>
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>FileVault.cc</span>
            <span className="text-sky-400">LIVE SHIP</span>
          </div>
        </div>
      </div>

      {/* Oscilloscope & PWM Signal Synthesizer Bezel */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <BenchInteractiveWidget />
      </div>
    </section>
  );
};
