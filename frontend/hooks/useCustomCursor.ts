import { useEffect, useRef } from 'react';

export function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Only show custom cursor on devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    let cx = -100, cy = -100;
    let rx = -100, ry = -100;

    const onMouseMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
    };

    // Hover state for interactive elements
    const onOverInteractive = () => {
      dot.classList.add('expanded');
      ring.classList.add('expanded');
    };
    const onLeaveInteractive = () => {
      dot.classList.remove('expanded');
      ring.classList.remove('expanded');
    };

    const animate = () => {
      // Dot follows instantly
      dot.style.left = `${cx}px`;
      dot.style.top = `${cy}px`;

      // Ring follows with lerp
      rx += (cx - rx) * 0.15;
      ry += (cy - ry) * 0.15;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Attach hover listeners to interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, .interactive');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onOverInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    // MutationObserver for dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        if (!el.hasAttribute('data-cursor-bound')) {
          el.setAttribute('data-cursor-bound', '');
          el.addEventListener('mouseenter', onOverInteractive);
          el.addEventListener('mouseleave', onLeaveInteractive);
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return { dotRef, ringRef };
}
