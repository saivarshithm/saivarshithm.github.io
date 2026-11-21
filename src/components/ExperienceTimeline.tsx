import React from 'react';
import { TIMELINE_EXPERIENCE } from '../data/projects';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>RESEARCH &amp; INSTITUTIONAL LEADERSHIP</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
          Experience &amp; Milestones
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Research fellowship at the Indian Space Research Organisation, academic rigor at NITK Surathkal, and technical leadership.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-12">
        {TIMELINE_EXPERIENCE.map((item, idx) => {
          const accentColor =
            item.accent === 'amber'
              ? 'text-amber-400 border-amber-500/40 bg-amber-500/10'
              : item.accent === 'emerald'
              ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
              : 'text-sky-400 border-sky-500/40 bg-sky-500/10';

          const dotColor =
            item.accent === 'amber'
              ? 'bg-amber-400 ring-amber-400/30'
              : item.accent === 'emerald'
              ? 'bg-emerald-400 ring-emerald-400/30'
              : 'bg-sky-400 ring-sky-400/30';

          return (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-[#080A0D] ${dotColor} ring-4 transition-transform group-hover:scale-125`}
              />

              <div className="card-glass rounded-2xl p-6 sm:p-7 border border-white/10 card-glass-hover">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs text-gray-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {item.period}
                  </span>

                  <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full border w-fit ${accentColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-display group-hover:text-amber-300 transition-colors">
                  {item.role}
                </h3>
                
                <div className="text-sm font-medium text-gray-300 mt-1 flex flex-wrap items-center gap-2">
                  <span>{item.organization}</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {item.location}
                  </span>
                </div>

                {/* Key Achievements Bullet points */}
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-gray-300">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
