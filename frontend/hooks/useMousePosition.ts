import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition | null {
  const [pos, setPos] = useState<MousePosition | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return pos;
}

export function useMouseNormalized(): { x: number; y: number } | null {
  const pos = useMousePosition();
  if (!pos) return null;
  return {
    x: pos.x / window.innerWidth,
    y: pos.y / window.innerHeight,
  };
}

export function useMouseVelocity(): { vx: number; vy: number } | null {
  const pos = useMousePosition();
  const prev = useRef<MousePosition | null>(null);
  const velocity = useRef({ vx: 0, vy: 0 });

  useEffect(() => {
    if (pos && prev.current) {
      velocity.current = {
        vx: pos.x - prev.current.x,
        vy: pos.y - prev.current.y,
      };
    }
    prev.current = pos;
  }, [pos]);

  return velocity.current;
}
