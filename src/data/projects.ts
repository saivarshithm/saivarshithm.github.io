export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'silicon' | 'software' | 'power';
  featured: boolean;
  repo?: string;
  url?: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  schematicType?: 'riscv' | 'buck' | 'cmos' | 'wpt' | 'uart' | 'app';
  status: string;
}

export interface FallbackRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage?: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
  category: 'Silicon & RTL' | 'Power & Analog' | 'Vibe-Coded Apps & Tools';
}

export const FLAGSHIP_PROJECTS: Project[] = [
  {
    id: 'riscv-5stage-pipeline',
    title: '5-Stage Pipelined RV32IM RISC-V Processor',
    subtitle: 'RTL Microarchitecture with L1/L2 Harvard Caching',
    description: 'Synthesizable 32-bit RISC-V integer processor core designed in Verilog-2001. Features EX/MEM forwarding, hazard detection unit, 2-level Harvard cache hierarchy, and hardware multiplier/divider achieving 1.57 CPI.',
    category: 'silicon',
    featured: true,
    repo: 'https://github.com/saivarshithm/riscv-5stage-pipeline-cache',
    schematicType: 'riscv',
    status: 'Verified on Xilinx Vivado',
    metrics: [
      { label: 'CPI Execution', value: '1.57 CPI' },
      { label: 'Speedup vs Single-Cycle', value: '3.18x' },
      { label: 'Pipeline Depth', value: '5 Stages' },
      { label: 'FPGA Clock Target', value: '100 MHz' }
    ],
    tags: ['Verilog-2001', 'RISC-V RV32IM', 'Hazard Detection', 'Data Forwarding', 'L1/L2 Cache', 'Vivado']
  },
  {
    id: 'isro-buck-converter',
    title: 'Space-Grade Buck Converter (ISRO URSC)',
    subtitle: 'Wide-Input 11V–42V Radiation-Hardened DC-DC System',
    description: 'Designed and simulated a high-reliability satellite power distribution buck converter at U.R. Rao Satellite Centre (ISRO). Implemented closed-loop voltage-mode PWM at 100 kHz, LC filter optimization (600 µH / 50 µF), and benchmarked stability against TI TPS7H5001-SP.',
    category: 'power',
    featured: true,
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
    id: 'filevault-nitk',
    title: 'FileVault — Academic Resource Ecosystem',
    subtitle: 'Fast Academic Notes & Resource Hub for NITK Surathkal',
    description: 'Centralized academic course-notes, exam papers, and engineering resource platform designed for 500+ active NITK Surathkal undergraduates. Features sub-millisecond client filtering, edge caching, and a responsive glass-carbon UI.',
    category: 'software',
    featured: true,
    repo: 'https://github.com/saivarshithm/FileVault-NITK',
    url: 'https://filevault.cc',
    schematicType: 'app',
    status: 'Live in Production',
    metrics: [
      { label: 'Lighthouse Score', value: '100 / 100' },
      { label: 'Search Latency', value: '< 2 ms' },
      { label: 'Active NITK Users', value: '500+' },
      { label: 'Architecture', value: 'Static + Edge' }
    ],
    tags: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'PWA', 'Full-Text Search']
  },
  {
    id: 'sky130-cmos-characterization',
    title: 'SKY130 PDK CMOS Circuit Characterization',
    subtitle: 'Open-Source 130nm VLSI Inverter Delay & Noise Optimization',
    description: 'Transistor-level characterization of CMOS standard cells using Google-SkyWater SKY130 PDK. Analyzed SPICE voltage transfer curves (VTC), extracted NMH/NML noise margins, and sized W/L ratios cutting rise delay from 148 ps to 37 ps.',
    category: 'silicon',
    featured: true,
    repo: 'https://github.com/saivarshithm/CMOS-Circuit-Design-and-Simulation-Using-SKY130',
    schematicType: 'cmos',
    status: 'Tapeout-Ready Sizing',
    metrics: [
      { label: 'Process Technology', value: 'SKY130 (130nm)' },
      { label: 'Rise Delay Reduction', value: '148ps → 37ps' },
      { label: 'Supply Voltage (VDD)', value: '1.8 V' },
      { label: 'Delay Improvement', value: '4.0x Speedup' }
    ],
    tags: ['SKY130 PDK', 'NGSpice', 'VLSI', 'CMOS VTC', 'Noise Margin', 'Transistor Sizing']
  },
  {
    id: 'wireless-power-transfer',
    title: 'Wireless Power Transfer & 3D EM Modeling',
    subtitle: 'Resonant Magnetic Coupling with Ansys Maxwell FEA',
    description: 'Engineered a physical resonant wireless charging apparatus equipped with ferrite flux concentrators, aluminum eddy-current shielding, and 4.7 mm Litz wire coils. Validated electromagnetic coupling factors (k) across spatial misalignments using Ansys Maxwell 3D.',
    category: 'power',
    featured: true,
    schematicType: 'wpt',
    status: 'Bench Prototype & FEA',
    metrics: [
      { label: 'Resonant Frequency', value: '85 kHz' },
      { label: 'Air Gap Clearance', value: '35 mm' },
      { label: 'Coupling Factor (k)', value: '0.28' },
      { label: 'Transfer Efficiency', value: '88.7%' }
    ],
    tags: ['Ansys Maxwell 3D', 'Electromagnetics', 'FEA', 'Resonant Inverter', 'Litz Coils', 'Ferrite Shielding']
  },
  {
    id: 'uart-fpga-multilevel-inverter',
    title: 'FPGA UART & SPWM Cascaded Multilevel Inverter',
    subtitle: 'Synthesizable Serial RTL + Low-Harmonic Power Generation',
    description: 'Two-part hardware design: synthesizable 10-bit frame full-duplex UART core on FPGA with custom baud-rate generator and Python telemetry logger; paired with a 5-level cascaded H-bridge inverter using Sinusoidal PWM (SPWM) to reduce total harmonic distortion (THD).',
    category: 'silicon',
    featured: true,
    repo: 'https://github.com/saivarshithm/UART',
    schematicType: 'uart',
    status: 'Synthesized & Simulated',
    metrics: [
      { label: 'Baud Rate Clocking', value: '115200 Baud' },
      { label: 'THD Level', value: '< 4.8%' },
      { label: 'Topology', value: '5-Level H-Bridge' },
      { label: 'Frame Structure', value: '10-Bit Full Duplex' }
    ],
    tags: ['Verilog-2001', 'FPGA', 'MATLAB/Simulink', 'SPWM', 'UART', 'THD Reduction']
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
    name: 'FileVault-NITK',
    full_name: 'saivarshithm/FileVault-NITK',
    description: 'Centralized academic course-notes, previous papers, and resource portal built for NITK Surathkal students.',
    html_url: 'https://github.com/saivarshithm/FileVault-NITK',
    homepage: 'https://filevault.cc',
    stargazers_count: 28,
    forks_count: 7,
    language: 'TypeScript',
    updated_at: '2026-11-04T09:15:00Z',
    topics: ['astro', 'react', 'typescript', 'nitk', 'education', 'tailwind'],
    category: 'Vibe-Coded Apps & Tools'
  },
  {
    name: 'CMOS-Circuit-Design-and-Simulation-Using-SKY130',
    full_name: 'saivarshithm/CMOS-Circuit-Design-and-Simulation-Using-SKY130',
    description: 'Transistor-level characterization and VTC analysis of CMOS inverter and logic gates using Google-SkyWater 130nm PDK.',
    html_url: 'https://github.com/saivarshithm/CMOS-Circuit-Design-and-Simulation-Using-SKY130',
    stargazers_count: 11,
    forks_count: 2,
    language: 'Ngspice',
    updated_at: '2026-09-29T16:40:00Z',
    topics: ['sky130', 'vlsi', 'ngspice', 'cmos', 'spice-simulation'],
    category: 'Silicon & RTL'
  },
  {
    name: 'UART',
    full_name: 'saivarshithm/UART',
    description: 'Synthesizable full-duplex UART controller in Verilog with configurable baud rate generator and Python serial GUI.',
    html_url: 'https://github.com/saivarshithm/UART',
    stargazers_count: 8,
    forks_count: 1,
    language: 'Verilog',
    updated_at: '2026-08-15T11:05:00Z',
    topics: ['uart', 'verilog', 'fpga', 'serial-communication'],
    category: 'Silicon & RTL'
  },
  {
    name: 'H-Bridge-Multilevel-Inverter-with-SPWM',
    full_name: 'saivarshithm/H-Bridge-Multilevel-Inverter-with-SPWM',
    description: 'Cascaded H-Bridge 5-level multilevel inverter in MATLAB/Simulink using Sinusoidal Pulse Width Modulation (SPWM).',
    html_url: 'https://github.com/saivarshithm/H-Bridge-Multilevel-Inverter-with-SPWM',
    stargazers_count: 9,
    forks_count: 2,
    language: 'MATLAB',
    updated_at: '2026-07-22T08:30:00Z',
    topics: ['matlab', 'simulink', 'inverter', 'spwm', 'power-electronics'],
    category: 'Power & Analog'
  },
  {
    name: 'Wireless-Power-Transfer-Simulation',
    full_name: 'saivarshithm/Wireless-Power-Transfer-Simulation',
    description: '3D finite-element electromagnetic modeling of magnetic resonant coupling coils in Ansys Maxwell with ferrite shields.',
    html_url: 'https://github.com/saivarshithm/Wireless-Power-Transfer-Simulation',
    stargazers_count: 6,
    forks_count: 1,
    language: 'MATLAB',
    updated_at: '2026-06-30T17:12:00Z',
    topics: ['wireless-power', 'ansys-maxwell', 'fea', 'electromagnetics'],
    category: 'Power & Analog'
  },
  {
    name: 'Space-Grade-Buck-Converter-ISRO',
    full_name: 'saivarshithm/Space-Grade-Buck-Converter-ISRO',
    description: 'Radiation-tolerant 11V–42V to 5V DC-DC converter for spacecraft power subsystem designed at ISRO URSC.',
    html_url: 'https://github.com/saivarshithm/Space-Grade-Buck-Converter-ISRO',
    stargazers_count: 12,
    forks_count: 2,
    language: 'LTspice',
    updated_at: '2026-06-18T10:45:00Z',
    topics: ['ltspice', 'isro', 'space-grade', 'power-converter', 'pwm'],
    category: 'Power & Analog'
  },
  {
    name: 'ARM7TDMI-Processor-Core',
    full_name: 'saivarshithm/ARM7TDMI-Processor-Core',
    description: 'Synthesizable 3-stage pipelined ARMv4T microarchitecture with barrel shifter and ALU testbench validation.',
    html_url: 'https://github.com/saivarshithm/ARM7TDMI-Processor-Core',
    stargazers_count: 7,
    forks_count: 1,
    language: 'Verilog',
    updated_at: '2026-05-10T12:00:00Z',
    topics: ['arm', 'verilog', 'rtl', 'cpu-design'],
    category: 'Silicon & RTL'
  },
  {
    name: 'DFT-Scan-Chain-Insertion',
    full_name: 'saivarshithm/DFT-Scan-Chain-Insertion',
    description: 'Design for Testability (DFT) scan chain insertion and ATPG fault coverage analysis for combinational logic.',
    html_url: 'https://github.com/saivarshithm/DFT-Scan-Chain-Insertion',
    stargazers_count: 5,
    forks_count: 0,
    language: 'TCL',
    updated_at: '2026-04-14T09:20:00Z',
    topics: ['dft', 'atpg', 'scan-chain', 'vlsi-testing'],
    category: 'Silicon & RTL'
  },
  {
    name: 'Embedded-PID-Controller',
    full_name: 'saivarshithm/Embedded-PID-Controller',
    description: 'Discrete-time anti-windup PID controller implemented in C with fixed-point arithmetic for microcontroller control loops.',
    html_url: 'https://github.com/saivarshithm/Embedded-PID-Controller',
    stargazers_count: 6,
    forks_count: 1,
    language: 'C',
    updated_at: '2026-03-25T15:00:00Z',
    topics: ['c', 'pid', 'embedded-systems', 'control-systems'],
    category: 'Silicon & RTL'
  },
  {
    name: 'saivarshithm.github.io',
    full_name: 'saivarshithm/saivarshithm.github.io',
    description: 'Awwwards-caliber personal portfolio built with Astro, React, TypeScript, GSAP, and Tailwind CSS v4.',
    html_url: 'https://github.com/saivarshithm/saivarshithm.github.io',
    homepage: 'https://saivarshithm.github.io',
    stargazers_count: 18,
    forks_count: 4,
    language: 'TypeScript',
    updated_at: '2026-11-20T18:00:00Z',
    topics: ['astro', 'portfolio', 'gsap', 'react', 'tailwind-v4'],
    category: 'Vibe-Coded Apps & Tools'
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
    { name: 'Astro 5 & React 19', level: 'Expert', desc: 'Zero-JS static island architecture, 100/100 Lighthouse performance' },
    { name: 'TypeScript & JavaScript', level: 'Expert', desc: 'Strict typing, modern async runtimes, isomorphic utilities' },
    { name: 'Tailwind CSS v4', level: 'Expert', desc: 'Modern @theme design token pipelines, fluid typography, glass surfaces' },
    { name: 'GSAP Motion Engine', level: 'Advanced', desc: 'ScrollTrigger, Flip layout transitions, telemetry scrambles' },
    { name: 'HTML5 Canvas & WebGL', level: 'Advanced', desc: '60fps GPU-composited oscilloscope waveforms, signal visualization' },
    { name: 'Google Antigravity Workflows', level: 'Advanced', desc: 'Agentic automation, multi-agent orchestration, vibe coding' },
    { name: 'GitHub Actions & Pages', level: 'Advanced', desc: 'Automated CI/CD build pipelines, static CDN deployment' },
    { name: 'Rapid Cross-Platform UI', level: 'Expert', desc: 'Native touch-feel dock, iOS safe area optimization, 12-col Bento' }
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
      'Authored FileVault (filevault.cc), serving 500+ NITK engineering undergraduates with course materials and notes.'
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
  }
];

export const PROFILE_INFO = {
  name: 'Saivarshith Mitukula',
  handle: 'saivarshithm',
  title: 'Electrical & Electronics Engineering Undergrad @ NITK Surathkal',
  subtitle: 'Digital Silicon & Power Electronics · Vibe-Coded Apps & Developer Platforms',
  tagline: 'Engineering digital silicon & power systems by day, vibe-coding fast software by night.',
  philosophy: 'DESIGN · BUILD · VERIFY',
  status: 'EEE @ NITK Surathkal · Ex-ISRO URSC Research Intern',
  cgpa: '8.56',
  links: {
    github: 'https://github.com/saivarshithm',
    linkedin: 'https://linkedin.com/in/saivarshithmitukula',
    x: 'https://x.com/Saivarshithm',
    orcid: 'https://orcid.org/0009-0007-7773-7587',
    portfolio: 'https://saivarshithm.github.io',
    filevault: 'https://filevault.cc'
  }
};
