import React from 'react';
import { CAPABILITIES } from '../data/projects';
import { Cpu, Sparkles, Terminal } from 'lucide-react';
import { MosfetSymbol, LogicGateSymbol } from './SchematicSymbols';

export const CapabilitiesMatrix: React.FC = () => {
  return (
    <section id="capabilities" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6F0] border border-[#EBDFCD] text-xs font-semibold tracking-widest text-[#8C5E14] uppercase mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>DUAL-TRACK TOOLCHAINS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2E241E]">
          Capabilities &amp; Stack
        </h2>
        <p className="mt-2 text-base text-[#5C3826]">
          Transistor silicon physics &amp; power magnetics bridged with modern high-velocity web engineering.
        </p>
      </div>

      {/* Dual Stationery Sheets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Track A: Silicon & Power */}
        <div className="paper-sheet paper-sheet-hover p-6 sm:p-8 rounded-[28px] border border-[#EBDFCD] bg-[#FBF8F2] relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white border border-[#EBDFCD] text-[#8C5E14] shadow-sm">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2E241E]">Silicon, VLSI &amp; Power</h3>
                <p className="text-xs font-mono text-[#8C5E14] font-semibold">HARDWARE &amp; MAGNETICS TRACK</p>
              </div>
            </div>
            <MosfetSymbol size={32} color="#8C5E14" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CAPABILITIES.siliconAndPower.map((skill, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-[#EBDFCD] hover:border-[#8C5E14]/40 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#2E241E]">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF6F0] text-[#8C5E14] border border-[#EBDFCD]">
                    {skill.level}
                  </span>
                </div>
                <p className="text-[11px] text-[#5C3826] leading-tight">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#EBDFCD] flex flex-wrap gap-2 text-xs font-mono text-[#5C3826]">
            <span className="text-[#8C5E14] font-bold">EDA &amp; Tools:</span>
            <span>Vivado · LTspice · NGSpice · GTKWave · Ansys Maxwell · MATLAB</span>
          </div>
        </div>

        {/* Track B: Vibe-Coding & Developer Platforms */}
        <div className="paper-sheet paper-sheet-hover p-6 sm:p-8 rounded-[28px] border border-[#EBDFCD] bg-[#FBF8F2] relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white border border-[#EBDFCD] text-[#0369A1] shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2E241E]">Vibe Coding &amp; Platforms</h3>
                <p className="text-xs font-mono text-[#0369A1] font-semibold">SOFTWARE &amp; AGENTIC WORKFLOWS</p>
              </div>
            </div>
            <LogicGateSymbol size={32} color="#0369A1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CAPABILITIES.vibeCodingAndApps.map((skill, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-[#EBDFCD] hover:border-[#0369A1]/40 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#2E241E]">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF6F0] text-[#0369A1] border border-[#EBDFCD]">
                    {skill.level}
                  </span>
                </div>
                <p className="text-[11px] text-[#5C3826] leading-tight">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#EBDFCD] flex flex-wrap gap-2 text-xs font-mono text-[#5C3826]">
            <span className="text-[#0369A1] font-bold">Stack:</span>
            <span>Astro 5 · React 19 · TypeScript · Tailwind CSS v4 · GSAP · GitHub Pages</span>
          </div>
        </div>
      </div>
    </section>
  );
};
