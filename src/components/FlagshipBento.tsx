import React, { useState } from 'react';
import { FLAGSHIP_PROJECTS, type Project } from '../data/projects';
import { 
  RiscvCoreSymbol, 
  BuckConverterSymbol, 
  LogicGateSymbol, 
  WptCoilSymbol, 
  MosfetSymbol,
  InductorWaveform 
} from './SchematicSymbols';
import { Github, Cpu, Code2, ArrowUpRight } from 'lucide-react';

export const FlagshipBento: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'silicon' | 'software'>('all');

  const filteredProjects = FLAGSHIP_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'silicon') return p.category === 'silicon' || p.category === 'power';
    if (activeFilter === 'software') return p.category === 'software';
    return true;
  });

  const getSchematicIcon = (type?: string) => {
    switch (type) {
      case 'riscv':
        return <RiscvCoreSymbol size={34} color="#8C5E14" />;
      case 'buck':
        return <BuckConverterSymbol size={34} color="#B45309" />;
      case 'cmos':
        return <LogicGateSymbol size={34} color="#15803D" />;
      case 'wpt':
        return <WptCoilSymbol size={34} color="#B45309" />;
      case 'uart':
        return <MosfetSymbol size={34} color="#0369A1" />;
      default:
        return <Code2 size={34} className="text-[#8C5E14]" />;
    }
  };

  return (
    <section id="flagships" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6F0] border border-[#EBDFCD] text-xs font-semibold tracking-widest text-[#8C5E14] uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>PRIMARY HARDWARE &amp; SOFTWARE WORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2E241E]">
            Flagship Engineering
          </h2>
          <p className="mt-2 text-base text-[#5C3826] max-w-xl">
            From synthesizable RISC-V RTL and space-grade power converters to high-velocity student software platforms.
          </p>
        </div>

        {/* EdgeDrop Tactile Mode Switcher Pill */}
        <div className="inline-flex p-1.5 rounded-full bg-[#EFE8DC] border border-[#EBDFCD] shadow-sm self-start md:self-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 tap-target ${
              activeFilter === 'all'
                ? 'bg-[#171615] text-white shadow-md'
                : 'text-[#5C3826] hover:text-[#2E241E]'
            }`}
          >
            All Systems
          </button>
          <button
            onClick={() => setActiveFilter('silicon')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 tap-target ${
              activeFilter === 'silicon'
                ? 'bg-[#171615] text-white shadow-md'
                : 'text-[#5C3826] hover:text-[#2E241E]'
            }`}
          >
            Silicon &amp; Power
          </button>
          <button
            onClick={() => setActiveFilter('software')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 tap-target ${
              activeFilter === 'software'
                ? 'bg-[#171615] text-white shadow-md'
                : 'text-[#5C3826] hover:text-[#2E241E]'
            }`}
          >
            Vibe-Coded Apps
          </button>
        </div>
      </div>

      {/* 12-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {filteredProjects.map((project, index) => {
          const isLarge = index === 0 || index === 1;
          const colSpan = isLarge ? 'lg:col-span-6' : 'lg:col-span-4';
          const watermarkNum = String(index + 1).padStart(2, '0');

          return (
            <div
              key={project.id}
              className={`${colSpan} relative paper-sheet paper-sheet-hover p-6 sm:p-7 flex flex-col justify-between overflow-hidden group`}
            >
              {/* Giant Watermark Numeral */}
              <div className="absolute top-2 right-4 text-[110px] sm:text-[130px] font-black text-[#3B281B]/[0.04] leading-none pointer-events-none select-none font-mono">
                {watermarkNum}
              </div>

              <div className="relative z-10">
                {/* Header Row: Schematic Icon & Status Pill */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-white border border-[#EBDFCD] shadow-sm group-hover:scale-105 transition-transform">
                    {getSchematicIcon(project.schematicType)}
                  </div>

                  <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-white text-[#8C5E14] border border-[#EBDFCD] font-medium shadow-sm">
                    {project.status}
                  </span>
                </div>

                {/* Subtitle & Title */}
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C5E14] font-bold mb-1">
                  {project.subtitle}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2E241E] group-hover:text-[#8C5E14] transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#5C3826] leading-relaxed">
                  {project.description}
                </p>

                {/* Grounded Dark Hardware/Software Telemetry Box */}
                <div className="mt-5 grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#171615] text-white shadow-inner">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-1.5">
                      <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                        {m.label}
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tags and Buttons */}
              <div className="relative z-10 mt-6 pt-4 border-t border-[#EBDFCD] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-[#5C3826] border border-[#EBDFCD]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#2E241E] bg-white hover:bg-[#FAF6F0] border border-[#EBDFCD] transition-all shadow-sm tap-target"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>RTL / Code</span>
                    </a>
                  )}

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="black-pill-button px-3.5 py-1.5 text-xs font-mono flex items-center gap-1.5 tap-target"
                      aria-label={`Launch ${project.title}`}
                    >
                      <span>Live App</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
