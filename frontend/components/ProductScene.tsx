import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { SceneKind } from '../types';
import { SceneInstrument } from './SceneInstrument';

const SCENE_LABELS: Record<SceneKind, string> = {
  cinema: 'Shared cinema',
  android: 'Visual Android studio',
  desk: 'AI study surround',
  classified: 'Classified dossier',
  beacon: 'Presence field',
};

interface ProductSceneProps {
  scene: SceneKind;
  caption?: string;
  hero?: boolean;
}

export const ProductScene = ({ scene, caption, hero = false }: ProductSceneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center', 'end start'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.3,
  });
  const sceneY = useTransform(progress, [0, 0.5, 1], ['8%', '0%', '-9%']);
  const sceneScale = useTransform(progress, [0, 0.5, 1], [0.88, 1, 1.09]);
  const sceneDepth = useTransform(progress, [0, 0.5, 1], [-150, 0, 110]);
  const sceneRotate = useTransform(progress, [0, 0.5, 1], [-9, 0, 6]);
  const sceneRotateX = useTransform(progress, [0, 0.5, 1], [11, 0, -6]);
  const sceneRotateY = useTransform(progress, [0, 0.5, 1], [-12, 0, 8]);
  const orbitRotate = useTransform(progress, [0, 1], [-26, 32]);
  const orbitReverse = useTransform(progress, [0, 1], [36, -18]);
  const glowX = useTransform(progress, [0, 0.5, 1], ['20%', '50%', '78%']);
  const intensity = useTransform(progress, [0, 0.5, 1], [0.18, 0.42, 0.2]);

  return (
    <div
      ref={ref}
      className={`scene-frame${hero ? ' scene-frame--hero' : ''}`}
      data-scene={scene}
      aria-hidden="true"
    >
      <motion.div
        className="scene-frame__glow"
        style={shouldReduceMotion ? undefined : { left: glowX, opacity: intensity }}
      />
      <motion.div
        className="scene-frame__orbit"
        style={shouldReduceMotion ? undefined : { rotate: orbitRotate }}
      />
      <motion.div
        className="scene-frame__orbit scene-frame__orbit--reverse"
        style={shouldReduceMotion ? undefined : { rotate: orbitReverse }}
      />
      <div className="scene-frame__horizon" />
      <motion.div
        className="scene-instrument"
        style={
          shouldReduceMotion
            ? { transform: 'scale(0.96)' }
            : {
                y: sceneY,
                scale: sceneScale,
                translateZ: sceneDepth,
                rotate: sceneRotate,
                rotateX: sceneRotateX,
                rotateY: sceneRotateY,
              }
        }
      >
        <SceneInstrument scene={scene} />
      </motion.div>
      <span className="scene-caption">{caption ?? SCENE_LABELS[scene]}</span>
    </div>
  );
};
