import React, { useState } from 'react';
import { FLAGSHIP_PROJECTS, type Project } from '../data/projects';
import { ProjectDrawer } from './ProjectDrawer';
import { 
  RiscvCoreSymbol, 
  BuckConverterSymbol, 
  LogicGateSymbol, 
  WptCoilSymbol, 
  MosfetSymbol,
  InductorWaveform 
} from './SchematicSymbols';
import { Github, Cpu, Code2, ArrowUpRight, Maximize2 } from 'lucide-react';

export const FlagshipBento: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'silicon' | 'software'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = FLAGSHIP_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'silicon') return p.category === 'silicon' || p.category === 'power';
    if (activeFilter === 'software') return p.category === 'software';
    return true;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const getSchematicIcon = (type?: string) => {
    switch (type) {
      case 'riscv':
        return <RiscvCoreSymbol size={36} color="#10B981" />;
      case 'buck':
        return <BuckConverterSymbol size={36} color="#F59E0B" />;
      case 'cmos':
        return <LogicGateSymbol size={36} color="#10B981" />;
      case 'wpt':
        return <WptCoilSymbol size={36} color="#F59E0B" />;
      case 'uart':
        return <MosfetSymbol size={36} color="#38BDF8" />;
      default:
        return <Code2 size={36} className="text-sky-400" />;
    }
  };

  return (
    <section id="flagships" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>PRIMARY HARDWARE &amp; SOFTWARE SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
            Flagship Case Studies
          </h2>
          <p className="mt-2 text-base text-gray-400 max-w-xl">
            From synthesizable RISC-V RTL and space-grade power topologies to high-velocity developer platforms.
          </p>
        </div>

        {/* Tactile Mode Switcher Pill */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#0D1117] border border-white/10 shadow-lg self-start md:self-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 tap-target ${
              activeFilter === 'all'
                ? 'bg-white text-black shadow-md font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ALL SYSTEMS
          </button>
          <button
            onClick={() => setActiveFilter('silicon')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 tap-target ${
              activeFilter === 'silicon'
                ? 'bg-emerald-500 text-black shadow-md font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            SILICON &amp; POWER
          </button>
          <button
            onClick={() => setActiveFilter('software')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 tap-target ${
              activeFilter === 'software'
                ? 'bg-sky-400 text-black shadow-md font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            VIBE-CODED APPS
          </button>
        </div>
      </div>

      {/* 12-Column Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {filteredProjects.map((project, index) => {
          const isLarge = index === 0 || index === 1;
          const colSpan = isLarge ? 'lg:col-span-6' : 'lg:col-span-4';

          const accentColor =
            project.category === 'silicon'
              ? 'emerald'
              : project.category === 'power'
              ? 'amber'
              : 'sky';

          return (
            <div
              key={project.id}
              onMouseMove={handleMouseMove}
              onClick={() => setSelectedProject(project)}
              className={`${colSpan} relative rounded-2xl card-glass spotlight-card p-6 sm:p-7 flex flex-col justify-between overflow-hidden group cursor-pointer transition-all duration-300 card-glass-hover`}
              style={{
                background: `radial-gradient(500px circle at var(--mouse-x, 100px) var(--mouse-y, 100px), ${
                  accentColor === 'emerald'
                    ? 'rgba(16, 185, 129, 0.08)'
                    : accentColor === 'amber'
                    ? 'rgba(245, 158, 11, 0.08)'
                    : 'rgba(56, 189, 248, 0.08)'
                }, transparent 70%), #10141B`
              }}
            >
              {/* Top Highlight Specular Edge */}
              <div 
                className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
                  accentColor === 'emerald'
                    ? 'bg-gradient-to-r from-emerald-500/0 via-emerald-500/80 to-emerald-500/0 opacity-40 group-hover:opacity-100'
                    : accentColor === 'amber'
                    ? 'bg-gradient-to-r from-amber-500/0 via-amber-500/80 to-amber-500/0 opacity-40 group-hover:opacity-100'
                    : 'bg-gradient-to-r from-sky-400/0 via-sky-400/80 to-sky-400/0 opacity-40 group-hover:opacity-100'
                }`}
              />

              <div>
                {/* Header Row: Schematic Symbol & Status Badge */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 shadow-inner group-hover:scale-105 transition-transform">
                    {getSchematicIcon(project.schematicType)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[11px] px-2.5 py-1 rounded-full border ${
                        accentColor === 'emerald'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : accentColor === 'amber'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-sky-400/10 text-sky-400 border-sky-400/30'
                      }`}
                    >
                      {project.status}
                    </span>
                    <button
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      title="Inspect full case study"
                      aria-label="Inspect project architecture"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subtitle & Title */}
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  {project.subtitle}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-sm text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Hardware / Software Telemetry Grid */}
                <div className="mt-5 grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="bg-white/[0.02] p-2 rounded-lg border border-white/5">
                      <div className="text-[10px] font-mono text-gray-400 uppercase">{m.label}</div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tags and Direct Links */}
              <div 
                className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all tap-target"
                  >
                    <span>Architecture</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>

                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all tap-target"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-sky-400 bg-sky-400/10 hover:bg-sky-400/20 border border-sky-400/30 transition-all tap-target"
                      aria-label={`Launch ${project.title}`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case-Study Slide-Over Detail Drawer */}
      <ProjectDrawer 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};
