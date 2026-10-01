import React, { useEffect, useState } from 'react';

export default function CustomCursor({ telemetry }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  if (!visible || !telemetry) return null;

  const { inDeadzone, faceX, faceY } = telemetry;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden hidden md:block">
      {/* Dynamic line connecting cursor to face center */}
      {faceX && faceY && (
        <svg className="w-full h-full absolute inset-0">
          <line
            x1={pos.x}
            y1={pos.y}
            x2={faceX}
            y2={faceY}
            stroke={inDeadzone ? 'rgba(245, 212, 133, 0.45)' : 'rgba(255, 255, 255, 0.12)'}
            strokeWidth={inDeadzone ? 1.5 : 1}
            strokeDasharray={inDeadzone ? 'none' : '3, 4'}
          />
        </svg>
      )}

      {/* Target Reticle */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 pointer-events-none"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
            inDeadzone
              ? 'border-amber-400 bg-amber-400/20 scale-125 shadow-[0_0_12px_rgba(245,212,133,0.5)]'
              : 'border-white/40 bg-white/5'
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              inDeadzone ? 'bg-amber-300' : 'bg-white'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
