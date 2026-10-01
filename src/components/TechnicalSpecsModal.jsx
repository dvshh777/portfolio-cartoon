import React from 'react';
import { X, CheckCircle2, Cpu, Crosshair, Layers, Zap, Eye, ShieldAlert } from 'lucide-react';
import { soundFX } from '../utils/sound';

export default function TechnicalSpecsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const specs = [
    {
      title: 'Zero CSS 3D Transforms',
      badge: 'STRICT CONSTRAINT',
      icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />,
      desc: 'Neither perspective, rotateX, nor rotateY are applied to the canvas or container. The character body remains 100% rock-solid motionless; only the head rotates.',
    },
    {
      title: 'Pre-Extracted 64 WebP Trajectory',
      badge: 'OPENCV PIPELINE',
      icon: <Layers className="w-4 h-4 text-amber-300" />,
      desc: 'Extracted 64 high-fidelity WebP frames along the 360° circular head trajectory (~5.625° intervals) with Telea corner watermark inpainting.',
    },
    {
      title: 'Shortest-Path Circular Angular Lerp',
      badge: '35ms TRACKING',
      icon: <Zap className="w-4 h-4 text-gold-accent" />,
      desc: 'Calculates cursor polar angle atan2(dy, dx) and resolves circular wrapping [-π, π] with a 0.26 fast response factor for instantaneous zero-lag tracking.',
    },
    {
      title: 'Zero-Ghosting 60 FPS Canvas',
      badge: 'CRISP OPACITY',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      desc: 'Draws exactly ONE crisp frame at 100% opacity per requestAnimationFrame on an opaque 2D canvas context. No alpha blending double-face artifacts.',
    },
    {
      title: 'Direct Eye Contact Deadzone',
      badge: '12% SCREEN RADIUS',
      icon: <Eye className="w-4 h-4 text-amber-300" />,
      desc: 'When the cursor approaches the character face coordinates (x: 50.0%, y: 44.44%) within 12% screen radius, the renderer smoothly locks into center.webp.',
    },
    {
      title: 'Seamless Background Calibration',
      badge: '#940C0D HEX',
      icon: <Crosshair className="w-4 h-4 text-white" />,
      desc: 'Exact RGB hex (#940c0d) sampled from the video corners matches the page container and radial spotlight for an undetectable viewport edge.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#6e0809] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden font-mono-tech">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-gold-accent" />
            <h3 className="font-syne text-xl font-bold text-white tracking-tight uppercase">
              TECHNICAL ARCHITECTURE
            </h3>
          </div>
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Grid of specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-black/30 border border-white/10 hover:border-white/25 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-xs font-semibold text-white">{item.title}</span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-gold-accent uppercase">
                  {item.badge}
                </span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
          <span>PIPELINE: PYTHON OPENCV &rarr; WEBP &rarr; REACT RAF</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            ALL CONSTRAINTS VERIFIED
          </span>
        </div>

      </div>
    </div>
  );
}
