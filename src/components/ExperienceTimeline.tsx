import React from 'react';
import { TIMELINE_EXPERIENCE } from '../data/projects';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6F0] border border-[#EBDFCD] text-xs font-semibold tracking-widest text-[#8C5E14] uppercase mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>RESEARCH &amp; LEADERSHIP</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2E241E]">
          Milestones &amp; Journey
        </h2>
        <p className="mt-2 text-base text-[#5C3826]">
          Research fellowship at ISRO Satellite Centre, academic excellence at NITK Surathkal, and executive engineering leadership.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-[#D9C6AC] ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
        {TIMELINE_EXPERIENCE.map((item, idx) => {
          return (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full border-4 border-[#F5EFE6] bg-[#8C5E14] shadow-sm group-hover:scale-125 transition-transform" />

              <div className="paper-sheet paper-sheet-hover p-6 sm:p-7 rounded-[26px] border border-[#EBDFCD] bg-[#FBF8F2] shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold text-[#8C5E14] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </span>

                  <span className="font-mono text-xs px-3 py-0.5 rounded-full bg-white text-[#2E241E] border border-[#EBDFCD] font-bold shadow-sm w-fit">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#2E241E] group-hover:text-[#8C5E14] transition-colors">
                  {item.role}
                </h3>
                
                <div className="text-sm font-semibold text-[#5C3826] mt-1 flex flex-wrap items-center gap-2">
                  <span>{item.organization}</span>
                  <span>·</span>
                  <span className="text-xs text-[#8C5E14] flex items-center gap-1 font-mono">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-[#5C3826]">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C5E14] mt-2 shrink-0" />
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
