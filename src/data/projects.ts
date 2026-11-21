export interface FlagshipProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  architectureDiagram?: string;
  toolsUsed: string[];
  keyAchievements: string[];
  category: 'silicon' | 'power' | 'software';
  featured: boolean;
  repo: string;
  url?: string;
  schematicType: 'riscv' | 'buck' | 'mosfet' | 'wpt' | 'uart' | 'inverter';
  status: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

export interface FallbackRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  category: 'Silicon & RTL' | 'Power & Analog' | 'Software & Tools';
}

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 'riscv-5stage-pipeline-cache',
    title: '5-Stage Pipelined RV32IM RISC-V Processor',
    subtitle: 'Synthesizable Harvard Architecture Core with Hardware Hazard Forwarding',
    description: 'Hardware RTL microarchitecture featuring Fetch, Decode, Execute, Memory, and Writeback stages in Verilog-2001. Integrated EX/MEM forwarding units, branch stall minimization, and 2-level Harvard cache hierarchy reducing CPI to 1.57.',
    longDescription: 'Engineered a synthesizable 32-bit RV32IM processor core adhering to the RISC-V unprivileged ISA specification. Designed a dedicated hazard detection unit with branch penalty mitigation and data forwarding logic across pipeline registers (IF/ID, ID/EX, EX/MEM, MEM/WB). Structured a Harvard architecture with split instruction and data caches, synthesized with Xilinx Vivado on Artix-7 FPGA achieving 3.18x speedup over single-cycle execution.',
    architectureDiagram: `[ Instruction Fetch ] ──> [ IF/ID Reg ] ──> [ Instruction Decode / RegFile ]
          │                                                    │
    [ Branch Predict ]                                  [ ID/EX Reg ]
          │                                                    │
          v                                                    v
[ Hazard Detection Unit ] <── [ Forwarding Unit ] <── [ ALU / Execute Stage ]
                                                               │
                                                        [ EX/MEM Reg ]
                                                               │
[ Writeback Stage ] <── [ MEM/WB Reg ] <── [ Data Memory / Cache ]`,
    toolsUsed: ['Verilog-2001', 'Xilinx Vivado', 'GTKWave', 'Artix-7 FPGA', 'RISC-V GNU Toolchain'],
    keyAchievements: [
      'Engineered complete 5-stage pipeline with full EX/MEM and MEM/WB data forwarding',
      'Achieved average Cycles Per Instruction (CPI) of 1.57 on standard Dhrystone loop benchmarks',
      'Implemented dual-level Harvard L1/L2 cache hierarchy with write-back and write-allocate policies',
      'Synthesized on Artix-7 FPGA with zero timing violations at target clock frequencies'
    ],
    category: 'silicon',
    featured: true,
    repo: 'https://github.com/saivarshithm/riscv-5stage-pipeline-cache',
    schematicType: 'riscv',
    status: 'RTL Verified & Synthesized',
    metrics: [
      { label: 'ISA Spec', value: 'RV32IM (32-Bit)' },
      { label: 'Pipeline Depth', value: '5 Stages' },
      { label: 'Benchmark CPI', value: '1.57 CPI' },
      { label: 'Clock Speedup', value: '3.18x vs Single-Cycle' }
    ],
    tags: ['Verilog-2001', 'RISC-V', 'Computer Architecture', 'Pipelining', 'Xilinx Vivado', 'Cache Memory']
  },
  {
    id: 'isro-ursc-buck-converter',
    title: 'Space-Grade DC-DC Buck Converter — ISRO URSC',
    subtitle: 'Radiation-Tolerant 11V–42V Satellite Power Conditioning Bus',
    description: 'Designed and simulated a radiation-tolerant closed-loop step-down power converter for spacecraft bus conditioning during summer research at U.R. Rao Satellite Centre (ISRO). Regulates 11V–42V unregulated satellite battery rail to ultra-low ripple 5V @ 4A at 100 kHz.',
    longDescription: 'Completed at U.R. Rao Satellite Centre (URSC), ISRO Bengaluru under the Power Systems Group. Formulated closed-loop voltage-mode PWM control utilizing Type-III compensation network to guarantee > 60° phase margin across 11V to 42V input line variations. Modeled custom toroidal magnetics and designed an optimized LC output filter (600 µH / 50 µF) holding peak-to-peak output voltage ripple below 20 mV under 0% to 100% load steps, benchmarked against TI TPS7H5001-SP.',
    architectureDiagram: `[ Satellite Solar / Battery Bus (11V – 42V) ]
                      │
                      ▼
        [ Low-ESR Input Decoupling ]
                      │
                      ▼
[ High-Side Space-Grade GaN/Si MOSFET ] <── [ Voltage-Mode PWM Controller (100 kHz) ]
                      │                                        ▲
                      ▼                                        │
             [ 600 µH Power Inductor ]                         │
                      │                                        │
                      ▼                                        │
    [ 50 µF Low-ESR Ceramic Output Filter ] ──> [ Feedback Voltage Divider ]
                      │                                        │
                      ▼                                        ▼
             [ Regulated 5V @ 4A Bus ] ──────────> [ Type-III Op-Amp Compensator ]`,
    toolsUsed: ['LTspice', 'NGSpice', 'MATLAB/Simulink', 'Type-III Loop Synthesis', 'Magnetics CAD'],
    keyAchievements: [
      'Engineered wide-input regulation (11V to 42V) for spacecraft bus voltage swings',
      'Achieved phase margin > 62° and gain margin > 14 dB across all line and load conditions',
      'Kept output ripple under 20 mV (< 0.4%) at 4A full load with 600 µH / 50 µF LC filtering',
      'Demonstrated 93.4% peak conversion efficiency with space-grade silicon benchmarking'
    ],
    category: 'power',
    featured: true,
    repo: 'https://github.com/saivarshithm/Space-Grade-DC-DC-Buck-Converter',
    schematicType: 'buck',
    status: 'Ex-ISRO URSC Research',
    metrics: [
      { label: 'Input Range', value: '11V – 42V' },
      { label: 'Output Regulation', value: '5V @ 4A' },
      { label: 'Switching Frequency', value: '100 kHz' },
      { label: 'Peak Efficiency', value: '93.4%' }
    ],
    tags: ['Power Electronics', 'LTspice', 'Satellite Bus', 'Voltage-Mode PWM', 'LC Filter', 'ISRO URSC']
  },
  {
    id: 'sky130-cmos-characterization',
    title: 'SKY130 PDK CMOS Circuit Characterization',
    subtitle: 'Open-Source 130nm VLSI Inverter Delay & Noise Margin Optimization',
    description: 'Transistor-level characterization of CMOS standard cells using Google-SkyWater SKY130 PDK. Analyzed SPICE voltage transfer curves (VTC), extracted NMH/NML noise margins, and sized W/L ratios cutting rise delay from 148 ps to 37 ps.',
    longDescription: 'Conducted full physics-level transistor simulation and characterization of fundamental logic gates on open-source Google-SkyWater 130nm CMOS foundry process. Extracted Voltage Transfer Characteristics (VTC) across 1.8V supply rail, evaluated switching threshold voltage (Vm), and derived noise margins (NMH and NML). Iteratively swept PMOS-to-NMOS width ratios (Wp/Wn) to compensate for hole vs electron mobility disparity, reducing inverter rise delay from 148 ps down to 37 ps.',
    architectureDiagram: `[ VDD = 1.8V ] ──> [ Sized PMOS (W/L = 3.6µm / 0.15µm) ]
                                  │
[ Input Vin ] ───────┬────────────┴───────────> [ Output Vout ] ──> [ Load Cap CL = 10fF ]
                     │            │
                     └────> [ Sized NMOS (W/L = 1.2µm / 0.15µm) ]
                                  │
                            [ GND = 0.0V ]`,
    toolsUsed: ['Google-SkyWater SKY130 PDK', 'NGSpice', 'GTKWave', 'SPICE Netlists'],
    keyAchievements: [
      'Characterized VTC curves and transient delay metrics for SKY130 130nm standard cells',
      'Optimized PMOS/NMOS width ratio to equalize rise and fall propagation delays',
      'Cut inverter rise propagation delay from 148 ps to 37 ps under 10 fF load capacitance',
      'Extracted high/low noise margins (NMH: 0.82V, NML: 0.79V) under 1.8V supply rail'
    ],
    category: 'silicon',
    featured: true,
    repo: 'https://github.com/saivarshithm/CMOS-Circuit-Design-and-Simulation-Using-SKY130',
    schematicType: 'mosfet',
    status: 'PDK Simulated & Validated',
    metrics: [
      { label: 'Technology Node', value: '130nm CMOS' },
      { label: 'Supply Voltage', value: '1.8V Nominal' },
      { label: 'Rise Delay Cut', value: '148 ps → 37 ps' },
      { label: 'Noise Margins', value: 'NMH: 0.82V / NML: 0.79V' }
    ],
    tags: ['SKY130 PDK', 'VLSI', 'CMOS Inverter', 'NGSpice', 'VTC Curve', 'Propagation Delay']
  },
  {
    id: 'wireless-power-transfer-3d-em',
    title: 'Wireless Power Transfer & 3D EM Coil Modeling',
    subtitle: 'Magnetic Resonant Coupling & Electromagnetic FEA in Ansys Maxwell',
    description: 'Hardware prototype and 3D finite-element electromagnetic simulation of inductive and resonant wireless power transfer systems. Evaluated magnetic flux linkage, coupling coefficients, and shielding efficacy with ferrite bars and aluminum sheets.',
    longDescription: 'Investigated near-field resonant inductive wireless power transfer using circular and planar spiral coil geometries. Modeled full 3D magnetic flux distributions, eddy current losses, and spatial misalignment tolerances in Ansys Maxwell 3D. Fabricated bench prototypes with custom Litz wire coils, resonant tank capacitors tuned to 85 kHz, and ferrite flux concentrators achieving 88.7% transmission efficiency at 25 mm separation distance.',
    architectureDiagram: `[ High-Frequency Resonant Inverter (85 kHz) ]
                      │
                      ▼
[ Primary Series-Parallel Resonant Tank ] ──> [ Litz Coil + Ferrite Concentrator ]
                                                               │
                                          ((( 3D Resonant Magnetic Near-Field )))
                                                               │
[ Passive Diode Bridge Rectifier ] <── [ Secondary Coil + Aluminum Shielding ]
                      │
                      ▼
[ Regulated DC Output Stage (Load: 12V / 24W) ]`,
    toolsUsed: ['Ansys Maxwell 3D', 'MATLAB', 'LTspice', 'Litz Wire Coils', 'Ferrite Core Modeling'],
    keyAchievements: [
      'Modeled 3D electromagnetic field vectors and eddy current density in Ansys Maxwell FEA',
      'Achieved 88.7% dc-to-dc transmission efficiency across 25 mm vertical air gap',
      'Reduced electromagnetic interference (EMI) leakage by 18 dB using planar aluminum shielding',
      'Characterized mutual inductance and coupling coefficient k = 0.28 under angular misalignment'
    ],
    category: 'power',
    featured: true,
    repo: 'https://github.com/saivarshithm/Design-and-Simulation-of-Wireless-Power-Transfer-System',
    schematicType: 'wpt',
    status: 'Hardware Prototype & FEA',
    metrics: [
      { label: 'Resonant Frequency', value: '85 kHz' },
      { label: 'Air Gap Distance', value: '25 mm' },
      { label: 'Coupling Factor (k)', value: '0.28' },
      { label: 'Transfer Efficiency', value: '88.7%' }
    ],
    tags: ['Ansys Maxwell 3D', 'Electromagnetics', 'FEA', 'Resonant Inverter', 'Litz Coils', 'Ferrite Shielding']
  },
  {
    id: 'uart-fpga-serial-core',
    title: 'Full-Duplex FPGA UART Transceiver',
    subtitle: 'Synthesizable 10-Bit Frame Serial RTL with 16x Clock Recovery',
    description: 'Hardware RTL implementation of a full-duplex synthesizable UART core on FPGA with independent baud-rate generator clock dividers, 16x oversampling receiver clock recovery, and Python telemetry visualizer at 115200 baud.',
    longDescription: 'Implemented full-duplex synthesizable UART core in Verilog-2001 targeting Basys-3 FPGA. Designed independent baud rate generator clock dividers, 16x oversampling receiver clock recovery, and hardware parity generation with zero packet loss at 115200 baud. Built companion Python serial visualizer for telemetry packet logging and frame decoding.',
    architectureDiagram: `[ FPGA UART Tx Engine ] ──> [ Configurable Baud Divider ] ──> [ RS-232 / USB Bridge ]
[ FPGA UART Rx Engine ] <── [ 16x Oversampling Unit ] <──── [ Python Telemetry Logger ]`,
    toolsUsed: ['Verilog-2001', 'Xilinx Vivado', 'Basys-3 FPGA', 'Python Serial', 'GTKWave'],
    keyAchievements: [
      'Zero packet drops at 115200 baud under bidirectional full-duplex telemetry testing',
      'Engineered 16x oversampling clock recovery circuit for noise-immune RX edge sampling',
      'Built live Python serial visualizer for real-time packet telemetry logging',
      'Synthesized on Xilinx Artix-7 with minimal logic footprint (< 2% slice utilization)'
    ],
    category: 'silicon',
    featured: true,
    repo: 'https://github.com/saivarshithm/UART',
    schematicType: 'uart',
    status: 'Synthesized & Simulated',
    metrics: [
      { label: 'Baud Rate Clocking', value: '115200 Baud' },
      { label: 'Clock Oversampling', value: '16x RX Phase' },
      { label: 'Frame Structure', value: '10-Bit Full Duplex' },
      { label: 'FPGA Footprint', value: '< 2% Slice Area' }
    ],
    tags: ['Verilog-2001', 'FPGA', 'UART', 'Xilinx Vivado', 'Python Serial', 'Serial Telemetry']
  },
  {
    id: 'cascaded-h-bridge-multilevel-inverter',
    title: 'Cascaded H-Bridge Multilevel Inverter with SPWM',
    subtitle: 'Harmonic Reduction Modeling & Multicarrier PWM Modulation',
    description: 'Power electronics simulation modeling a 5-level cascaded H-bridge multilevel inverter in MATLAB/Simulink. Utilized multicarrier Sinusoidal Pulse Width Modulation (SPWM) to slash total harmonic distortion (THD) below 4.8%.',
    longDescription: 'Modeled a 5-level cascaded H-bridge multilevel inverter in MATLAB/Simulink utilizing multicarrier Sinusoidal Pulse Width Modulation (SPWM) to synthesize a stepped AC waveform. Compared phase-disposition (PD) and phase-opposition-disposition (POD) carrier strategies to optimize harmonic spectrum, cutting THD below 4.8% without requiring bulky LC output filter stages.',
    architectureDiagram: `[ DC Bus 1 (Vdc) ] ──> [ H-Bridge Cell 1 ] ──┐
                                              ├──> [ 5-Level Stepped AC Waveform ] ──> [ THD < 4.8% ]
[ DC Bus 2 (Vdc) ] ──> [ H-Bridge Cell 2 ] ──┘
                             ▲
                             │
     [ Multicarrier SPWM Modulation Engine (Phase Disposition) ]`,
    toolsUsed: ['MATLAB/Simulink', 'Power Electronics Toolbox', 'Harmonic FFT Analysis'],
    keyAchievements: [
      'Total Harmonic Distortion (THD) reduced from 28% in square wave to < 4.8% with 5-level SPWM',
      'Implemented phase-disposition (PD) carrier modulation scheme for symmetric power distribution',
      'Eliminated bulky passive output filter requirements while maintaining grid-tie compliance',
      'Verified voltage stress sharing across semiconductor switches under inductive load steps'
    ],
    category: 'power',
    featured: true,
    repo: 'https://github.com/saivarshithm/H-Bridge-Multilevel-Inverter-with-SPWM',
    schematicType: 'inverter',
    status: 'Simulink Validated',
    metrics: [
      { label: 'Inverter Levels', value: '5-Level Output' },
      { label: 'Harmonic Distortion', value: 'THD < 4.8%' },
      { label: 'Modulation Scheme', value: 'Multicarrier SPWM' },
      { label: 'Topology', value: 'Cascaded H-Bridge' }
    ],
    tags: ['MATLAB/Simulink', 'Multilevel Inverter', 'SPWM', 'THD Reduction', 'Power Electronics']
  }
];

export const FALLBACK_REPOS: FallbackRepo[] = [
  {
    name: 'riscv-5stage-pipeline-cache',
    full_name: 'saivarshithm/riscv-5stage-pipeline-cache',
    description: '5-Stage Pipelined RV32IM RISC-V processor in Verilog with hazard detection, data forwarding, and L1/L2 cache hierarchy.',
    html_url: 'https://github.com/saivarshithm/riscv-5stage-pipeline-cache',
    stargazers_count: 14,
    forks_count: 3,
    language: 'Verilog',
    updated_at: '2026-10-18T14:22:00Z',
    topics: ['riscv', 'verilog', 'fpga', 'computer-architecture', 'pipelining'],
    category: 'Silicon & RTL'
  },
  {
    name: 'Space-Grade-DC-DC-Buck-Converter',
    full_name: 'saivarshithm/Space-Grade-DC-DC-Buck-Converter',
    description: 'Wide-input (11V-42V to 5V@4A) radiation-tolerant DC-DC buck converter designed at ISRO URSC with closed-loop PWM controller.',
    html_url: 'https://github.com/saivarshithm/Space-Grade-DC-DC-Buck-Converter',
    stargazers_count: 22,
    forks_count: 5,
    language: 'MATLAB',
    updated_at: '2026-09-24T11:15:00Z',
    topics: ['power-electronics', 'ltspice', 'buck-converter', 'isro', 'space-grade'],
    category: 'Power & Analog'
  },
  {
    name: 'CMOS-Circuit-Design-and-Simulation-Using-SKY130',
    full_name: 'saivarshithm/CMOS-Circuit-Design-and-Simulation-Using-SKY130',
    description: 'Transistor-level characterization of CMOS logic gates using Google-SkyWater SKY130 PDK with VTC extraction and sizing optimization.',
    html_url: 'https://github.com/saivarshithm/CMOS-Circuit-Design-and-Simulation-Using-SKY130',
    stargazers_count: 19,
    forks_count: 4,
    language: 'Shell',
    updated_at: '2026-08-30T09:40:00Z',
    topics: ['sky130', 'vlsi', 'cmos', 'ngspice', 'semiconductor'],
    category: 'Silicon & RTL'
  },
  {
    name: 'Design-and-Simulation-of-Wireless-Power-Transfer-System',
    full_name: 'saivarshithm/Design-and-Simulation-of-Wireless-Power-Transfer-System',
    description: 'Hardware prototype and Ansys Maxwell 3D electromagnetic FEA of resonant inductive wireless power transfer systems.',
    html_url: 'https://github.com/saivarshithm/Design-and-Simulation-of-Wireless-Power-Transfer-System',
    stargazers_count: 12,
    forks_count: 2,
    language: 'MATLAB',
    updated_at: '2026-08-14T16:05:00Z',
    topics: ['wireless-power-transfer', 'ansys-maxwell', 'electromagnetics', 'fea'],
    category: 'Power & Analog'
  },
  {
    name: 'UART',
    full_name: 'saivarshithm/UART',
    description: 'Synthesizable full-duplex UART core in Verilog HDL with 16x oversampling clock recovery and Python telemetry visualizer.',
    html_url: 'https://github.com/saivarshithm/UART',
    stargazers_count: 16,
    forks_count: 3,
    language: 'Verilog',
    updated_at: '2026-07-28T13:20:00Z',
    topics: ['uart', 'verilog', 'fpga', 'serial-communication'],
    category: 'Silicon & RTL'
  },
  {
    name: 'H-Bridge-Multilevel-Inverter-with-SPWM',
    full_name: 'saivarshithm/H-Bridge-Multilevel-Inverter-with-SPWM',
    description: '5-Level cascaded H-bridge multilevel inverter modeled in MATLAB/Simulink with multicarrier SPWM for low THD.',
    html_url: 'https://github.com/saivarshithm/H-Bridge-Multilevel-Inverter-with-SPWM',
    stargazers_count: 9,
    forks_count: 1,
    language: 'MATLAB',
    updated_at: '2026-07-10T10:15:00Z',
    topics: ['inverter', 'spwm', 'matlab-simulink', 'thd-reduction'],
    category: 'Power & Analog'
  },
  {
    name: 'saivarshithm.github.io',
    full_name: 'saivarshithm/saivarshithm.github.io',
    description: 'Personal developer portfolio and hardware systems laboratory built with Astro, React, and Tailwind CSS.',
    html_url: 'https://github.com/saivarshithm/saivarshithm.github.io',
    homepage: 'https://saivarshithm.dev',
    stargazers_count: 24,
    forks_count: 6,
    language: 'TypeScript',
    updated_at: '2026-11-21T16:00:00Z',
    topics: ['astro', 'portfolio', 'react', 'tailwind', 'developer-tools'],
    category: 'Software & Tools'
  }
];

export const CAPABILITIES = {
  siliconAndPower: [
    { name: 'RTL & Verilog-2001', level: 'Expert', desc: 'Pipelined microarchitectures, hazard forwarding, FSM synthesis' },
    { name: 'RISC-V & ARM Architectures', level: 'Advanced', desc: 'RV32IM ISA, ARM7TDMI 3-stage core, instruction decoders' },
    { name: 'SKY130 PDK & VLSI', level: 'Advanced', desc: '130nm standard cell characterization, SPICE VTC, noise margin extraction' },
    { name: 'Power Converters (DC-DC)', level: 'Advanced', desc: 'Wide-input Buck, Boost, isolated flyback, closed-loop voltage mode PWM' },
    { name: 'Wireless Power Transfer', level: 'Advanced', desc: 'Resonant magnetic coupling, ferrite concentrators, 85 kHz tuning' },
    { name: 'Ansys Maxwell 3D EM', level: 'Proficient', desc: 'Electromagnetic FEA, eddy current loss, coupling coefficient analysis' },
    { name: 'LTspice & NGSpice', level: 'Expert', desc: 'AC/DC transient sweeps, Monte Carlo analysis, stability bode plots' },
    { name: 'Xilinx Vivado & GTKWave', level: 'Advanced', desc: 'Synthesizable timing closure, scan-chain ATPG, waveform debug' },
    { name: 'MATLAB / Simulink', level: 'Advanced', desc: 'SPWM multilevel inverters, harmonic analysis, control loop simulation' },
    { name: 'Embedded C & Control', level: 'Proficient', desc: 'Fixed-point PID algorithms, PWM motor control, UART/SPI telemetry' }
  ],
  vibeCodingAndApps: [
    { name: 'Astro & React 19', level: 'Expert', desc: 'Zero-JS static island architecture, 100/100 Lighthouse performance' },
    { name: 'TypeScript & JavaScript', level: 'Expert', desc: 'Strict typing, modern async runtimes, isomorphic utilities' },
    { name: 'Tailwind CSS v4', level: 'Expert', desc: 'Modern @theme design token pipelines, fluid typography, dark surfaces' },
    { name: 'Python Automation', level: 'Advanced', desc: 'Serial data logging, automated test suites, script pipelines' },
    { name: 'HTML5 Canvas & WebGL', level: 'Advanced', desc: '60fps GPU-composited oscilloscope waveforms, signal visualization' },
    { name: 'GitHub Actions & Pages', level: 'Advanced', desc: 'Automated CI/CD build pipelines, static CDN deployment' },
    { name: 'Developer Tooling & CLI', level: 'Expert', desc: 'Keyboard-first command menus, terminal widgets, system diagnostics' }
  ],
  vibeCodingAndPlatforms: [
    { name: 'Astro & React 19', level: 'Expert', desc: 'Zero-JS static island architecture, 100/100 Lighthouse performance' },
    { name: 'TypeScript & JavaScript', level: 'Expert', desc: 'Strict typing, modern async runtimes, isomorphic utilities' },
    { name: 'Tailwind CSS v4', level: 'Expert', desc: 'Modern @theme design token pipelines, fluid typography, dark surfaces' },
    { name: 'Python Automation', level: 'Advanced', desc: 'Serial data logging, automated test suites, script pipelines' },
    { name: 'HTML5 Canvas & WebGL', level: 'Advanced', desc: '60fps GPU-composited oscilloscope waveforms, signal visualization' },
    { name: 'GitHub Actions & Pages', level: 'Advanced', desc: 'Automated CI/CD build pipelines, static CDN deployment' },
    { name: 'Developer Tooling & CLI', level: 'Expert', desc: 'Keyboard-first command menus, terminal widgets, system diagnostics' }
  ]
};

export const TIMELINE_EXPERIENCE = [
  {
    period: 'May 2026 – Jun 2026',
    role: 'Summer Research Intern',
    organization: 'U.R. Rao Satellite Centre (URSC), ISRO',
    location: 'Bengaluru, India',
    badge: 'Space Systems & Power',
    accent: 'amber',
    points: [
      'Engineered wide-input (11V–42V) to 5V (4A, 20W) radiation-tolerant DC-DC buck converter for satellite power distribution.',
      'Designed and simulated closed-loop voltage-mode PWM controller at 100 kHz in LTspice with phase margin exceeding 60°.',
      'Optimized LC output filter (600 µH / 50 µF) to achieve < 20 mV ripple under maximum step-load transients, benchmarked against TI TPS7H5001-SP space-grade silicon.'
    ]
  },
  {
    period: '2023 – Present',
    role: 'B.Tech in Electrical & Electronics Engineering',
    organization: 'National Institute of Technology Karnataka (NITK)',
    location: 'Surathkal, India',
    badge: 'CGPA: 8.56',
    accent: 'emerald',
    points: [
      'Specializing in Digital VLSI, Computer Architecture, Power Electronics, and Embedded Systems.',
      'Designed 5-Stage RV32IM RISC-V pipelined core with Harvard cache hierarchy and custom UART peripheral controllers.',
      'Core coursework: Digital System Design, CMOS VLSI, Solid State Devices, Control Systems, Power Electronics.'
    ]
  },
  {
    period: '2025 – 2026',
    role: 'Convener, Tronix & Event Lead, EESA Day 2026',
    organization: 'Electrical & Electronics Society (EESA), NITK Surathkal',
    location: 'Surathkal, India',
    badge: 'Leadership & Engineering',
    accent: 'cyan',
    points: [
      'Directed Tronix flagship technical events, hardware hackathons, and circuit design challenges for 400+ participants.',
      'Mentored junior undergraduates in Verilog RTL design, FPGA synthesis on Basys-3 boards, and PCB layout.',
      'Spearheaded technical workshops on open-source VLSI tools and Google-SkyWater SKY130 PDK design flows.'
    ]
  },
  {
    period: '2024 – 2025',
    role: 'Hardware Benchmarks & Competitive Builds',
    organization: 'HDLBits & NITK Robotics Lab',
    location: 'Surathkal, India',
    badge: 'Rank 1700 Global',
    accent: 'emerald',
    points: [
      'Achieved HDLBits Global Rank ~1700 in synthesizable Verilog digital circuits and state machine verification.',
      'Designed a closed-loop PID ball-balancer mechatronics system with resistive touch-panel feedback and dual servo control.',
      'Finalist at Hackverse 5.0 hardware track engineering rapid edge-embedded telemetry.'
    ]
  }
];

export const PROFILE_INFO = {
  name: 'Saivarshith Mitukula',
  handle: 'saivarshithm',
  title: 'Electrical & Electronics Engineering Undergrad @ NITK Surathkal',
  subtitle: 'Digital Silicon, Power Electronics & Software Systems',
  tagline: 'Designing pipelined RISC-V processors, space-grade power converters, and fast developer tools.',
  philosophy: 'DESIGN · BUILD · VERIFY',
  status: 'EEE @ NITK Surathkal · Ex-ISRO URSC Research Intern',
  cgpa: '8.56',
  links: {
    github: 'https://github.com/saivarshithm',
    linkedin: 'https://linkedin.com/in/saivarshithmitukula',
    x: 'https://x.com/Saivarshithm',
    instagram: 'https://instagram.com/saivarshithm',
    orcid: 'https://orcid.org/0009-0007-7773-7587',
    portfolio: 'https://saivarshithm.dev'
  }
};
