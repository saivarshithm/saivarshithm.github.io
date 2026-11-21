import React, { useState, useEffect, useRef } from 'react';
import { Activity, Sliders, Sparkles, Search, BookOpen, ExternalLink, Zap } from 'lucide-react';

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

      // Dark CRT Screen
      ctx.fillStyle = '#080C10';
      ctx.fillRect(0, 0, width, height);

      // Oscilloscope Graticule
      const divX = width / 10;
      const divY = height / 8;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
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

      // Center crosshair graticule
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

      // Persistence glow trace
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
    <div className="w-full card-glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Instrumentation Header Bar */}
      <div className="bg-[#0C1017] px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Dual Tab Mode Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-black/50 border border-white/10">
            <button
              onClick={() => setActiveTab('scope')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                activeTab === 'scope'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>LIVE OSCILLOSCOPE (100 kHz)</span>
            </button>
            <button
              onClick={() => setActiveTab('app')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                activeTab === 'app'
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>FILEVAULT APP PREVIEW</span>
            </button>
          </div>
        </div>

        {/* Live Bench Status Tag */}
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">BENCH CLOCK:</span>
          <span className="text-emerald-400 font-bold">{frequency} kHz</span>
        </div>
      </div>

      {/* Main Interactive Body */}
      {activeTab === 'scope' ? (
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* CRT Screen */}
          <div className="lg:col-span-8 flex flex-col gap-2">
            <div className="relative rounded-xl overflow-hidden border border-emerald-500/25 bg-black h-56 sm:h-64 shadow-[inset_0_0_35px_rgba(16,185,129,0.15)]">
              <canvas ref={canvasRef} className="w-full h-full block" />
              
              {/* OSD Telemetry */}
              <div className="absolute top-2.5 left-3 font-mono text-[10px] sm:text-xs text-emerald-400/90 flex gap-4 pointer-events-none">
                <span>CH1: 2.0V/DIV</span>
                <span>TIME: 2.0µs/DIV</span>
                <span>TRIG: AUTO [50%]</span>
              </div>
              <div className="absolute bottom-2.5 right-3 font-mono text-[10px] sm:text-xs text-emerald-400/90 pointer-events-none">
                <span>Vpp: 5.00V · Vavg: {vOut}V</span>
              </div>
            </div>

            {/* Quick Waveform Mode Selectors */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-1.5 font-mono text-gray-400">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px]">WAVEFORM:</span>
              </div>
              <div className="flex gap-1.5 font-mono text-xs">
                {(['pwm', 'sine', 'ripple'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setWaveType(type)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      waveType === type
                        ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                        : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls & Filter Telemetry */}
          <div className="lg:col-span-4 flex flex-col gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
            <div className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center justify-between">
              <span>PWM SYNTHESIZER</span>
              <span className="text-emerald-400 font-semibold">{dutyCycle}% DUTY</span>
            </div>

            {/* Duty Cycle Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Duty Cycle</span>
                <span className="text-white font-bold">{dutyCycle}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={dutyCycle}
                onChange={(e) => setDutyCycle(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
              />
            </div>

            {/* Frequency Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Switching Freq</span>
                <span className="text-white font-bold">{frequency} kHz</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="10"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
              />
            </div>

            {/* Calculated LC Filter Metrics */}
            <div className="pt-2 border-t border-white/10 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Input Voltage (Vin):</span>
                <span className="text-gray-200">24.0 V</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Output Regulated (Vout):</span>
                <span className="text-emerald-400 font-bold">{vOut} V</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>LC Resonant Pole:</span>
                <span className="text-sky-400">142.3 kHz</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Estimated Ripple (ΔV):</span>
                <span className="text-amber-400">&lt; 18.5 mV</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* FileVault App Interactive Mock */
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white font-display">FileVault NITK</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  Production · filevault.cc
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Centralized academic resource repository for NITK Surathkal with sub-millisecond query speed.
              </p>
            </div>

            <a
              href="https://filevault.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 transition-all w-fit"
            >
              <span>Visit filevault.cc</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Search & Dept Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses, notes, or topics (e.g. RISC-V, SPICE, Power)..."
                value={courseQuery}
                onChange={(e) => setCourseQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition-all font-mono"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['All', 'EEE', 'CSE', 'ECE'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    selectedDept === dept
                      ? 'bg-sky-500 text-black font-semibold'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((c) => (
                <div
                  key={c.code}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-sky-400">{c.code}</span>
                      <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded-md">
                        {c.dept}
                      </span>
                    </div>
                    <div className="text-xs text-gray-200 font-medium line-clamp-1">{c.title}</div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span className="text-emerald-400/90">{c.badge}</span>
                    <span className="group-hover:text-white flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-sky-400" />
                      {c.notes}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-6 text-center text-xs font-mono text-gray-500">
                No matching courses found. Try searching &quot;Verilog&quot;, &quot;Power&quot;, or &quot;DSP&quot;.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
