# Saivarshith Mitukula — Engineering Portfolio

> **DESIGN · BUILD · VERIFY**  
> Electrical & Electronics Engineering @ NITK Surathkal · Ex-ISRO URSC Research Intern  
> Live Deployment: [saivarshithm.github.io](https://saivarshithm.github.io)

---

## ⚡ Architecture & Modern Stack

- **Core SSG Framework:** [Astro 5](https://astro.build/) — Static Site Generation with near-zero JS baseline for 100/100 Lighthouse performance.
- **Interactive Islands:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (`client:load` and `client:visible`).
- **Styling & Design Tokens:** [Tailwind CSS v4](https://tailwindcss.com/) with semantic `@theme` design tokens and obsidian glass-carbon styling.
- **Physics & Motion:** [GSAP 3](https://greensock.com/gsap/) with hardware-accelerated animations and spring mode toggles.
- **Hardware Telemetry & Visuals:** GPU-composited HTML5 Canvas 2D electromagnetic signal background & interactive real-time oscilloscope / PWM synthesizer (60fps, auto-pausing offscreen, `prefers-reduced-motion` compliant).
- **Icons & Schematic Symbols:** Lucide React + custom inline SVG laboratory symbols (MOSFET, NAND logic gates, coupled WPT coils, buck converter topology, RV32IM pipeline block).

---

## 🛠️ Flagship Engineering Case Studies

1. **5-Stage Pipelined RV32IM RISC-V Processor** (`saivarshithm/riscv-5stage-pipeline-cache`):
   - Synthesizable Verilog-2001 core with EX/MEM data forwarding, hazard detection unit, 2-level Harvard cache hierarchy, achieving `1.57 CPI` and `3.18x speedup` over single-cycle baseline.
2. **Space-Grade Buck Converter** (U.R. Rao Satellite Centre, ISRO):
   - Wide-input `11V–42V to 5V, 4A` radiation-tolerant DC-DC converter with closed-loop voltage-mode PWM at `100 kHz`, `600 µH / 50 µF` LC filter optimization in LTspice, benchmarked against TI `TPS7H5001-SP`.
3. **FileVault** (`filevault.cc` / `saivarshithm/FileVault-NITK`):
   - Centralized academic course-notes and resource platform engineered for 500+ active NITK Surathkal students with sub-millisecond search latency.
4. **SKY130 PDK CMOS Circuit Characterization** (`saivarshithm/CMOS-Circuit-Design-and-Simulation-Using-SKY130`):
   - Google-SkyWater 130nm standard cell SPICE characterization, noise margin extraction ($NM_H, NM_L$), and W/L inverter sizing cutting rise delay from `148 ps` to `37 ps`.
5. **Wireless Power Transfer (WPT) & 3D EM Modeling**:
   - Hardware prototype with ferrite flux-concentrator bars, aluminum shielding plates, and 4.7 mm Litz coils coupled with Ansys Maxwell 3D electromagnetic simulations (`85 kHz`, $k = 0.28$, $88.7\%$ efficiency).
6. **Full-Duplex FPGA UART & SPWM Multilevel Inverter**:
   - Synthesizable 10-bit frame UART on FPGA with Python telemetry + 5-level cascaded H-bridge inverter in MATLAB/Simulink with THD $< 4.8\%$.

---

## 🚀 Local Development

```bash
# Install dependencies
pnpm install

# Start local development server
pnpm run dev

# Production build (outputs to /dist)
pnpm run build

# Preview production build locally
pnpm run preview
```

---

## 🌐 GitHub Pages Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys to `https://saivarshithm.github.io` on every push to `main` or `master`.
