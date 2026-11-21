import React, { useEffect } from 'react';
import type { FlagshipProject } from '../data/projects';
import { X, ExternalLink, Github, Cpu, Zap, CheckCircle2, Terminal } from 'lucide-react';

interface ProjectDrawerProps {
  project: FlagshipProject | null;
  onClose: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-stretch justify-end bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Mobile Slide-Up Bottom Sheet (< 768px) & Desktop Slide-Over Drawer (>= 768px) */}
      <div
        className="w-full md:max-w-xl max-h-[88vh] md:max-h-full rounded-t-2xl md:rounded-none md:rounded-l-2xl border-t md:border-t-0 md:border-l border-white/10 bg-[#111216] shadow-2xl flex flex-col text-left overflow-hidden"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0c0d10]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              {project.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors tap-target"
            aria-label="Close project drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Container */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-[#F4F4F5] no-scrollbar">
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-zinc-400 font-mono">
              {project.subtitle}
            </p>
          </div>

          {/* Key Metric Grid */}
          <div className="grid grid-cols-2 gap-2.5 font-mono">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="block text-[10px] text-zinc-500 uppercase">{m.label}</span>
                <span className="block text-sm font-bold text-emerald-400 mt-0.5">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Deep Description */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
              System Specification
            </h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              {project.longDescription}
            </p>
          </div>

          {/* Architecture Diagram */}
          {project.architectureDiagram && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>Architecture Topology</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#09090B] border border-white/10 font-mono text-[11px] sm:text-xs text-sky-300 overflow-x-auto no-scrollbar whitespace-pre leading-relaxed">
                {project.architectureDiagram}
              </div>
            </div>
          )}

          {/* Key Achievements */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Key Engineering Deliverables
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              {project.keyAchievements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Frameworks */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Toolchains &amp; Verification Environment
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.toolsUsed.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-300 text-xs font-mono border border-white/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#0c0d10] flex items-center justify-between gap-3">
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
            saivarshithm.dev
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 transition-colors tap-target"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Repository</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 text-xs font-mono transition-colors tap-target"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
