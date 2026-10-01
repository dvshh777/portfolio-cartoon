import React, { useEffect, useRef, useState, useCallback } from 'react';
import { soundFX } from '../utils/sound';

/**
 * Award-winning Zero-Ghosting 60 FPS Cursor Tracking Character Renderer
 * 
 * CRITICAL CONSTRAINTS MAINTAINED:
 * 1. Zero CSS 3D transforms (transform: none, perspective: none, rotateX/Y: none)
 * 2. Zero runtime MP4 video playback or currentTime seeking
 * 3. 64 pre-extracted WebP frames + center.webp loaded into memory
 * 4. Shortest-path circular angular lerp (lerpAngle) with ~0.26 factor (~35ms response)
 * 5. Exactly ONE crisp frame drawn per RAF at 100% opacity (no alpha blending ghosting)
 * 6. Center eye contact deadzone (< 12% screen radius)
 * 7. Seamless canvas background matching #940c0d
 */

const TOTAL_FRAMES = 64;
const ANGLE_STEP = (2 * Math.PI) / TOTAL_FRAMES;
const LERP_FACTOR = 0.26; // ~35ms response time, zero perceptible lag

// Helper for shortest-path angular difference on circle [-PI, PI]
function diffAngle(target, current) {
  let diff = (target - current) % (2 * Math.PI);
  if (diff < -Math.PI) diff += 2 * Math.PI;
  if (diff > Math.PI) diff -= 2 * Math.PI;
  return diff;
}

function normalizeAngle(angle) {
  angle = angle % (2 * Math.PI);
  if (angle < 0) angle += 2 * Math.PI;
  return angle;
}

export default function CharacterCanvas({
  onProgress,
  onLoaded,
  onTelemetry,
  deadzoneRadiusRatio = 0.12,
  autoOrbit = false,
  forceAngle = null, // for quick compass snap
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Loaded frames cache
  const framesRef = useRef([]);
  const centerFrameRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Runtime animation state
  const stateRef = useRef({
    currentAngle: 0,
    targetAngle: 0,
    cursorX: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    cursorY: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
    faceX: 0,
    faceY: 0,
    inDeadzone: true,
    lastInDeadzone: true,
    distance: 0,
    orbitAngle: 0,
    activeFrameIndex: 0,
    rafId: null,
    fps: 60,
    frameCount: 0,
    lastFpsTime: performance.now(),
  });

  // Preload all 64 WebP frames and center.webp
  useEffect(() => {
    let loadedCount = 0;
    const totalToLoad = TOTAL_FRAMES + 1;
    const frames = new Array(TOTAL_FRAMES);

    const checkComplete = () => {
      loadedCount++;
      const pct = Math.floor((loadedCount / totalToLoad) * 100);
      if (onProgress) onProgress(pct);

      if (loadedCount === totalToLoad) {
        framesRef.current = frames;
        setIsReady(true);
        if (onLoaded) onLoaded();
      }
    };

    // Load center frame
    const centerImg = new Image();
    centerImg.src = '/frames/center.webp';
    centerImg.onload = () => {
      centerFrameRef.current = centerImg;
      checkComplete();
    };
    centerImg.onerror = () => {
      // Fallback to /center.webp
      centerImg.src = '/center.webp';
      centerImg.onload = () => {
        centerFrameRef.current = centerImg;
        checkComplete();
      };
    };

    // Load 64 circular frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      // Pad with zero: frame_00.webp ... frame_63.webp
      const padded = i < 10 ? `0${i}` : `${i}`;
      img.src = `/frames/frame_${padded}.webp`;
      img.onload = () => {
        frames[i] = img;
        checkComplete();
      };
      img.onerror = () => {
        // Fallback to index-based filename if needed
        img.src = `/frames/${i}.webp`;
        img.onload = () => {
          frames[i] = img;
          checkComplete();
        };
      };
    }

    return () => {
      // Cleanup
    };
  }, [onProgress, onLoaded]);

  // Handle Mouse / Pointer Movement
  const handlePointerMove = useCallback((e) => {
    if (autoOrbit) return;
    const st = stateRef.current;
    st.cursorX = e.clientX;
    st.cursorY = e.clientY;
  }, [autoOrbit]);

  // Handle Touch Movement for mobile/tablet
  const handleTouchMove = useCallback((e) => {
    if (autoOrbit || !e.touches || !e.touches[0]) return;
    const st = stateRef.current;
    st.cursorX = e.touches[0].clientX;
    st.cursorY = e.touches[0].clientY;
  }, [autoOrbit]);

  // Window pointer listeners
  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handlePointerMove, handleTouchMove]);

  // Handle forced angle from compass clicks
  useEffect(() => {
    if (forceAngle !== null && forceAngle !== undefined) {
      const st = stateRef.current;
      st.targetAngle = normalizeAngle(forceAngle);
      st.inDeadzone = false;
    }
  }, [forceAngle]);

  // 60 FPS requestAnimationFrame Rendering Loop
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // High-performance opaque context

    let animationFrameId;

    const render = (time) => {
      const st = stateRef.current;

      // FPS calculation
      st.frameCount++;
      if (time - st.lastFpsTime >= 500) {
        st.fps = Math.round((st.frameCount * 1000) / (time - st.lastFpsTime));
        st.frameCount = 0;
        st.lastFpsTime = time;
      }

      // Handle canvas resolution with devicePixelRatio
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = Math.round(rect.width * dpr);
      const displayH = Math.round(rect.height * dpr);

      if (canvas.width !== displayW || canvas.height !== displayH) {
        canvas.width = displayW;
        canvas.height = displayH;
      }

      // Calculate scale to fit Robin naturally (contain/cover logic)
      // Original video is 1920x1080 (16:9).
      // Let's scale Robin so he fills the canvas majestically from chest to hair
      const videoW = 1920;
      const videoH = 1080;
      const scale = Math.max(displayW / videoW, displayH / videoH);
      const drawW = videoW * scale;
      const drawH = videoH * scale;
      const drawX = (displayW - drawW) / 2;
      const drawY = (displayH - drawH) / 2;

      // Robin's face center is measured at 50% width and 44.44% height of the 1920x1080 frame
      const faceCanvasX = drawX + 0.5 * drawW;
      const faceCanvasY = drawY + 0.4444 * drawH;

      // Face in viewport screen coordinates:
      const faceScreenX = rect.left + faceCanvasX / dpr;
      const faceScreenY = rect.top + faceCanvasY / dpr;
      st.faceX = faceScreenX;
      st.faceY = faceScreenY;

      // Auto Orbit mode logic
      if (autoOrbit) {
        st.orbitAngle = (st.orbitAngle + 0.025) % (2 * Math.PI);
        st.targetAngle = st.orbitAngle;
        st.inDeadzone = false;
        st.distance = 400;
      } else if (forceAngle === null) {
        // Normal cursor tracking
        const dx = st.cursorX - faceScreenX;
        const dy = st.cursorY - faceScreenY;
        st.distance = Math.hypot(dx, dy);

        // Calculate deadzone radius (default ~12% of screen dimension)
        const screenMin = Math.min(window.innerWidth, window.innerHeight);
        const deadzoneThreshold = screenMin * deadzoneRadiusRatio;

        if (st.distance < deadzoneThreshold) {
          st.inDeadzone = true;
          if (!st.lastInDeadzone) {
            soundFX.playEyeContact();
          }
        } else {
          st.inDeadzone = false;
          // Math.atan2(dy, dx) returns angle in radians [-PI, +PI]
          const rawAngle = Math.atan2(dy, dx);
          st.targetAngle = normalizeAngle(rawAngle);
        }
        st.lastInDeadzone = st.inDeadzone;
      }

      // Circular angular lerp (shortest-path)
      const diff = diffAngle(st.targetAngle, st.currentAngle);
      st.currentAngle = normalizeAngle(st.currentAngle + diff * LERP_FACTOR);

      // Map smoothed angle to 64 frames (each ~5.625° apart)
      let activeIndex = Math.round(st.currentAngle / ANGLE_STEP) % TOTAL_FRAMES;
      if (activeIndex < 0) activeIndex += TOTAL_FRAMES;
      st.activeFrameIndex = activeIndex;

      // ZERO GHOSTING: Exactly ONE frame drawn at 100% opacity
      ctx.globalAlpha = 1.0;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Pick image: Center eye contact if in deadzone, otherwise circular frame
      const imgToDraw = st.inDeadzone && centerFrameRef.current
        ? centerFrameRef.current
        : framesRef.current[activeIndex];

      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        // Draw crisp frame
        ctx.drawImage(imgToDraw, drawX, drawY, drawW, drawH);
      } else if (centerFrameRef.current) {
        // Fallback
        ctx.drawImage(centerFrameRef.current, drawX, drawY, drawW, drawH);
      }

      // Emit telemetry for luxury HUD widgets
      if (onTelemetry) {
        onTelemetry({
          angleDeg: (st.currentAngle * (180 / Math.PI)).toFixed(1),
          targetAngleDeg: (st.targetAngle * (180 / Math.PI)).toFixed(1),
          distancePx: Math.round(st.distance),
          inDeadzone: st.inDeadzone,
          activeFrameIndex: st.activeFrameIndex,
          totalFrames: TOTAL_FRAMES,
          fps: st.fps,
          lerpFactor: LERP_FACTOR,
          cursorX: Math.round(st.cursorX),
          cursorY: Math.round(st.cursorY),
          faceX: Math.round(faceScreenX),
          faceY: Math.round(faceScreenY),
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isReady, deadzoneRadiusRatio, autoOrbit, forceAngle, onTelemetry]);

  return (
    <div
      ref={containerRef}
      className="rock-solid-container fixed inset-0 w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        // Strictly enforce rock-solid motionless container (NO 3D transforms)
        transform: 'none',
        perspective: 'none',
        backgroundColor: '#940c0d',
      }}
    >
      <canvas
        ref={canvasRef}
        className="character-canvas"
        style={{
          transform: 'none',
          perspective: 'none',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
