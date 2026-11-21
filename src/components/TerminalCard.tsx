import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, Cpu, Zap } from 'lucide-react';

export const TerminalCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'whoami' | 'verilog' | 'spice'>('whoami');
  const [copied, setCopied] = useState(false);

  const snippets = {
    whoami: `#!/usr/bin/env bash
# Saivarshith Mitukula (saivarshithm)
NAME="Saivarshith Mitukula"
ROLE="Electrical & Electronics Engineering Undergrad @ NITK Surathkal"
RESEARCH="Ex-Summer Research Intern @ URSC, ISRO Bengaluru (Power Systems)"
FOCUS=("Digital VLSI & RTL" "RISC-V Microarchitecture" "Space-Grade Power" "Developer Tools")
CGPA="8.56 / 10.0"
STATUS="Designing pipelined processors & space converters"
echo "Philosophy: DESIGN · BUILD · VERIFY"`,

    verilog: `// 5-Stage RV32IM Pipelined Core with EX/MEM Forwarding
module rv32im_core (
    input  wire        clk,
    input  wire        reset_n,
    input  wire [31:0] instr_i,
    output wire [31:0] alu_result_o,
    output wire        mem_write_en_o
);
    // Pipeline Registers: IF/ID, ID/EX, EX/MEM, MEM/WB
    wire [1:0] forward_a, forward_b;
    wire       hazard_stall, branch_taken;

    // Hazard Detection & EX/MEM Forwarding Unit
    forwarding_unit u_fwd (
        .rs1_addr(id_ex_rs1), .rs2_addr(id_ex_rs2),
        .ex_mem_rd(ex_mem_rd), .mem_wb_rd(mem_wb_rd),
        .forward_a(forward_a), .forward_b(forward_b)
    );
endmodule`,

    spice: `* ISRO URSC Radiation-Tolerant Buck Converter (100 kHz)
* Input: 11V - 42V | Output: 5V @ 4A | f_sw = 100 kHz
.SUBCKT BUCK_ISRO VIN VOUT GND
V_IN    VIN   GND  DC 28V
M_TOP   VIN   SW   GND  RAD_HARD_NMOS W=12m L=0.5u
L_OUT   SW    VOUT 600uH RSER=12m
C_OUT   VOUT  GND  50uF  ESR=4m
R_LOAD  VOUT  GND  1.25  ; 4.0A load
.TRAN 10n 5m START=2m
.MEAS TRAN VOUT_RIPPLE PP V(VOUT) FROM=4m TO=5m
.END`
  };

  const copyCurrentSnippet = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#111216] shadow-2xl overflow-hidden text-left">
      {/* Terminal Titlebar & Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#0c0d10] px-3 py-2 gap-2">
        {/* Window Dots & Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <button
            onClick={() => setActiveTab('whoami')}
            className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap tap-target ${
              activeTab === 'whoami'
                ? 'bg-white/10 text-emerald-400 border border-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>whoami.sh</span>
          </button>

          <button
            onClick={() => setActiveTab('verilog')}
            className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap tap-target ${
              activeTab === 'verilog'
                ? 'bg-white/10 text-sky-400 border border-sky-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>riscv_core.v</span>
          </button>

          <button
            onClick={() => setActiveTab('spice')}
            className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap tap-target ${
              activeTab === 'spice'
                ? 'bg-white/10 text-amber-400 border border-amber-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>buck_100khz.sp</span>
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={copyCurrentSnippet}
          className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors tap-target"
          aria-label="Copy snippet"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container: overflow-x-auto to ensure zero mobile stretch */}
      <div className="p-4 overflow-x-auto no-scrollbar font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-300 max-h-[340px]">
        <pre className="whitespace-pre">
          {activeTab === 'whoami' && (
            <code>
              <span className="text-zinc-500">#!/usr/bin/env bash</span>{'\n'}
              <span className="text-zinc-500"># Saivarshith Mitukula (saivarshithm)</span>{'\n'}
              <span className="text-sky-400">NAME</span>=<span className="text-emerald-300">&quot;Saivarshith Mitukula&quot;</span>{'\n'}
              <span className="text-sky-400">ROLE</span>=<span className="text-emerald-300">&quot;Electrical &amp; Electronics Engineering Undergrad @ NITK Surathkal&quot;</span>{'\n'}
              <span className="text-sky-400">RESEARCH</span>=<span className="text-emerald-300">&quot;Ex-Summer Research Intern @ URSC, ISRO Bengaluru (Power Systems)&quot;</span>{'\n'}
              <span className="text-sky-400">FOCUS</span>=(<span className="text-amber-300">&quot;Digital VLSI &amp; RTL&quot;</span> <span className="text-amber-300">&quot;RISC-V Microarchitecture&quot;</span> <span className="text-amber-300">&quot;Space-Grade Power&quot;</span> <span className="text-amber-300">&quot;Developer Tools&quot;</span>){'\n'}
              <span className="text-sky-400">CGPA</span>=<span className="text-emerald-400">&quot;8.56 / 10.0&quot;</span>{'\n'}
              <span className="text-sky-400">STATUS</span>=<span className="text-zinc-200">&quot;Designing pipelined processors &amp; space converters&quot;</span>{'\n'}
              <span className="text-amber-400">echo</span> <span className="text-emerald-300">&quot;Philosophy: DESIGN · BUILD · VERIFY&quot;</span>
            </code>
          )}

          {activeTab === 'verilog' && (
            <code>
              <span className="text-zinc-500">// 5-Stage RV32IM Pipelined Core with EX/MEM Forwarding</span>{'\n'}
              <span className="text-sky-400">module</span> <span className="text-yellow-300">rv32im_core</span> ({'\n'}
              {'    '}<span className="text-sky-400">input</span>  <span className="text-purple-400">wire</span>        <span className="text-zinc-200">clk</span>,{'\n'}
              {'    '}<span className="text-sky-400">input</span>  <span className="text-purple-400">wire</span>        <span className="text-zinc-200">reset_n</span>,{'\n'}
              {'    '}<span className="text-sky-400">input</span>  <span className="text-purple-400">wire</span> [<span className="text-emerald-400">31</span>:<span className="text-emerald-400">0</span>] <span className="text-zinc-200">instr_i</span>,{'\n'}
              {'    '}<span className="text-sky-400">output</span> <span className="text-purple-400">wire</span> [<span className="text-emerald-400">31</span>:<span className="text-emerald-400">0</span>] <span className="text-zinc-200">alu_result_o</span>,{'\n'}
              {'    '}<span className="text-sky-400">output</span> <span className="text-purple-400">wire</span>        <span className="text-zinc-200">mem_write_en_o</span>{'\n'}
              );{'\n'}
              {'    '}<span className="text-zinc-500">// Forwarding Unit reduces branch stalls to achieve 1.57 CPI</span>{'\n'}
              {'    '}<span className="text-yellow-300">forwarding_unit</span> <span className="text-zinc-200">u_fwd</span> ({'\n'}
              {'        '}.<span className="text-emerald-300">rs1_addr</span>(<span className="text-zinc-200">id_ex_rs1</span>), .<span className="text-emerald-300">rs2_addr</span>(<span className="text-zinc-200">id_ex_rs2</span>),{'\n'}
              {'        '}.<span className="text-emerald-300">ex_mem_rd</span>(<span className="text-zinc-200">ex_mem_rd</span>), .<span className="text-emerald-300">mem_wb_rd</span>(<span className="text-zinc-200">mem_wb_rd</span>),{'\n'}
              {'        '}.<span className="text-emerald-300">forward_a</span>(<span className="text-zinc-200">forward_a</span>), .<span className="text-emerald-300">forward_b</span>(<span className="text-zinc-200">forward_b</span>){'\n'}
              {'    '});{'\n'}
              <span className="text-sky-400">endmodule</span>
            </code>
          )}

          {activeTab === 'spice' && (
            <code>
              <span className="text-zinc-500">* ISRO URSC Radiation-Tolerant Buck Converter (100 kHz)</span>{'\n'}
              <span className="text-zinc-500">* Input: 11V - 42V | Output: 5V @ 4A | Type-III Compensated</span>{'\n'}
              <span className="text-sky-400">V_IN</span>    <span className="text-zinc-200">VIN   GND</span>  <span className="text-emerald-400">DC 28V</span>{'\n'}
              <span className="text-sky-400">M_TOP</span>   <span className="text-zinc-200">VIN   SW   GND  RAD_HARD_NMOS</span> <span className="text-yellow-300">W=12m L=0.5u</span>{'\n'}
              <span className="text-sky-400">L_OUT</span>   <span className="text-zinc-200">SW    VOUT</span> <span className="text-emerald-400">600uH</span> <span className="text-purple-400">RSER=12m</span>{'\n'}
              <span className="text-sky-400">C_OUT</span>   <span className="text-zinc-200">VOUT  GND</span>  <span className="text-emerald-400">50uF</span>  <span className="text-purple-400">ESR=4m</span>{'\n'}
              <span className="text-sky-400">R_LOAD</span>  <span className="text-zinc-200">VOUT  GND</span>  <span className="text-emerald-400">1.25</span>  <span className="text-zinc-500">; 4.0A Spacecraft Load</span>{'\n'}
              <span className="text-amber-400">.TRAN</span> <span className="text-zinc-200">10n 5m START=2m</span>{'\n'}
              <span className="text-amber-400">.MEAS TRAN</span> <span className="text-emerald-300">VOUT_RIPPLE PP V(VOUT) FROM=4m TO=5m</span>{'\n'}
              <span className="text-sky-400">.END</span>
            </code>
          )}
        </pre>
      </div>

      {/* Terminal Status bar */}
      <div className="px-4 py-2 bg-[#0c0d10] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>SYNTAX VERIFIED</span>
        </span>
        <span>UTF-8 · LF</span>
      </div>
    </div>
  );
};
