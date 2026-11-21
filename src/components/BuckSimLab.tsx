import React, { useState, useMemo } from 'react';
import { Sliders, Zap, Activity, Info, RefreshCw } from 'lucide-react';

export const BuckSimLab: React.FC = () => {
  const [vin, setVin] = useState<number>(28); // Default 28V nominal satellite bus

  // Design constants from ISRO URSC buck converter specification
  const VOUT = 5.0; // 5.0V output
  const FSW_KHZ = 100; // 100 kHz switching frequency
  const TSW_US = 10.0; // 10 µs period
  const L_UH = 600; // 600 µH inductor
  const C_UF = 50; // 50 µF ceramic capacitor
  const IOUT = 4.0; // 4.0A load

  // Real-time circuit calculations
  const { dutyCyclePercent, tonUs, deltaIlMa, iPeakA, vRippleMv } = useMemo(() => {
    const d = VOUT / vin;
    const dPercent = d * 100;
    const ton = (d * TSW_US); // in microseconds
    // Delta IL = (Vin - Vout) * D / (f_sw * L)
    const deltaIlAmps = ((vin - VOUT) * d) / (FSW_KHZ * 1000 * (L_UH * 1e-6));
    const deltaIlMilliAmps = deltaIlAmps * 1000;
    const iPeak = IOUT + deltaIlAmps / 2;
    // Delta Vout = Delta IL / (8 * f_sw * C)
    const vRippleVolts = deltaIlAmps / (8 * (FSW_KHZ * 1000) * (C_UF * 1e-6));
    const vRippleMilliVolts = vRippleVolts * 1000;

    return {
      dutyCyclePercent: dPercent.toFixed(1),
      tonUs: ton.toFixed(2),
      deltaIlMa: Math.round(deltaIlMilliAmps),
      iPeakA: iPeak.toFixed(2),
      vRippleMv: vRippleMilliVolts.toFixed(1)
    };
  }, [vin]);

  // Dynamic SVG Waveform Generation (2 complete periods, 0 to 400px width)
  const dutyRatio = VOUT / vin;
  const periodWidth = 180;
  const tOnWidth = periodWidth * dutyRatio;
  const tOffWidth = periodWidth * (1 - dutyRatio);

  return (
    <section id="buck-lab" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-400 mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>~/saivarshithm/buck-sim</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F4F4F5] tracking-tight">
            PWM &amp; Inductor Ripple Lab
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl">
            Real-time circuit parameter synthesis based on the <strong>ISRO URSC 100 kHz space-grade converter</strong> specification (V_out = 5.0V, L = 600 µH, C = 50 µF).
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-zinc-500 hidden sm:inline">Presets:</span>
          {[
            { label: '12V (Min)', val: 12 },
            { label: '28V (Nominal)', val: 28 },
            { label: '42V (Max)', val: 42 }
          ].map((preset) => (
            <button
              key={preset.val}
              onClick={() => setVin(preset.val)}
              className={`px-2.5 py-1.5 rounded-md border text-xs transition-colors tap-target ${
                vin === preset.val
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold'
                  : 'bg-white/[0.04] text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Lab Widget Container */}
      <div className="rounded-2xl border border-white/10 bg-[#111216] p-5 sm:p-7 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Slider & Live Telemetry Gauges */}
          <div className="lg:col-span-5 space-y-6">
            {/* Input Voltage Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="vin-slider" className="text-xs font-mono font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Input Voltage (V_in):</span>
                </label>
                <span className="text-base font-mono font-bold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {vin.toFixed(1)} V
                </span>
              </div>

              <input
                id="vin-slider"
                type="range"
                min="11"
                max="42"
                step="0.5"
                value={vin}
                onChange={(e) => setVin(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-[#181920] rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                style={{ minHeight: '44px' }}
                aria-label="Input Voltage Vin"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>11.0V (Battery Min)</span>
                <span>28.0V (Spacecraft Nominal)</span>
                <span>42.0V (Solar Burst Max)</span>
              </div>
            </div>

            {/* Calculated Performance Metric Badges */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">DUTY CYCLE (D)</span>
                <span className="text-base font-bold text-[#F4F4F5] mt-0.5 block">{dutyCyclePercent}%</span>
                <span className="text-[10px] text-zinc-400">T_on = {tonUs} µs</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">RIPPLE (ΔI_L)</span>
                <span className="text-base font-bold text-sky-400 mt-0.5 block">{deltaIlMa} mA</span>
                <span className="text-[10px] text-zinc-400">I_peak = {iPeakA} A</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">OUTPUT VOLTAGE</span>
                <span className="text-base font-bold text-emerald-400 mt-0.5 block">5.00 V</span>
                <span className="text-[10px] text-zinc-400">@ 4.0A Load (20W)</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">VOLTAGE RIPPLE</span>
                <span className="text-base font-bold text-amber-400 mt-0.5 block">&lt; {vRippleMv} mV</span>
                <span className="text-[10px] text-zinc-400">&lt; 0.4% Output Reg</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <Info className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>Type-III closed-loop compensation guarantees &gt; 60° phase margin.</span>
            </div>
          </div>

          {/* Right Column: Live Dynamic SVG Waveforms */}
          <div className="lg:col-span-7 bg-[#0c0d10] rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  CH1: PWM Gate Drive (V_gate)
                </span>
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  CH2: Inductor Current I_L(t)
                </span>
              </div>
              <span className="text-zinc-500">f_sw = 100 kHz</span>
            </div>

            {/* Oscilloscope Graticule Screen */}
            <div className="relative w-full h-[180px] bg-black/60 rounded-lg overflow-hidden border border-white/5">
              <svg
                viewBox="0 0 400 160"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                {/* Graticule Grid */}
                <defs>
                  <pattern id="lab-grid" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="400" height="160" fill="url(#lab-grid)" />

                {/* Center Baseline Guides */}
                <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="2,2" />
                <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="2,2" />

                {/* Channel 1: PWM Gate Pulse Wave (Top Half, y: 15 to 55) */}
                {/* Period 1 */}
                <path
                  d={`
                    M 10 55 
                    L 10 20 
                    L ${10 + tOnWidth} 20 
                    L ${10 + tOnWidth} 55 
                    L ${10 + periodWidth} 55 
                    L ${10 + periodWidth} 20 
                    L ${10 + periodWidth + tOnWidth} 20 
                    L ${10 + periodWidth + tOnWidth} 55 
                    L 390 55
                  `}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />

                {/* Channel 2: Triangular Inductor Current Ripple (Bottom Half, y: 90 to 140) */}
                <path
                  d={`
                    M 10 135 
                    L ${10 + tOnWidth} 95 
                    L ${10 + periodWidth} 135 
                    L ${10 + periodWidth + tOnWidth} 95 
                    L ${10 + periodWidth * 2} 135 
                    L 390 135
                  `}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>TimeBase: 2.5 µs / div</span>
              <span>CH1: 5V / div · CH2: 1A / div</span>
              <span>T_sw = 10.0 µs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
