import React, { useState, useEffect, useRef } from 'react';
import { Activity, Sliders, Sparkles, Search, BookOpen, ExternalLink } from 'lucide-react';

export const BenchInteractiveWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scope' | 'app'>('scope');

  // Oscilloscope state
  const [frequency, setFrequency] = useState<number>(100); // kHz
  const [dutyCycle, setDutyCycle] = useState<number>(50); // %
  const [waveType, setWaveType] = useState<'pwm' | 'sine' | 'ripple'>('pwm');

  // App preview state
  const [courseQuery, setCourseQuery] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  // Oscilloscope canvas animation loop
  useEffect(() => {
    if (activeTab !== 'scope') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark CRT screen inside warm instrument bezel
      ctx.fillStyle = '#090D12';
      ctx.fillRect(0, 0, width, height);

      // Oscilloscope Graticule
      const divX = width / 10;
      const divY = height / 8;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.09)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x <= width; x += divX) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += divY) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Center crosshair graticule sub-ticks
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
      const midX = width / 2;
      const midY = height / 2;
      ctx.beginPath();
      ctx.moveTo(midX, 0);
      ctx.lineTo(midX, height);
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      // Main Phosphor Waveform
      ctx.beginPath();
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2.4;
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 12;

      const cyclesOnScreen = (frequency / 25);
      const dutyNorm = dutyCycle / 100;
      const amplitude = height * 0.28;

      for (let x = 0; x < width; x += 2) {
        const t = (x / width) * cyclesOnScreen + phaseRef.current;
        let y = midY;

        if (waveType === 'pwm') {
          const cyclePos = t % 1;
          const high = cyclePos < dutyNorm;
          y = high ? midY - amplitude : midY + amplitude;
        } else if (waveType === 'sine') {
          y = midY - Math.sin(t * Math.PI * 2) * amplitude;
        } else {
          const cyclePos = t % 1;
          const ramp = cyclePos < dutyNorm 
            ? (cyclePos / dutyNorm) * 2 - 1 
            : 1 - ((cyclePos - dutyNorm) / (1 - dutyNorm)) * 2;
          y = midY - ramp * amplitude;
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Ghost analog persistence trace
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 16;
      ctx.stroke();
      ctx.shadowBlur = 0;

      phaseRef.current += (frequency / 100) * 0.04;
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activeTab, frequency, dutyCycle, waveType]);

  const courses = [
    { code: 'EE200', title: 'Digital System Design & Verilog', dept: 'EEE', notes: '42 Files', badge: 'RISC-V Labs' },
    { code: 'EE310', title: 'Power Electronics & Converters', dept: 'EEE', notes: '38 Files', badge: 'LTspice Models' },
    { code: 'EE250', title: 'Signals, Systems & DSP', dept: 'EEE', notes: '29 Files', badge: 'MATLAB Scripts' },
    { code: 'CS204', title: 'Computer Architecture & Microprocessors', dept: 'CSE', notes: '35 Files', badge: 'Pipeline Hazards' },
    { code: 'EC320', title: 'VLSI Design & SKY130 Tapeout', dept: 'ECE', notes: '31 Files', badge: 'SPICE Netlists' }
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesDept = selectedDept === 'All' || c.dept === selectedDept;
    const matchesQuery = c.code.toLowerCase().includes(courseQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(courseQuery.toLowerCase()) ||
      c.badge.toLowerCase().includes(courseQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  const vIn = 24.0;
  const vOut = (vIn * (dutyCycle / 100)).toFixed(2);

  return (
    <div className="w-full paper-sheet rounded-[28px] overflow-hidden border border-[#EBDFCD] bg-[#FBF8F2] shadow-[0_20px_50px_-20px_rgba(74,48,26,0.18)]">
      {/* Instrumentation Header Bar */}
      <div className="bg-[#FAF6F0] px-4 sm:px-6 py-3.5 border-b border-[#EBDFCD] flex flex-wrap items-center justify-between gap-3">
        {/* Dual Tab Mode Switcher Pill */}
        <div className="inline-flex p-1 rounded-full bg-[#EFE8DC] border border-[#EBDFCD]">
          <button
            onClick={() => setActiveTab('scope')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 transition-all ${
              activeTab === 'scope'
                ? 'bg-[#171615] text-white shadow-sm'
                : 'text-[#5C3826] hover:text-[#2E241E]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Oscilloscope (100 kHz)</span>
          </button>
          <button
            onClick={() => setActiveTab('app')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 transition-all ${
              activeTab === 'app'
                ? 'bg-[#171615] text-white shadow-sm'
                : 'text-[#5C3826] hover:text-[#2E241E]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>FileVault Platform</span>
          </button>
        </div>

        {/* Bench Clock Tag */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#5C3826]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">BENCH CLOCK:</span>
          <span className="text-[#2E241E] font-bold">{frequency} kHz</span>
        </div>
      </div>

      {/* Main Interactive Body */}
      {activeTab === 'scope' ? (
        <div className="p-4 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* CRT Screen */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#1E232A] bg-black h-56 sm:h-64 shadow-[inset_0_0_40px_rgba(16,185,129,0.18)]">
              <canvas ref={canvasRef} className="w-full h-full block" />
              
              {/* OSD Telemetry */}
              <div className="absolute top-3 left-3.5 font-mono text-[10px] sm:text-xs text-emerald-400/90 flex gap-4 pointer-events-none">
                <span>CH1: 2.0V/DIV</span>
                <span>TIME: 2.0µs/DIV</span>
                <span>TRIG: AUTO</span>
              </div>
              <div className="absolute bottom-3 right-3.5 font-mono text-[10px] sm:text-xs text-emerald-400/90 pointer-events-none">
                <span>Vpp: 5.00V · Vavg: {vOut}V</span>
              </div>
            </div>

            {/* Waveform Selector */}
            <div className="flex items-center justify-between text-xs pt-1 px-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#5C3826]">
                <Sliders className="w-3.5 h-3.5 text-[#8C5E14]" />
                <span>Waveform Type:</span>
              </div>
              <div className="flex gap-1.5">
                {(['pwm', 'sine', 'ripple'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setWaveType(type)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                      waveType === type
                        ? 'bg-[#171615] text-white'
                        : 'bg-[#EFE8DC] text-[#5C3826] hover:bg-[#EBDFCD]'
                    }`}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls & Filter Specs */}
          <div className="lg:col-span-4 flex flex-col gap-4 bg-[#FAF6F0] p-5 rounded-2xl border border-[#EBDFCD]">
            <div className="text-xs font-mono text-[#8C5E14] uppercase tracking-wider font-bold flex items-center justify-between">
              <span>PWM SYNTHESIZER</span>
              <span className="text-[#2E241E] font-bold">{dutyCycle}% DUTY</span>
            </div>

            {/* Duty Cycle Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-[#5C3826]">
                <span>Duty Cycle</span>
                <span className="text-[#2E241E] font-bold">{dutyCycle}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={dutyCycle}
                onChange={(e) => setDutyCycle(Number(e.target.value))}
                className="w-full accent-[#2E241E] cursor-pointer h-2 bg-[#EBDFCD] rounded-lg"
              />
            </div>

            {/* Frequency Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-[#5C3826]">
                <span>Switching Frequency</span>
                <span className="text-[#2E241E] font-bold">{frequency} kHz</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="10"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full accent-[#2E241E] cursor-pointer h-2 bg-[#EBDFCD] rounded-lg"
              />
            </div>

            {/* Spec Box */}
            <div className="pt-3 border-t border-[#EBDFCD] space-y-2 font-mono text-xs">
              <div className="flex justify-between text-[#5C3826]">
                <span>Input Voltage (Vin):</span>
                <span className="text-[#2E241E] font-bold">24.0 V</span>
              </div>
              <div className="flex justify-between text-[#5C3826]">
                <span>Regulated Vout:</span>
                <span className="text-emerald-700 font-bold">{vOut} V</span>
              </div>
              <div className="flex justify-between text-[#5C3826]">
                <span>LC Resonant Pole:</span>
                <span className="text-sky-700 font-bold">142.3 kHz</span>
              </div>
              <div className="flex justify-between text-[#5C3826]">
                <span>Estimated Ripple:</span>
                <span className="text-[#8C5E14] font-bold">&lt; 18.5 mV</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* FileVault App Interactive Mock */
        <div className="p-4 sm:p-6 lg:p-7 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#2E241E]">FileVault NITK</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-800 border border-sky-200">
                  Production · filevault.cc
                </span>
              </div>
              <p className="text-xs text-[#5C3826] mt-0.5">
                Centralized academic resource repository for NITK Surathkal with sub-millisecond query speed.
              </p>
            </div>

            <a
              href="https://filevault.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2E241E] bg-[#FAF6F0] hover:bg-white border border-[#EBDFCD] transition-all w-fit shadow-sm"
            >
              <span>Visit filevault.cc</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8C5E14]" />
            </a>
          </div>

          {/* Search & Dept Filters */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C5E14]" />
              <input
                type="text"
                placeholder="Search courses, notes, or topics (e.g. RISC-V, SPICE, Power)..."
                value={courseQuery}
                onChange={(e) => setCourseQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#EBDFCD] rounded-2xl text-xs text-[#2E241E] placeholder-[#5C3826]/60 focus:outline-none focus:border-[#8C5E14] transition-all font-mono shadow-sm"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['All', 'EEE', 'CSE', 'ECE'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedDept === dept
                      ? 'bg-[#171615] text-white shadow-sm'
                      : 'bg-[#FAF6F0] text-[#5C3826] hover:bg-white border border-[#EBDFCD]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-56 overflow-y-auto pr-1">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((c) => (
                <div
                  key={c.code}
                  className="p-3.5 rounded-2xl bg-white border border-[#EBDFCD] hover:border-[#8C5E14]/40 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-[#8C5E14]">{c.code}</span>
                      <span className="text-[10px] font-mono text-[#5C3826] bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#EBDFCD]">
                        {c.dept}
                      </span>
                    </div>
                    <div className="text-xs text-[#2E241E] font-semibold line-clamp-1">{c.title}</div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#EBDFCD]/60 flex items-center justify-between text-[11px] font-mono text-[#5C3826]">
                    <span className="text-emerald-700">{c.badge}</span>
                    <span className="flex items-center gap-1 font-semibold text-[#2E241E]">
                      <BookOpen className="w-3 h-3 text-[#8C5E14]" />
                      {c.notes}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-xs font-mono text-[#5C3826]">
                No matching courses found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
