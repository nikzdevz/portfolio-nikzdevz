import { motion, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { useSpringScene } from '../hooks/useSpringScene';

interface SceneSectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Applies a restrained perspective arrival and a velocity-responsive jelly
 * settle to a page section without retargeting its links or focus behavior.
 */
export const SceneSection = ({ children, className = '' }: SceneSectionProps) => {
  const scene = useSpringScene();
  const opacity = useTransform(scene.progress, [0, 0.15, 1], [0.72, 1, 1]);

  return (
    <div ref={scene.ref} className={`scene-section${className ? ` ${className}` : ''}`}>
      <motion.div
        className="scene-section__inner"
        style={
          scene.reduceMotion
            ? undefined
            : {
                y: scene.lift,
                translateZ: scene.depth,
                rotateX: scene.rotateX,
                rotateY: scene.rotateY,
                rotate: scene.velocityTilt,
                scaleX: scene.squash,
                scaleY: scene.stretch,
                opacity,
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};

