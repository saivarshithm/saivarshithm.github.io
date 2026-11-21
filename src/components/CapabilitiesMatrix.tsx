import React from 'react';
import { CAPABILITIES } from '../data/projects';
import { Cpu, Sparkles, Terminal } from 'lucide-react';
import { MosfetSymbol, LogicGateSymbol } from './SchematicSymbols';

export const CapabilitiesMatrix: React.FC = () => {
  return (
    <section id="capabilities" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>DUAL-TRACK ENGINEERING STACK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
          Capabilities &amp; Toolchains
        </h2>
        <p className="mt-3 text-base text-gray-400">
          Bridging physical transistor silicon &amp; magnetic circuits with modern full-stack web platforms.
        </p>
      </div>

      {/* Dual Columns: Track A (Silicon & Power) + Track B (Vibe Coding & Apps) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Track A: Silicon, VLSI & Power */}
        <div className="card-glass rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">Silicon, VLSI &amp; Power</h3>
                <p className="text-xs font-mono text-emerald-400">HARDWARE &amp; MAGNETICS TRACK</p>
              </div>
            </div>
            <MosfetSymbol size={32} color="#10B981" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CAPABILITIES.siliconAndPower.map((skill, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-semibold text-white">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {skill.level}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-tight">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono text-gray-400">
            <span className="text-emerald-400">Simulators &amp; EDA:</span>
            <span>Vivado · LTspice · NGSpice · GTKWave · Ansys Maxwell · MATLAB</span>
          </div>
        </div>

        {/* Track B: Vibe Coding & Developer Platforms */}
        <div className="card-glass rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">Vibe Coding &amp; App Stack</h3>
                <p className="text-xs font-mono text-sky-400">SOFTWARE &amp; AGENTIC SYSTEMS TRACK</p>
              </div>
            </div>
            <LogicGateSymbol size={32} color="#38BDF8" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CAPABILITIES.vibeCodingAndApps.map((skill, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-semibold text-white">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    {skill.level}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-tight">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono text-gray-400">
            <span className="text-sky-400">Ecosystem:</span>
            <span>Astro · React · TypeScript · Tailwind CSS · GSAP · Antigravity · GitHub Actions</span>
          </div>
        </div>
      </div>
    </section>
  );
};
