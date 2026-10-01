import React from 'react';
import { Play, Pause, Eye, RotateCw, Sparkles, Navigation } from 'lucide-react';
import { soundFX } from '../utils/sound';

export default function InteractiveControls({
  autoOrbit,
  setAutoOrbit,
  onSnapDirection,
  deadzoneRadiusRatio,
  setDeadzoneRadiusRatio,
}) {
  const directions = [
    { label: 'NW', angle: (225 * Math.PI) / 180 },
    { label: 'N', angle: (270 * Math.PI) / 180 },
    { label: 'NE', angle: (315 * Math.PI) / 180 },
    { label: 'W', angle: (180 * Math.PI) / 180 },
    { label: 'CENTER', angle: null, isCenter: true },
    { label: 'E', angle: 0 },
    { label: 'SW', angle: (135 * Math.PI) / 180 },
    { label: 'S', angle: (90 * Math.PI) / 180 },
    { label: 'SE', angle: (45 * Math.PI) / 180 },
  ];

  return (
    <div className="flex flex-col gap-3 max-w-xs font-mono-tech select-none pointer-events-auto">
      {/* Controls Container */}
      <div className="glass-panel rounded-2xl p-4 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-white/80 text-[11px] font-semibold tracking-wider uppercase">
            <Navigation className="w-3.5 h-3.5 text-gold-accent" />
            <span>KINETIC CONTROLLER</span>
          </div>
          <button
            onClick={() => {
              soundFX.playClick();
              setAutoOrbit(!autoOrbit);
            }}
            className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all duration-300 ${
              autoOrbit
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
            }`}
          >
            {autoOrbit ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{autoOrbit ? 'ORBITING' : 'AUTO ORBIT'}</span>
          </button>
        </div>

        {/* 3x3 Direction Compass Grid */}
        <div className="pt-3">
          <div className="text-[10px] text-white/40 mb-2 uppercase tracking-wider flex justify-between">
            <span>QUICK DIRECTION SNAP</span>
            <span className="text-[9px] text-gold-accent">CLICK / HOVER</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {directions.map((d, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundFX.playClick();
                  onSnapDirection(d.angle);
                }}
                onMouseEnter={() => {
                  soundFX.playClick();
                }}
                className={`py-2 px-1 rounded-lg text-[10px] font-semibold transition-all duration-200 border ${
                  d.isCenter
                    ? 'bg-gradient-to-r from-amber-400/20 to-red-400/20 border-amber-400/40 text-amber-200 hover:border-amber-300 hover:bg-amber-400/30'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/15 hover:border-white/25 hover:text-white'
                }`}
              >
                {d.isCenter ? (
                  <span className="flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3 text-amber-300" />
                    <span>EYES</span>
                  </span>
                ) : (
                  d.label
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Deadzone Radius Selector */}
        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px]">
          <span className="text-white/40 uppercase tracking-wider">EYE CONTACT RADIUS</span>
          <div className="flex items-center gap-1">
            {[0.08, 0.12, 0.18].map((ratio) => (
              <button
                key={ratio}
                onClick={() => {
                  soundFX.playClick();
                  setDeadzoneRadiusRatio(ratio);
                }}
                className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                  deadzoneRadiusRatio === ratio
                    ? 'bg-gold-accent text-black font-semibold'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {Math.round(ratio * 100)}%
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
