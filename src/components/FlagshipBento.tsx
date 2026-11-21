import React, { useState, useMemo } from 'react';
import { FLAGSHIP_PROJECTS, type FlagshipProject } from '../data/projects';
import { ProjectDrawer } from './ProjectDrawer';
import { ExternalLink, Github, Cpu, Zap, Layers, ArrowUpRight } from 'lucide-react';

export const FlagshipBento: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'silicon' | 'power' | 'software'>('all');
  const [selectedProject, setSelectedProject] = useState<FlagshipProject | null>(null);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return FLAGSHIP_PROJECTS;
    return FLAGSHIP_PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="flagships" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header & Domain Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>~/saivarshithm/flagships</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F4F4F5] tracking-tight">
            Flagship Hardware &amp; Systems
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Synthesizable RISC-V cores, space-grade power converters, and high-precision VLSI layouts.
          </p>
        </div>

        {/* Filter Pills: Horizontal scrollable on mobile with no-scrollbar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Systems' },
            { id: 'silicon', label: 'Silicon & RTL' },
            { id: 'power', label: 'Power & Analog' },
            { id: 'software', label: 'Software & Tools' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap tap-target ${
                filter === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Single-col on mobile (<768px), 2-col Bento on desktop (>=1024px) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((project) => {
          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-[#111216] p-6 hover:border-emerald-500/40 hover:bg-[#14161c] transition-all flex flex-col justify-between shadow-lg relative"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {project.status}
                  </span>
                  <div className="flex items-center gap-1 text-zinc-400 group-hover:text-emerald-400 transition-colors">
                    <span className="text-[11px] font-mono hidden sm:inline">Inspect Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors font-sans leading-snug">
                  {project.title}
                </h3>

                {/* Subtitle */}
                <p className="mt-1 text-xs font-mono text-zinc-400">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Bottom Metrics Strip & Tags */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 gap-2 mb-3 font-mono text-xs">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                      <span className="block text-[10px] text-zinc-500 uppercase">{m.label}</span>
                      <span className="block text-xs font-bold text-zinc-200 mt-0.5">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors tap-target"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-Up Bottom Sheet (Mobile) / Slide-Over Drawer (Desktop) */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
