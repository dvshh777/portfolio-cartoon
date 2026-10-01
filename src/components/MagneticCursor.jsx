import React, { useEffect, useRef, useState } from 'react';

export default function MagneticCursor({ telemetry }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const posRef = useRef({
    mouseX: -100,
    mouseY: -100,
    ringX: -100,
    ringY: -100,
    isHovered: false,
    isVisible: false,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId;

    const onMouseMove = (e) => {
      posRef.current.mouseX = e.clientX;
      posRef.current.mouseY = e.clientY;
      if (!posRef.current.isVisible) {
        posRef.current.isVisible = true;
        setIsVisible(true);
      }
    };

    const onMouseLeave = () => {
      posRef.current.isVisible = false;
      setIsVisible(false);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        target.closest('.interactive-target')
      ) {
        posRef.current.isHovered = true;
        setIsHovered(true);
      } else {
        posRef.current.isHovered = false;
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    // Smooth RAF animation loop for trailing aura ring
    const animate = () => {
      const p = posRef.current;

      // Trailing lerp for aura ring (~0.18 factor)
      p.ringX += (p.mouseX - p.ringX) * 0.18;
      p.ringY += (p.mouseY - p.ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${p.mouseX}px, ${p.mouseY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${p.ringX}px, ${p.ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  const inDeadzone = telemetry?.inDeadzone;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block select-none">
      
      {/* Smooth Trailing Aura Ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      >
        <div
          className={`rounded-full border transition-all duration-300 ease-out flex items-center justify-center ${
            isHovered
              ? 'w-14 h-14 border-white/80 bg-white/10 backdrop-blur-[2px] shadow-[0_0_20px_rgba(255,255,255,0.35)]'
              : inDeadzone
              ? 'w-12 h-12 border-amber-300/80 bg-amber-300/10 shadow-[0_0_20px_rgba(245,212,133,0.4)]'
              : 'w-9 h-9 border-white/40 bg-white/[0.03]'
          }`}
        />
      </div>

      {/* Glowing White Custom Cursor Dot (Instantaneous zero-lag position) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isHovered
              ? 'w-2 h-2 bg-white shadow-[0_0_12px_#ffffff,0_0_24px_rgba(255,255,255,0.8)] scale-125'
              : inDeadzone
              ? 'w-2.5 h-2.5 bg-amber-200 shadow-[0_0_14px_#fde68a,0_0_28px_rgba(253,230,138,0.9)]'
              : 'w-2 h-2 bg-white shadow-[0_0_10px_#ffffff,0_0_18px_rgba(255,255,255,0.7)]'
          }`}
        />
      </div>

    </div>
  );
}
