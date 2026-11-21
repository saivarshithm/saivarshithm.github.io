import React, { useEffect } from 'react';
import type { Project } from '../data/projects';
import { 
  X, 
  Github, 
  ExternalLink, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Wrench, 
  Activity,
  Terminal,
  Zap
} from 'lucide-react';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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

  const accentColor =
    project.category === 'silicon'
      ? '#10B981'
      : project.category === 'power'
      ? '#F59E0B'
      : '#38BDF8';

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <div
        className="w-full max-w-2xl h-full bg-[#10141B] border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), -10px 0 40px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-[#0C1017]/95 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-mono text-xs uppercase tracking-wider text-gray-400">
              {project.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all tap-target"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* Title & Subtitle */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: accentColor }}>
              {project.subtitle}
            </div>
            <h2 id="drawer-title" className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight">
              {project.title}
            </h2>
          </div>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between"
              >
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-sm font-mono font-bold text-white mt-1">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Deep Architectural Breakdown */}
          {project.longDescription && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>System Architecture &amp; Theory</span>
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {project.longDescription}
              </p>
            </div>
          )}

          {/* Architecture / Pipeline ASCII Diagram */}
          {project.architectureDiagram && (
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                <span>Signal Flow &amp; Stage Interconnect</span>
              </h3>
              <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed shadow-inner">
                {project.architectureDiagram}
              </pre>
            </div>
          )}

          {/* Key Achievements */}
          {project.keyAchievements && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Key Verifications &amp; Benchmarks</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                {project.keyAchievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools & EDA Stack */}
          {project.toolsUsed && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-gray-400" />
                <span>EDA Tools &amp; Hardware Frameworks</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-gray-300 border border-white/10"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-[#0C1017] px-6 py-4 border-t border-white/10 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-mono text-gray-400 hover:text-white transition-colors tap-target"
          >
            Close (Esc)
          </button>

          <div className="flex items-center gap-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target px-4 py-2 rounded-xl text-xs font-mono text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target px-4 py-2 rounded-xl text-xs font-mono text-black font-bold bg-sky-400 hover:bg-sky-300 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
              >
                <span>Launch App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
