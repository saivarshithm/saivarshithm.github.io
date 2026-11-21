import React from 'react';
import { TIMELINE_EXPERIENCE } from '../data/projects';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3 backdrop-blur-md">
          <Briefcase className="w-3.5 h-3.5" />
          <span>RESEARCH &amp; LEADERSHIP</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          Milestones &amp; Journey
        </h2>
        <p className="mt-2 text-base text-zinc-400">
          Research fellowship at ISRO Satellite Centre, academic excellence at NITK Surathkal, and executive engineering leadership.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
        {TIMELINE_EXPERIENCE.map((item, idx) => {
          return (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full border-4 border-[#080A0D] bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)] group-hover:scale-125 transition-transform" />

              <div className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#10141B] shadow-[0_12px_32px_rgba(0,0,0,0.5)] group-hover:border-emerald-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </span>

                  <span className="font-mono text-xs px-3 py-0.5 rounded-full bg-white/5 text-amber-400 border border-white/10 font-bold shadow-sm w-fit">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.role}
                </h3>
                
                <div className="text-sm font-semibold text-zinc-300 mt-1 flex flex-wrap items-center gap-2">
                  <span>{item.organization}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {item.location}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-zinc-400">
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
