import React from 'react';
import { BenchInteractiveWidget } from './BenchInteractiveWidget';
import { Github, ArrowDown, Sparkles } from 'lucide-react';
import { MosfetSymbol, LogicGateSymbol } from './SchematicSymbols';
import { PROFILE_INFO } from '../data/projects';

export const HeroBench: React.FC = () => {
  return (
    <section
      id="bench"
      className="relative min-h-[100dvh] pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-center"
    >
      {/* Top Tracked-Out Category Badge */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#EBDFCD] shadow-[0_2px_8px_rgba(74,48,26,0.06)] text-xs font-semibold tracking-widest text-[#8C5E14] uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>NITK SURATHKAL · EX-ISRO URSC RESEARCH INTERN</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#2E241E] leading-[1.04] max-w-4xl">
          Saivarshith Mitukula
        </h1>

        {/* Tagline / Subtitle */}
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-[#5C3826] max-w-2xl font-normal leading-relaxed">
          Engineering <span className="font-semibold text-[#2E241E] underline decoration-[#8C5E14]/40 decoration-2 underline-offset-4">digital silicon &amp; space-grade power</span> by day, vibe-coding <span className="font-semibold text-[#2E241E] underline decoration-sky-400/40 decoration-2 underline-offset-4">fast software platforms</span> by night.
        </p>

        {/* CTA Buttons in EdgeDrop Pill Style */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#flagships"
            className="black-pill-button px-6 py-3 text-sm font-medium tap-target flex items-center gap-2"
          >
            <span>Explore Engineering</span>
            <ArrowDown className="w-4 h-4 text-emerald-400" />
          </a>

          <a
            href="https://github.com/saivarshithm"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button px-5 py-3 text-sm font-semibold tap-target flex items-center gap-2"
          >
            <Github className="w-4 h-4 text-[#2E241E]" />
            <span>GitHub (@saivarshithm)</span>
          </a>

          <a
            href="https://filevault.cc"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button px-5 py-3 text-sm font-semibold tap-target flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#8C5E14]" />
            <span>FileVault.cc</span>
          </a>
        </div>
      </div>

      {/* Tactile Workbench Stage: Photo Print + Sticky Notes */}
      <div className="relative mt-8 mb-10 flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Pastel Amber Post-It Note (Left) */}
        <div className="hidden lg:block w-52 p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] shadow-[0_10px_25px_-5px_rgba(146,64,14,0.15)] rotate-[-3deg] hover:rotate-0 transition-transform">
          <div className="text-xs uppercase font-mono tracking-wider text-[#92400E] font-bold">
            Hardware Desk ⚡
          </div>
          <p className="mt-1 text-base text-[#78350F] handwritten font-bold">
            &ldquo;RV32IM RISC-V pipelined core with 1.57 CPI + ISRO 100kHz space converters.&rdquo;
          </p>
          <div className="text-right text-xs text-[#92400E] handwritten mt-1">
            Verified in Silicon ⤦
          </div>
        </div>

        {/* Tactile Desk Photo Print with Brass Clip */}
        <div className="relative group">
          {/* Golden Brass Clip Graphic */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-8 h-8 pointer-events-none">
            <svg viewBox="0 0 32 32" fill="none" className="w-full h-full drop-shadow-md">
              <path
                d="M10 6C10 3.79086 11.7909 2 14 2H18C20.2091 2 22 3.79086 22 6V24C22 27.3137 19.3137 30 16 30C12.6863 30 10 27.3137 10 24V10C10 8.34315 11.3431 7 13 7C14.6569 7 16 8.34315 16 10V22"
                stroke="#D97706"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="bg-white p-3 pb-5 rounded-2xl shadow-[0_20px_45px_-12px_rgba(74,48,26,0.22)] border border-[#EBDFCD] rotate-[1deg] group-hover:rotate-0 transition-transform duration-300 max-w-[240px] sm:max-w-[270px]">
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#EBDFCD]">
              <img
                src="/saivarshith.jpg"
                alt="Saivarshith Mitukula"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
            </div>
            <div className="mt-2.5 text-center">
              <span className="handwritten text-xl font-bold text-[#2E241E]">
                Saivarshith Mitukula
              </span>
              <div className="text-[11px] font-mono text-[#8C5E14]">
                EEE @ NITK Surathkal &apos;27
              </div>
            </div>
          </div>
        </div>

        {/* Pastel Sky Blue Post-It Note (Right) */}
        <div className="hidden lg:block w-52 p-4 rounded-xl bg-[#E0F2FE] border border-[#BAE6FD] shadow-[0_10px_25px_-5px_rgba(3,105,161,0.15)] rotate-[3deg] hover:rotate-0 transition-transform">
          <div className="text-xs uppercase font-mono tracking-wider text-[#0369A1] font-bold">
            Vibe-Coding 🚀
          </div>
          <p className="mt-1 text-base text-[#075985] handwritten font-bold">
            &ldquo;Astro 5 + React 19 + GSAP. Zero latency search for 500+ NITK students.&rdquo;
          </p>
          <div className="text-right text-xs text-[#0369A1] handwritten mt-1">
            Built with Love ⤦
          </div>
        </div>
      </div>

      {/* The Oscilloscope & App Preview Widget (Stationery Lab Instrument) */}
      <div className="mt-4">
        <BenchInteractiveWidget />
      </div>
    </section>
  );
};
