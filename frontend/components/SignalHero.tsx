import { useRef, type PointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../constants';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export const SignalHero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 82, damping: 21, mass: 0.68 });
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 28, mass: 0.4 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerY, { stiffness: 76, damping: 19, mass: 0.8 });
  const tiltY = useSpring(pointerX, { stiffness: 76, damping: 19, mass: 0.8 });

  const plateY = useTransform(progress, [0, 1], ['0%', '-13%']);
  const plateScale = useTransform(progress, [0, 1], [1, 1.08]);
  const plateDepth = useTransform(progress, [0, 1], [0, -126]);
  const plateRotate = useTransform(progress, [0, 1], [0, -2.2]);
  const copyY = useTransform(progress, [0, 1], ['0%', '-13%']);
  const copyFade = useTransform(progress, [0, 0.92], [1, 0]);
  const indexY = useTransform(progress, [0, 1], ['0%', '34%']);
  const markerY = useTransform(progress, [0, 1], ['0%', '-45%']);
  const frameRotate = useTransform(progress, [0, 1], [-7, 5]);
  const gridDepth = useTransform(progress, [0, 1], [-95, 180]);
  const jellyX = useTransform(velocity, (next) => 1 + clamp(Math.abs(next) / 4800) * 0.017);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 5);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__field" aria-hidden="true">
        <motion.div className="hero__field-grid" style={reduceMotion ? undefined : { translateZ: gridDepth }} />
        <div className="hero__field-halo" />
      </div>

      <div className="container hero__inner">
        <motion.div
          className="hero__folio"
          style={reduceMotion ? undefined : { y: indexY }}
          aria-hidden="true"
        >
          <span>nikzdevz</span>
          <small>Independent portfolio</small>
        </motion.div>

        <div className="hero__topline">
          <span className="mono-label mono-label--accent">Software engineer / India</span>
          <span className="mono-label">Independent builder / Founder</span>
        </div>

        <div className="hero__heading">
          <motion.div
            className="hero__identity"
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 52, damping: 18, mass: 0.9 }}
          >
            <span className="mono-label">Portfolio / 2026</span>
            <span className="hero__identity-rule" aria-hidden="true" />
            <span className="mono-label">Nikhil Kumar Gupta</span>
          </motion.div>

          <motion.h1
            id="hero-title"
            className="hero__title"
            style={reduceMotion ? undefined : { y: copyY, scaleX: jellyX }}
            initial={reduceMotion ? false : { opacity: 0, y: 38, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 48, damping: 17, mass: 1 }}
          >
            Nikhil <span>Kumar</span> Gupta.
          </motion.h1>
        </div>

        <div className="hero__scene">
          <motion.div
            className="hero__plate"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 46, damping: 18, mass: 0.94 }}
          >
            <motion.div
              className="hero__plate-plane"
              style={
                reduceMotion
                  ? undefined
                  : {
                      y: plateY,
                      scale: plateScale,
                      translateZ: plateDepth,
                      rotate: plateRotate,
                      rotateX: tiltX,
                      rotateY: tiltY,
                    }
              }
            >
              <img
                src="/profile41.png"
                alt="Nikhil Kumar Gupta, founder of KraftStack Technologies"
                width="1679"
                height="937"
                fetchPriority="high"
              />
            </motion.div>
            <span className="hero__plate-grid" aria-hidden="true" />
            <span className="hero__plate-caption mono-label">The person behind the products</span>
            <span className="hero__plate-index mono-label" aria-hidden="true">NK / 01</span>
          </motion.div>

          <motion.div
            className="hero__frame"
            style={reduceMotion ? undefined : { rotate: frameRotate, y: markerY }}
            aria-hidden="true"
          />

          <motion.div
            className="hero__marker"
            style={reduceMotion ? undefined : { y: markerY, rotate: -frameRotate }}
            aria-hidden="true"
          >
            <span />
            <small>Based in India</small>
          </motion.div>

          <motion.div
            className="hero__copy"
            style={reduceMotion ? undefined : { y: copyY, opacity: copyFade }}
          >
            <span className="hero__eyebrow mono-label">Product engineer · Founder · Nikzdevz</span>
            <p className="hero__slogan">{COMPANY.shortName} / {COMPANY.slogan}</p>
            <p className="hero__summary">
              I turn ambitious product ideas into working tools for people, screens, devices
              and the spaces they share.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#products">
                Explore my work <ArrowDown size={15} aria-hidden="true" />
              </a>
              <a className="button" href="#contact">
                Work with me <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </motion.div>

        </div>

        <div className="hero__rail">
          <Link to="/projects" className="hero__projects-link">
            See every product <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <div className="hero__signal-row">
            <div className="hero__signal"><strong>05</strong><span>Focal builds</span></div>
            <div className="hero__signal"><strong>AI</strong><span>Native systems</span></div>
            <div className="hero__signal"><strong>3D</strong><span>Spatial thinking</span></div>
          </div>
          <span className="mono-label hero__scroll-cue">Scroll to enter</span>
        </div>
      </div>
    </section>
  );
};
