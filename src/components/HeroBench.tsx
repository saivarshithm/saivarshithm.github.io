import React from 'react';
import { BenchInteractiveWidget } from './BenchInteractiveWidget';
import { SignalCanvas } from './SignalCanvas';
import { Github, ArrowDown, Sparkles } from 'lucide-react';
import { MosfetSymbol, LogicGateSymbol } from './SchematicSymbols';
import { PROFILE_INFO } from '../data/projects';

export const HeroBench: React.FC = () => {
  return (
    <section
      id="bench"
      className="relative min-h-[100dvh] flex flex-col justify-center py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Electromagnetic Waveform Canvas */}
      <SignalCanvas className="opacity-70" />

      {/* Hero Content Container */}
      <div className="relative z-10 flex flex-col gap-10">
        {/* Top Profile Intro Block */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pt-4">
          <div className="flex-1 max-w-3xl">
            {/* Live Bench Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 mb-4 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-emerald" />
              <span className="font-semibold">{PROFILE_INFO.status}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.08]">
              Saivarshith Mitukula
            </h1>

            {/* Mission Statement */}
            <p className="mt-4 text-lg sm:text-xl text-gray-300 font-sans leading-relaxed">
              Engineering <span className="text-emerald-400 font-semibold">digital silicon &amp; power systems</span> by day, vibe-coding <span className="text-sky-400 font-semibold">fast software platforms</span> by night.
            </p>

            {/* Philosophy Pill */}
            <div className="mt-3 flex items-center gap-3 text-xs font-mono text-gray-400">
              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-amber-300 font-bold tracking-widest">
                {PROFILE_INFO.philosophy}
              </span>
              <span>·</span>
              <span>NITK Surathkal &apos;27</span>
              <span>·</span>
              <span className="text-emerald-400">CGPA: {PROFILE_INFO.cgpa}</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#flagships"
                className="tap-target px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center gap-2 active:scale-95"
              >
                <span>Explore Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/saivarshithm"
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white font-mono text-xs sm:text-sm border border-white/10 transition-all flex items-center gap-2 active:scale-95"
              >
                <Github className="w-4 h-4" />
                <span>GitHub (@saivarshithm)</span>
              </a>

              <a
                href="https://filevault.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target px-4 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 font-mono text-xs sm:text-sm border border-sky-500/25 transition-all flex items-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>FileVault.cc</span>
              </a>
            </div>
          </div>

          {/* Profile Card & Photo with Lab Accents */}
          <div className="relative group shrink-0">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-emerald-500/40 p-1 bg-black/40 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <img
                src="/saivarshith.jpg"
                alt="Saivarshith Mitukula"
                className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-300"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-xl" />
            </div>

            {/* Corner Circuit Badges */}
            <div className="absolute -bottom-2.5 -right-2.5 p-1.5 rounded-lg bg-[#0C1017] border border-white/10 text-emerald-400 shadow-md">
              <MosfetSymbol size={20} color="#10B981" />
            </div>
            <div className="absolute -top-2.5 -left-2.5 p-1.5 rounded-lg bg-[#0C1017] border border-white/10 text-sky-400 shadow-md">
              <LogicGateSymbol size={20} color="#38BDF8" />
            </div>
          </div>
        </div>

        {/* Live Interactive Oscilloscope / PWM Synthesizer & App Preview Widget */}
        <div className="mt-2">
          <BenchInteractiveWidget />
        </div>
      </div>
    </section>
  );
};
