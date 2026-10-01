import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../utils/sound';

export default function Navigation({ onContactClick }) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    const isNowOn = soundFX.toggle();
    setSoundEnabled(isNowOn);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 sm:px-10 py-5 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Brand Logo & Status */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="flex items-baseline gap-2 group transition-opacity duration-300"
          >
            <span className="font-syne text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-gold-accent transition-colors">
              VALENTINE
            </span>
            <span className="text-[10px] font-mono-tech tracking-widest text-white/50 uppercase">
              STUDIO &copy;26
            </span>
          </a>

          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-white/70">
              AVAILABLE FOR COMMISSIONS
            </span>
          </div>
        </div>

        {/* Center Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono-tech tracking-widest uppercase text-white/70">
          <a
            href="#hero"
            className="hover:text-gold-accent transition-colors relative py-1"
          >
            DIRECTION
          </a>
          <a
            href="#works"
            className="hover:text-gold-accent transition-colors relative py-1"
          >
            SELECTED WORKS
          </a>
          <a
            href="#recognition"
            className="hover:text-gold-accent transition-colors relative py-1"
          >
            RECOGNITION
          </a>
          <a
            href="#tech"
            className="hover:text-gold-accent transition-colors relative py-1"
          >
            SPECIFICATIONS
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Sound FX Toggle Button */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className={`p-2.5 rounded-full border transition-all duration-300 backdrop-blur-md ${
              soundEnabled
                ? 'bg-amber-400/20 border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(245,212,133,0.3)]'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Luxury CTA Pill */}
          <button
            onClick={() => {
              soundFX.playChime();
              if (onContactClick) onContactClick();
            }}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 text-black font-semibold text-xs tracking-wider uppercase overflow-hidden shadow-xl shadow-amber-900/30 hover:shadow-amber-400/20 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-1.5 font-mono-tech">
              <span>INITIATE BRIEF</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </div>

      </div>
    </header>
  );
}
