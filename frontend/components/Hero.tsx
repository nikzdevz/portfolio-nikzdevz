
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { ArrowRight, Terminal, Braces, Layers, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROLES = [
  { text: "Full-Stack Developer", color: "text-brand-purple" },
  { text: "DevOps Architect", color: "text-brand-teal" },
  { text: "Prompt Engineer", color: "text-brand-pink" },
  { text: "Android Specialist", color: "text-brand-purple" },
  { text: "Cloud Systems Engineer", color: "text-white" }
];

const CODE_SHARDS = [
  { text: "const app = new Architect();", top: "15%", left: "5%", delay: 0 },
  { text: "docker push nikzdevz/core:v3", top: "75%", left: "10%", delay: 1 },
  { text: "git commit -m 'feat: innovation'", top: "25%", right: "8%", delay: 0.5 },
  { text: "terraform apply -auto-approve", top: "65%", right: "12%", delay: 1.2 },
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / 30);
    mouseY.set((clientY - innerHeight / 2) / 30);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-20 overflow-hidden bg-midnight"
    >
      {/* 1. KINETIC DATA BACKGROUND */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none">
          <h1 className="text-[25vw] font-display font-black text-white/[0.015] leading-none uppercase tracking-tighter">
            ARCHITECT
          </h1>
          <div className="flex gap-20 mt-[-5vw]">
            <span className="text-[10vw] font-black text-brand-purple/[0.03]">BUILD</span>
            <span className="text-[10vw] font-black text-brand-teal/[0.03]">SCALE</span>
            <span className="text-[10vw] font-black text-brand-pink/[0.03]">DEPLOY</span>
          </div>
        </div>
      </motion.div>

      {/* 2. FLOATING CODE SHARDS */}
      <div className="absolute inset-0 pointer-events-none hidden xl:block">
        {CODE_SHARDS.map((shard, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            style={{ 
              top: shard.top, 
              left: shard.left, 
              right: shard.right,
              x: mouseX, 
              y: useTransform(scrollY, [0, 1000], [0, i % 2 === 0 ? -400 : -600])
            }}
            className="absolute z-20"
          >
            <div className="glass-card px-6 py-3 rounded-xl border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
              <code className="text-[10px] font-mono text-slate-300 tracking-wider">
                {shard.text}
              </code>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl w-full relative z-30 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Terminal-Inspired Content */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start overflow-visible">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 flex items-center gap-4"
          >
            <div className="px-5 py-2 rounded-full glass-card border-brand-teal/30 flex items-center gap-3 shadow-[0_0_30px_rgba(0,242,254,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white">nikzdevz.deploy_success</span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 animate-pulse hidden sm:inline">| ARCHITECT MODE</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-[6.5rem] lg:text-[7.8rem] font-display font-black mb-8 leading-[0.8] tracking-tighter">
              <span className="block text-white opacity-40">Engineering the</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-teal to-brand-pink text-glow filter saturate-150 drop-shadow-2xl">
                Digital Frontier.
              </span>
            </h1>
          </motion.div>

          {/* Fixed Terminal-style Role Reveal */}
          <div className="h-28 md:h-24 w-full max-w-2xl flex items-center justify-center lg:justify-start mb-10 overflow-visible">
            <div className="w-full flex flex-col lg:flex-row items-center lg:items-center gap-3 text-slate-400 font-medium">
              <div className="flex items-center gap-2 opacity-60 flex-shrink-0 whitespace-nowrap">
                <Terminal size={20} className="text-brand-teal" />
                <span className="text-sm md:text-xl">Nikhil is a</span>
              </div>
              
              <div className="relative h-12 w-full flex items-center justify-center lg:justify-start overflow-visible min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ y: 15, opacity: 0, skewX: 5 }}
                    animate={{ y: 0, opacity: 1, skewX: 0 }}
                    exit={{ y: -15, opacity: 0, skewX: -5 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className={`text-xl md:text-3xl font-display font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap ${ROLES[roleIndex].color}`}
                  >
                    <span className="opacity-50">{'>'}</span>
                    {ROLES[roleIndex].text}
                    <motion.span 
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 md:w-3 h-6 md:h-8 bg-current opacity-50"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <Link
              to="/#contact"
              className="group relative w-full sm:w-auto px-10 py-5 bg-white text-midnight rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-xl active:scale-95 text-center"
            >
              <span className="flex items-center justify-center gap-3 relative z-10">
                Initialize <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/projects"
              className="group relative w-full sm:w-auto px-10 py-5 glass-card rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-white/5 transition-colors border border-white/5 overflow-hidden text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Source Code <Braces size={18} className="group-hover:rotate-12 transition-transform text-brand-purple" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Architecture Console */}
        <div className="relative flex justify-center lg:justify-end perspective-1000 mt-12 lg:mt-0">
          <motion.div 
            style={{ 
              x: mouseX, 
              y: mouseY, 
              rotateX: useTransform(mouseY, [-20, 20], [5, -5]),
              rotateY: useTransform(mouseX, [-20, 20], [-5, 5]),
              scale
            }}
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="relative w-64 h-80 md:w-80 md:h-[480px] lg:w-[420px] lg:h-[560px] rounded-[3rem] md:rounded-[3.5rem] p-2 md:p-2.5 glass-card border-white/10 shadow-2xl overflow-visible">
              <div className="w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative">
                <img 
                  src="profile4.png" 
                  alt="Nikhil Gupta"
                  className="w-full h-full object-cover brightness-[1.1] contrast-[1.05] grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/40" />
                <div className="absolute top-6 right-6 md:top-8 md:right-8 flex flex-col items-end gap-1">
                  <span className="text-[8px] md:text-[9px] font-black uppercase text-brand-teal tracking-[0.3em] opacity-80">ID: NIKZ-99</span>
                </div>
              </div>
            </div>

            {/* Repositioned and Scaled Status Cards for Mobile */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 -left-4 md:top-1/4 md:-left-12 glass-card p-3 md:p-6 rounded-2xl md:rounded-3xl border-brand-purple/20 shadow-2xl z-20 backdrop-blur-3xl scale-75 md:scale-100 origin-right md:origin-center"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple border border-brand-purple/20">
                   <Layers size={16} className="md:w-5 md:h-5" />
                </div>
                <div>
                   <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-500">Stack</p>
                   <p className="text-[10px] md:text-sm font-display font-black text-white whitespace-nowrap">Cloud Mesh</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 -right-4 md:bottom-1/4 md:-right-12 glass-card p-3 md:p-6 rounded-2xl md:rounded-3xl border-brand-teal/20 shadow-2xl z-20 backdrop-blur-3xl scale-75 md:scale-100 origin-left md:origin-center"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal border border-brand-teal/20">
                   <Cpu size={16} className="md:w-5 md:h-5" />
                </div>
                <div>
                   <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-500">Core</p>
                   <p className="text-[10px] md:text-sm font-display font-black text-white whitespace-nowrap">DevOps Native</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        style={{ scaleX: scrollY }}
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-purple via-brand-teal to-brand-pink origin-left opacity-20"
      />
    </section>
  );
};

export default Hero;
