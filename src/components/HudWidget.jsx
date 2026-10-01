import React from 'react';
import { Eye, Compass, Activity, Zap, ShieldCheck } from 'lucide-react';

export default function HudWidget({ telemetry }) {
  if (!telemetry) return null;

  const {
    angleDeg = 0,
    distancePx = 0,
    inDeadzone = false,
    activeFrameIndex = 0,
    totalFrames = 64,
    fps = 60,
    cursorX = 0,
    cursorY = 0,
  } = telemetry;

  // Compute compass cardinal name
  const deg = (parseFloat(angleDeg) + 360) % 360;
  let cardinal = 'E';
  if (deg >= 22.5 && deg < 67.5) cardinal = 'SE';
  else if (deg >= 67.5 && deg < 112.5) cardinal = 'S';
  else if (deg >= 112.5 && deg < 157.5) cardinal = 'SW';
  else if (deg >= 157.5 && deg < 202.5) cardinal = 'W';
  else if (deg >= 202.5 && deg < 247.5) cardinal = 'NW';
  else if (deg >= 247.5 && deg < 292.5) cardinal = 'N';
  else if (deg >= 292.5 && deg < 337.5) cardinal = 'NE';

  // Radar indicator coordinates on a 50px circle
  const radarRad = (parseFloat(angleDeg) * Math.PI) / 180;
  const radarX = inDeadzone ? 25 : 25 + 18 * Math.cos(radarRad);
  const radarY = inDeadzone ? 25 : 25 + 18 * Math.sin(radarRad);

  return (
    <div className="flex flex-col gap-3 max-w-xs font-mono-tech select-none pointer-events-auto">
      {/* Telemetry Capsule */}
      <div className="glass-panel-glow rounded-2xl p-4 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300">
        
        {/* Header with live indicator */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${inDeadzone ? 'bg-amber-400' : 'bg-emerald-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${inDeadzone ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            </span>
            <span className="text-[10px] tracking-widest font-semibold uppercase text-white/80">
              {inDeadzone ? 'EYE CONTACT LOCKED' : 'KINETIC TRACKING'}
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gold-accent font-semibold">
            {fps} FPS
          </span>
        </div>

        {/* Live Radar Compass and Coordinates */}
        <div className="flex items-center justify-between pt-3 gap-4">
          {/* Mini Radar */}
          <div className="relative w-[54px] h-[54px] rounded-full border border-white/20 bg-black/40 flex items-center justify-center shrink-0">
            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-white/10"></div>
            <div className="absolute h-full w-[1px] bg-white/10"></div>
            {/* Center Deadzone Circle */}
            <div className={`absolute w-[18px] h-[18px] rounded-full border ${inDeadzone ? 'border-amber-400 bg-amber-400/20' : 'border-white/20'} transition-colors duration-200`}></div>
            {/* Dynamic Target Reticle */}
            <div
              className="absolute w-2.5 h-2.5 rounded-full transition-transform duration-75"
              style={{
                left: `${radarX - 5}px`,
                top: `${radarY - 5}px`,
                backgroundColor: inDeadzone ? '#f5d485' : '#34d399',
                boxShadow: inDeadzone ? '0 0 8px #f5d485' : '0 0 8px #34d399',
              }}
            />
          </div>

          {/* Numbers Grid */}
          <div className="flex-1 grid grid-cols-2 gap-y-1.5 gap-x-2 text-[11px]">
            <div>
              <span className="text-white/40 block text-[9px] uppercase tracking-wider">BEARING</span>
              <span className="text-white font-medium">{angleDeg}° <span className="text-gold-accent">({cardinal})</span></span>
            </div>
            <div>
              <span className="text-white/40 block text-[9px] uppercase tracking-wider">DISTANCE</span>
              <span className="text-white font-medium">{distancePx}px</span>
            </div>
            <div>
              <span className="text-white/40 block text-[9px] uppercase tracking-wider">FRAME</span>
              <span className="text-white font-medium">#{activeFrameIndex} <span className="text-white/40">/ {totalFrames}</span></span>
            </div>
            <div>
              <span className="text-white/40 block text-[9px] uppercase tracking-wider">LATENCY</span>
              <span className="text-emerald-400 font-medium">~35ms</span>
            </div>
          </div>
        </div>

        {/* State Badge */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
          <div className="flex items-center gap-1.5">
            {inDeadzone ? <Eye className="w-3.5 h-3.5 text-amber-300" /> : <Compass className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{inDeadzone ? 'Looking into user eyes' : 'Angular lerp 0.26'}</span>
          </div>
          <span className="text-[9px] text-white/40">OPENCV 64WBP</span>
        </div>
      </div>
    </div>
  );
}
