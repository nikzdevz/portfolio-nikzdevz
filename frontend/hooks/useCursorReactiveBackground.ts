import { useEffect, useRef, useCallback } from 'react';

export function useCursorReactiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>(0);
  const frameRef = useRef(0);

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Simple pseudo-noise using layered sines
  const noise = (x: number, y: number, t: number) => {
    return (
      Math.sin(x * 0.008 + t * 0.4) * Math.cos(y * 0.006 + t * 0.3) * 0.5 +
      Math.sin(x * 0.003 - t * 0.2) * Math.cos(y * 0.004 + t * 0.25) * 0.3 +
      Math.sin((x + y) * 0.005 + t * 0.15) * 0.2
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const reduced = prefersReducedMotion();

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const animate = () => {
      frameRef.current++;
      const t = frameRef.current * 0.008;

      // Mouse influence factor (0-1, smooth)
      const mx = mouseRef.current.active ? mouseRef.current.x / w : 0.5;
      const my = mouseRef.current.active ? mouseRef.current.y / h : 0.5;
      const mouseInfluence = mouseRef.current.active ? 1 : 0;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      // Draw 4 aurora bands
      const bands = [
        { y: 0.25, speed: 0.6, amplitude: 0.12, opacity: 0.025, color: [0, 242, 254] },
        { y: 0.40, speed: 0.4, amplitude: 0.15, opacity: 0.018, color: [0, 200, 240] },
        { y: 0.55, speed: 0.5, amplitude: 0.10, opacity: 0.022, color: [0, 180, 220] },
        { y: 0.70, speed: 0.35, amplitude: 0.18, opacity: 0.015, color: [0, 242, 254] },
      ];

      for (const band of bands) {
        const baseY = h * band.y;
        const bandWidth = h * 0.25;

        // Create gradient along the band
        const grad = ctx.createLinearGradient(0, baseY - bandWidth, 0, baseY + bandWidth);

        const shiftX = reduced ? 0 : (mx - 0.5) * 60 * band.speed;
        const shiftY = reduced ? 0 : (my - 0.5) * 30 * band.speed;

        // Draw the band as a series of vertical segments with noise-based opacity
        const step = 20;
        for (let x = -10; x < w + 10; x += step) {
          const n = noise(x + shiftX, baseY + shiftY, t * band.speed);
          const yOff = n * h * band.amplitude;
          const alpha = band.opacity * (0.5 + n * 0.5);

          if (alpha <= 0.001) continue;

          const segGrad = ctx.createLinearGradient(0, baseY + yOff - bandWidth * 0.5, 0, baseY + yOff + bandWidth * 0.5);
          const [r, g, b] = band.color;
          segGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
          segGrad.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${alpha})`);
          segGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 1.8})`);
          segGrad.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, ${alpha})`);
          segGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.fillStyle = segGrad;
          ctx.fillRect(x, baseY + yOff - bandWidth * 0.5, step + 1, bandWidth);
        }
      }

      // Mouse proximity glow
      if (mouseRef.current.active && !reduced) {
        const glowGrad = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 250
        );
        glowGrad.addColorStop(0, 'rgba(0, 242, 254, 0.04)');
        glowGrad.addColorStop(0.4, 'rgba(0, 242, 254, 0.015)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(
          mouseRef.current.x - 250, mouseRef.current.y - 250,
          500, 500
        );
      }

      ctx.globalCompositeOperation = 'source-over';

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [prefersReducedMotion, noise]);

  return canvasRef;
}
