
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Globe2, 
  Activity, 
  Users, 
  Cloud, 
  Compass, 
  Network,
  Command,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const CompanyHero: React.FC = () => {
  const panelVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    })
  };

  const getIcon = (id: string) => {
    switch(id) {
      case 'droidlabz': return <Smartphone className="text-brand-teal" />;
      case 'bean-attendance': return <Zap className="text-brand-pink" />;
      case 'devzstore': return <Layers className="text-brand-purple" />;
      case 'kraftresume': return <ShieldCheck className="text-brand-pink" />;
      default: return <Cpu />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* 1. Identity Core */}
      <motion.div
        custom={0}
        variants={panelVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="lg:col-span-8 glass-card glass-edge p-10 md:p-16 rounded-[3.5rem] border-white/5 relative overflow-hidden group flex flex-col justify-between min-h-[550px]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/10 blur-[100px] -mr-40 -mt-40 rounded-full" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-teal border border-white/10 shadow-inner">
              <Command size={24} />
            </div>
            <div className="h-[1px] w-16 bg-white/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-teal">Innovation Studio v3.0</span>
          </div>
          
          <h2 className="text-6xl md:text-[6.5rem] lg:text-[7.5rem] font-display font-black mb-10 leading-[0.82] tracking-tighter">
            nikzdevz <span className="text-white/5">& Co.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-14 leading-relaxed font-medium max-w-2xl">
            A private lab for building high-fidelity digital systems. We craft software that doesn't just work—it scales, automates, and empowers users across the globe.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-10">
          <Link to="/#suite" className="group relative px-12 py-6 bg-white text-midnight rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
            <span className="relative z-10 flex items-center gap-3">
              Ecosystem <ArrowRight size={14} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-teal to-brand-purple opacity-0 group-hover:opacity-10 transition-opacity" />
          </Link>
          <div className="flex items-center gap-4 text-slate-500">
            <Activity size={18} className="text-brand-teal animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] whitespace-nowrap">Production Line: Online</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Global Impact */}
      <motion.div
        custom={1}
        variants={panelVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="lg:col-span-4 glass-card p-12 rounded-[3.5rem] border-white/5 flex flex-col justify-between overflow-hidden relative group bg-gradient-to-b from-transparent to-brand-purple/[0.03]"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 group-hover:rotate-45 duration-700">
           <Globe2 size={300} />
        </div>
        
        <div>
          <div className="flex items-center gap-4 text-brand-purple mb-12">
            <Globe2 size={28} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Worldwide Reach</span>
          </div>
          <h4 className="text-8xl font-display font-black mb-4 tracking-tighter">150+</h4>
          <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.2em] leading-relaxed">
            International clients served with custom scalable solutions.
          </p>
        </div>

        <div className="mt-16 space-y-5">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Market Satisfaction</span>
            <span className="text-brand-purple">98.2%</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-[1px]">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '98%' }}
              transition={{ duration: 1.8, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-brand-purple to-brand-pink rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* 3. Technology Orbit */}
      <motion.div
        custom={2}
        variants={panelVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="lg:col-span-5 glass-card p-12 rounded-[3.5rem] border-white/5 flex flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-brand-teal/[0.02] -z-10" />
        
        <div className="mb-12">
          <div className="flex items-center gap-4 text-brand-teal mb-10">
            <Compass size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Product Stack</span>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {PRODUCTS.map((p, i) => (
              <a 
                key={i}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-[2rem] glass-card border-white/5 flex flex-col items-center text-center group cursor-pointer transition-all hover:translate-y-[-8px] hover:bg-white/[0.05]"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform shadow-xl">
                  {getIcon(p.id)}
                </div>
                <p className="text-[10px] font-black text-white uppercase tracking-tighter mb-1">{p.title}</p>
                <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest">{p.tagline.split(' ').slice(0, 2).join(' ')}</p>
              </a>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-midnight/30 border border-white/5">
          <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
            "Engineering products that define the intersection of utility and design."
          </p>
        </div>
      </motion.div>

      {/* 4. Infrastructure Mesh */}
      <motion.div
        custom={3}
        variants={panelVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="lg:col-span-7 glass-card p-12 md:p-16 rounded-[3.5rem] border-white/5 overflow-hidden relative"
      >
        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-brand-pink mb-8">
                <Network size={24} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Studio Engagement</span>
              </div>
              <h4 className="text-7xl font-display font-black mb-2 tracking-tighter">40,000+</h4>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-loose">
                Verified active users across the <br/> nikzdevz ecosystem.
              </p>
            </div>
            
            <div className="mt-12 pt-12 border-t border-white/5">
              <div className="flex items-center gap-4 text-brand-teal mb-6">
                <Cloud size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">DevOps Integrity</span>
              </div>
              <div className="flex gap-3">
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1 }} className="h-2 flex-[3] bg-brand-teal rounded-full origin-left" />
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.2 }} className="h-2 flex-[2] bg-brand-teal/40 rounded-full origin-left" />
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.4 }} className="h-2 flex-[1] bg-brand-teal/10 rounded-full origin-left" />
              </div>
              <p className="mt-4 text-[9px] font-black uppercase text-slate-600 tracking-widest">AWS Cloud Distribution: Global</p>
            </div>
          </div>

          <div className="bg-midnight/20 rounded-[2.5rem] p-10 border border-white/5 flex flex-col justify-center backdrop-blur-3xl">
             <div className="space-y-10">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-midnight flex items-center justify-center text-brand-purple shadow-2xl border border-white/5">
                    <Cpu size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Logic Engine</span>
                      <span className="text-[9px] font-black uppercase text-brand-purple">Stable</span>
                    </div>
                    <div className="h-2 w-full bg-midnight rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '94%' }} transition={{ duration: 2 }} className="h-full bg-brand-purple" />
                    </div>
                  </div>
               </div>
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-midnight flex items-center justify-center text-brand-teal shadow-2xl border border-white/5">
                    <Activity size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">System Uptime</span>
                      <span className="text-[9px] font-black uppercase text-brand-teal">99.9%</span>
                    </div>
                    <div className="h-2 w-full bg-midnight rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 2.5 }} className="h-full bg-brand-teal" />
                    </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
        
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(var(--brand-pink) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
      </motion.div>

    </div>
  );
};

export default CompanyHero;
