
import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Background: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Create different movement speeds for parallax layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Main Base Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-midnight" />
      
      {/* Floating Blobs Layer 1 */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-purple opacity-20 blur-[120px]"
      />
      
      {/* Floating Blobs Layer 2 */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-teal opacity-10 blur-[120px]"
      />
      
      {/* Floating Blobs Layer 3 */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-brand-pink opacity-15 blur-[120px]"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: `radial-gradient(var(--brand-1) 0.5px, transparent 0.5px)`, backgroundSize: '40px 40px' }} 
      />
    </div>
  );
};

export default Background;
