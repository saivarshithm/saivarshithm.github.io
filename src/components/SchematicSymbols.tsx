import React from 'react';

interface SymbolProps {
  className?: string;
  size?: number;
  color?: string;
}

export const MosfetSymbol: React.FC<SymbolProps> = ({ className = '', size = 32, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="MOSFET Schematic Symbol"
  >
    {/* Gate Lead */}
    <path d="M8 32H24" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 16V48" stroke={color} strokeWidth="3" strokeLinecap="round" />
    
    {/* Channel Segments */}
    <path d="M32 16V24" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M32 28V36" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M32 40V48" stroke={color} strokeWidth="3" strokeLinecap="round" />

    {/* Drain */}
    <path d="M32 20H48V8" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Source */}
    <path d="M32 44H48V56" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Substrate / Bulk with Arrow */}
    <path d="M32 32H48V44" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <polygon points="34,32 40,29 40,35" fill={color} />
  </svg>
);

export const LogicGateSymbol: React.FC<SymbolProps> = ({ className = '', size = 32, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="NAND Logic Gate"
  >
    {/* Inputs */}
    <path d="M8 22H22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8 42H22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    {/* Gate Body */}
    <path
      d="M22 14V50H36C45.941 50 54 41.941 54 32C54 22.059 45.941 14 36 14H22Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Inversion Bubble for NAND */}
    <circle cx="56" cy="32" r="3" stroke={color} strokeWidth="2" fill="#10141B" />
  </svg>
);

export const InductorWaveform: React.FC<SymbolProps> = ({ className = '', size = 32, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Inductor and Waveform"
  >
    {/* Coils */}
    <path
      d="M8 32C8 24 16 24 16 32C16 24 24 24 24 32C24 24 32 24 32 32C32 24 40 24 40 32C40 24 48 24 48 32C48 24 56 24 56 32"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Magnetic core lines */}
    <line x1="12" y1="18" x2="52" y2="18" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
    <line x1="12" y1="14" x2="52" y2="14" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
    {/* Waveform ripple below */}
    <path
      d="M10 50Q18 42 26 50T42 50T58 50"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.8"
    />
  </svg>
);

export const RiscvCoreSymbol: React.FC<SymbolProps> = ({ className = '', size = 32, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="RISC-V 5-Stage Core"
  >
    {/* Core frame */}
    <rect x="10" y="10" width="44" height="44" rx="4" stroke={color} strokeWidth="2.5" />
    {/* 5 Pipeline stages dividing marks */}
    <line x1="18" y1="10" x2="18" y2="54" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    <line x1="27" y1="10" x2="27" y2="54" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    <line x1="36" y1="10" x2="36" y2="54" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    <line x1="45" y1="10" x2="45" y2="54" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    {/* Stage Labels acronyms */}
    <text x="14" y="34" fill={color} fontSize="6" fontFamily="monospace" textAnchor="middle">IF</text>
    <text x="22.5" y="34" fill={color} fontSize="6" fontFamily="monospace" textAnchor="middle">ID</text>
    <text x="31.5" y="34" fill={color} fontSize="6" fontFamily="monospace" textAnchor="middle">EX</text>
    <text x="40.5" y="34" fill={color} fontSize="6" fontFamily="monospace" textAnchor="middle">ME</text>
    <text x="49.5" y="34" fill={color} fontSize="6" fontFamily="monospace" textAnchor="middle">WB</text>
    {/* Forwarding bus arrow */}
    <path d="M40 46H24V40" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="24,38 21,41 27,41" fill="#F59E0B" />
  </svg>
);

export const BuckConverterSymbol: React.FC<SymbolProps> = ({ className = '', size = 32, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Buck Converter Topology"
  >
    {/* Input Vin */}
    <path d="M8 20H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* High-Side Switch (MOSFET box) */}
    <rect x="18" y="14" width="10" height="12" rx="2" stroke={color} strokeWidth="2" fill="rgba(16, 185, 129, 0.1)" />
    {/* Inductor L */}
    <path d="M28 20C30 15 34 15 36 20C38 15 42 15 44 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    {/* Output Vout */}
    <path d="M44 20H56" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Freewheeling Diode */}
    <path d="M28 20V32" stroke={color} strokeWidth="2" />
    <polygon points="25,36 31,36 28,42" fill={color} />
    <line x1="25" y1="42" x2="31" y2="42" stroke={color} strokeWidth="2" />
    <path d="M28 42V50" stroke={color} strokeWidth="2" />
    {/* Output Capacitor C */}
    <path d="M48 20V30" stroke={color} strokeWidth="2" />
    <line x1="44" y1="30" x2="52" y2="30" stroke={color} strokeWidth="2.5" />
    <line x1="44" y1="34" x2="52" y2="34" stroke={color} strokeWidth="2.5" />
    <path d="M48 34V50" stroke={color} strokeWidth="2" />
    {/* Ground rail */}
    <line x1="20" y1="50" x2="56" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const WptCoilSymbol: React.FC<SymbolProps> = ({ className = '', size = 32, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Wireless Power Transfer Coils"
  >
    {/* Primary Tx Coil */}
    <path d="M12 16C24 16 24 48 12 48" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M18 20C26 20 26 44 18 44" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    {/* Secondary Rx Coil */}
    <path d="M52 16C40 16 40 48 52 48" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
    <path d="M46 20C38 20 38 44 46 44" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    {/* Magnetic Flux Lines in Airgap */}
    <path d="M26 28C32 28 32 36 26 36" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />
    <path d="M38 28C32 28 32 36 38 36" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />
    <circle cx="32" cy="32" r="2" fill="#F59E0B" />
  </svg>
);
