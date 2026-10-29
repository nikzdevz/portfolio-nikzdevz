import { useRef } from 'react';
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * A shared, scroll-driven depth system. Springs remove the mechanical feel of
 * direct scroll mapping; velocity adds a small squash-and-settle response.
 */
export const useSpringScene = (travel = 'end start') => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', travel],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 82, damping: 22, mass: 0.6 });
  const velocity = useSpring(useVelocity(scrollY), {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const depth = useTransform(progress, [0, 0.48, 1], [-140, 0, 95]);
  const lift = useTransform(progress, [0, 0.48, 1], ['7%', '0%', '-5%']);
  const rotateX = useTransform(progress, [0, 0.48, 1], [8, 0, -5]);
  const rotateY = useTransform(progress, [0, 0.48, 1], [-7, 0, 6]);
  const squash = useTransform(velocity, (next) => 1 + clamp(Math.abs(next) / 4200) * 0.026);
  const stretch = useTransform(velocity, (next) => 1 - clamp(Math.abs(next) / 4200) * 0.014);
  const velocityTilt = useTransform(velocity, (next) => clamp(next / 4200) * -1.5);

  return {
    ref,
    reduceMotion: Boolean(reduceMotion),
    progress,
    depth,
    lift,
    rotateX,
    rotateY,
    squash,
    stretch,
    velocityTilt,
  };
};
