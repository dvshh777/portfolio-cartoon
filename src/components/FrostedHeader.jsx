import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFX } from '../utils/sound';

export default function FrostedHeader({ onContactClick, onAboutClick }) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = (e) => {
    e.stopPropagation();
    const isNowOn = soundFX.toggle();
    setSoundEnabled(isNowOn);
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none">
      <nav className="frosted-nav-pill px-6 sm:px-8 py-2.5 rounded-full flex items-center gap-6 sm:gap-8 shadow-2xl transition-all duration-300 hover:border-white/30">
        
        {/* [WORK] */}
        <a
          href="#works"
          onClick={() => soundFX.playClick()}
          className="text-xs sm:text-sm font-sans tracking-widest text-white/80 hover:text-white transition-colors py-1 group relative flex items-center"
        >
          <span className="font-mono-tech text-[10px] text-white/40 mr-1 group-hover:text-amber-300 transition-colors">[</span>
          <span className="font-semibold tracking-wider">WORK</span>
          <span className="font-mono-tech text-[10px] text-white/40 ml-1 group-hover:text-amber-300 transition-colors">]</span>
        </a>

        {/* [ABOUT] */}
        <button
          onClick={() => {
            soundFX.playClick();
            if (onAboutClick) onAboutClick();
          }}
          className="text-xs sm:text-sm font-sans tracking-widest text-white/80 hover:text-white transition-colors py-1 group relative flex items-center"
        >
          <span className="font-mono-tech text-[10px] text-white/40 mr-1 group-hover:text-amber-300 transition-colors">[</span>
          <span className="font-semibold tracking-wider">ABOUT</span>
          <span className="font-mono-tech text-[10px] text-white/40 ml-1 group-hover:text-amber-300 transition-colors">]</span>
        </button>

        {/* [CONTACT] */}
        <button
          onClick={() => {
            soundFX.playChime();
            if (onContactClick) onContactClick();
          }}
          className="text-xs sm:text-sm font-sans tracking-widest text-white/80 hover:text-white transition-colors py-1 group relative flex items-center"
        >
          <span className="font-mono-tech text-[10px] text-white/40 mr-1 group-hover:text-amber-300 transition-colors">[</span>
          <span className="font-semibold tracking-wider">CONTACT</span>
          <span className="font-mono-tech text-[10px] text-white/40 ml-1 group-hover:text-amber-300 transition-colors">]</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          aria-label="Toggle Sound"
          className="p-1 rounded-full text-white/40 hover:text-amber-300 transition-colors ml-1"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-300" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

      </nav>
    </header>
  );
}
