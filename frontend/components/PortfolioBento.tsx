import { useRef, type CSSProperties, type PointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import type { Project } from '../types';
import { ProductScene } from './ProductScene';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const cellLayout = ['', ' bento-dossier--small', ' bento-dossier--wide', ' bento-dossier--mini', ''];

interface ProjectDossierProps {
  product: Project;
  suite: string;
  className: string;
}

/**
 * A floating project slab. Its scroll position and pointer tilt are separate
 * from its position in the bento grid, so each piece moves in its own depth.
 */
const ProjectDossier = ({ product, suite, className }: ProjectDossierProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 78, damping: 22, mass: 0.68 });
  const velocity = useSpring(useVelocity(scrollY), {
    stiffness: 130,
    damping: 27,
    mass: 0.35,
  });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerY, { stiffness: 90, damping: 19, mass: 0.6 });
  const tiltY = useSpring(pointerX, { stiffness: 90, damping: 19, mass: 0.6 });
  const lift = useTransform(progress, [0, 0.48, 1], ['8%', '0%', '-7%']);
  const depth = useTransform(progress, [0, 0.48, 1], [-170, 0, 100]);
  const lean = useTransform(progress, [0, 0.5, 1], [-4.5, 0, 4]);
  const bodyX = useTransform(progress, [0, 0.5, 1], ['-7%', '0%', '6%']);
  const sceneX = useTransform(progress, [0, 0.5, 1], ['6%', '0%', '-8%']);
  const squash = useTransform(velocity, (value) => 1 + clamp(Math.abs(value) / 5000) * 0.018);
  const stretch = useTransform(velocity, (value) => 1 - clamp(Math.abs(value) / 5000) * 0.011);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 5);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const style = { '--suite': `"${suite}"` } as CSSProperties;

  return (
    <motion.article
      ref={ref}
      id={product.id}
      className={`bento-dossier ${className}`}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      data-composition={product.composition ?? 'canvas'}
      aria-labelledby={`bento-${product.id}-title`}
    >
      <motion.div
        className="bento-dossier__frame"
        style={
          reduceMotion
            ? undefined
            : {
                y: lift,
                translateZ: depth,
                rotate: lean,
                rotateX: tiltX,
                rotateY: tiltY,
                scaleX: squash,
                scaleY: stretch,
              }
        }
      >
        <div className="bento-dossier__rail">
          <span>{product.index} / {product.kicker}</span>
          <span className={`status-tag status-tag--${product.status}`}>{product.statusLabel}</span>
        </div>
        <div className="bento-dossier__body">
          <motion.div className="bento-dossier__copy" style={reduceMotion ? undefined : { x: bodyX }}>
            <span className="bento-dossier__suite">{suite}</span>
            <h3 id={`bento-${product.id}-title`}>{product.title}</h3>
            <p className="bento-dossier__tagline">{product.tagline}</p>
            <p className="bento-dossier__description">{product.description}</p>
            <ul className="bento-dossier__tags" aria-label="Product domains">
              {product.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <div className="bento-dossier__actions">
              <Link className="bento-dossier__enter" to={`/product/${product.id}`}>
                Open dossier <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              {product.link && (
                <a className="text-link" href={product.link} target="_blank" rel="noopener noreferrer">
                  Visit live <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.div>
          <motion.div className="bento-dossier__visual" style={reduceMotion ? undefined : { x: sceneX }} aria-hidden="true">
            <ProductScene scene={product.scene} caption={`${product.index} / ${product.kicker}`} />
          </motion.div>
        </div>
        <span className="bento-dossier__edge" aria-hidden="true" />
      </motion.div>
    </motion.article>
  );
};

export const PortfolioBento = ({ products }: { products: Project[] }) => (
  <div className="portfolio-bento">
    <div className="portfolio-bento__header">
      <span className="mono-label mono-label--accent">The KraftStack collection</span>
      <span className="mono-label">Live releases / active research / sealed work</span>
    </div>
    <div className="portfolio-bento__bays">
      {products.map((product, index) => (
        <ProjectDossier
          key={product.id}
          product={product}
          suite={product.suite ?? 'Featured project'}
          className={`bento-dossier--${index + 1}${cellLayout[index] ?? ''}`}
        />
      ))}
    </div>
    <div className="portfolio-bento__footer">
      <p>Five build stories. One working philosophy: make the complex feel clear.</p>
      <span className="mono-label">Scroll to enter the field / 01-05</span>
    </div>
  </div>
);
