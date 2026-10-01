import React from 'react';

export default function Preloader({ progress, isReady }) {
  if (isReady) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#940c0d] luxury-bg-gradient transition-opacity duration-700 select-none">
      <div className="flex flex-col items-center max-w-sm w-full px-6 text-center">
        
        {/* Monogram */}
        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 rounded-full border-t-2 border-amber-300 animate-spin" />
          <span className="font-syne text-2xl font-bold text-white tracking-widest">V</span>
        </div>

        {/* Title */}
        <h2 className="font-syne text-xl tracking-tight text-white mb-2 uppercase">
          VALENTINE STUDIO
        </h2>
        <p className="text-xs font-mono-tech text-white/50 tracking-widest uppercase mb-8">
          STREAMING 64 HIGH-OCTANE FRAMES
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-white/10 rounded-full h-1.5 p-0.5 overflow-hidden mb-3 border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="flex justify-between w-full text-[10px] font-mono-tech text-white/60">
          <span>ZERO-GHOSTING 60 FPS</span>
          <span className="text-gold-accent font-semibold">{progress}%</span>
        </div>

      </div>
    </div>
  );
}
