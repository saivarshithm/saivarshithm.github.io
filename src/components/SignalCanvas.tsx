import React, { useEffect, useRef } from 'react';

interface SignalCanvasProps {
  className?: string;
}

export const SignalCanvas: React.FC<SignalCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisible = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Intersection Observer to auto-pause when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.current = entry.isIntersecting;
          if (entry.isIntersecting && !animFrameId.current && !prefersReducedMotion) {
            animFrameId.current = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let phase = 0;

    const render = () => {
      if (!isVisible.current) {
        animFrameId.current = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Subtle oscilloscope graticule grid
      const gridSpacing = 40;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Channel 1: Phosphor Oscilloscope Emerald Trace (#10B981)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 10;

      const midY1 = height * 0.45;
      for (let x = 0; x < width; x += 3) {
        // Superposition of resonant frequencies (100kHz fundamental + 3rd harmonic + subtle decay)
        const normalizedX = x / width;
        const wave1 = Math.sin(normalizedX * 14 + phase) * 26;
        const wave2 = Math.sin(normalizedX * 28 - phase * 1.5) * 8;
        const wave3 = Math.cos(normalizedX * 6 + phase * 0.5) * 12;
        const envelope = Math.sin(normalizedX * Math.PI); // Pinched at borders
        const y = midY1 + (wave1 + wave2 + wave3) * envelope;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Channel 2: Logic-Analyzer Cyan Waveform (#38BDF8)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.4;
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 8;

      const midY2 = height * 0.62;
      for (let x = 0; x < width; x += 3) {
        const normalizedX = x / width;
        // PWM / square pulse approximation with rounded transitions
        const rawWave = Math.sin(normalizedX * 20 + phase * 1.2);
        const pwmLike = Math.tanh(rawWave * 4) * 18;
        const subHarmonic = Math.sin(normalizedX * 40 + phase) * 4;
        const envelope = Math.sin(normalizedX * Math.PI);
        const y = midY2 + (pwmLike + subHarmonic) * envelope;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Channel 3: Copper-Gold Clock Telemetry Trace (#F59E0B)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.lineWidth = 1;
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 4;

      const midY3 = height * 0.78;
      for (let x = 0; x < width; x += 4) {
        const normalizedX = x / width;
        const carrier = Math.sin(normalizedX * 60 + phase * 2) * 6;
        const envelope = Math.sin(normalizedX * Math.PI);
        const y = midY3 + carrier * envelope;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Reset shadow for performance
      ctx.shadowBlur = 0;

      phase += 0.025;

      if (!prefersReducedMotion) {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render(); // Single static frame
    } else {
      animFrameId.current = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
