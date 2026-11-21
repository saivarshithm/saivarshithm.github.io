import React from 'react';
import { CAPABILITIES } from '../data/projects';
import { Cpu, Terminal, Sparkles } from 'lucide-react';
import { MosfetSymbol, LogicGateSymbol } from './SchematicSymbols';

export const CapabilitiesMatrix: React.FC = () => {
  return (
    <section id="capabilities" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3 backdrop-blur-md">
          <Terminal className="w-3.5 h-3.5" />
          <span>DUAL-TRACK TOOLCHAINS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          Capabilities &amp; Stack
        </h2>
        <p className="mt-2 text-base text-zinc-400">
          Transistor silicon physics &amp; power magnetics bridged with modern high-velocity web engineering.
        </p>
      </div>

      {/* Dual Glass-Carbon Track Sheets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Track A: Silicon & Power */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#10141B] shadow-[0_16px_40px_rgba(0,0,0,0.5)] relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 shadow-inner">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Silicon, VLSI &amp; Power</h3>
                  <p className="text-xs font-mono text-emerald-400 font-semibold">HARDWARE &amp; MAGNETICS TRACK</p>
                </div>
              </div>
              <MosfetSymbol size={32} color="#10B981" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAPABILITIES.siliconAndPower.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-zinc-100">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-tight font-mono">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-emerald-400 font-bold">EDA &amp; Simulation:</span>
            <span>Xilinx Vivado · LTspice · NGSpice · GTKWave · Ansys Maxwell 3D · MATLAB / Simulink · ModelSim</span>
          </div>
        </div>

        {/* Track B: Vibe-Coding & Developer Platforms */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#10141B] shadow-[0_16px_40px_rgba(0,0,0,0.5)] relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-sky-400 shadow-inner">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Vibe-Coding &amp; Platforms</h3>
                  <p className="text-xs font-mono text-sky-400 font-semibold">SOFTWARE &amp; AGENTIC TRACK</p>
                </div>
              </div>
              <LogicGateSymbol size={32} color="#38BDF8" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(CAPABILITIES.vibeCodingAndPlatforms || CAPABILITIES.vibeCodingAndApps || []).map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-500/40 hover:bg-white/[0.05] transition-all shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-zinc-100">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-tight font-mono">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-sky-400 font-bold">Frameworks &amp; Runtimes:</span>
            <span>Astro · React 19 · TypeScript · Tailwind CSS v4 · GSAP · Web Crypto · Cloudflare Pages · GitHub Actions</span>
          </div>
        </div>
      </div>
    </section>
  );
};
