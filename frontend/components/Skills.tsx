
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Database, Server, Smartphone, Cpu, Cloud, Code2, Layout } from 'lucide-react';

const Skills: React.FC = () => {
  const allSkills = [
    { name: 'React', icon: <Layout /> },
    { name: 'Node.js', icon: <Server /> },
    { name: 'Python', icon: <Code2 /> },
    { name: 'Docker', icon: <Cpu /> },
    { name: 'Kubernetes', icon: <Cloud /> },
    { name: 'AWS', icon: <Cloud /> },
    { name: 'Android', icon: <Smartphone /> },
    { name: 'PostgreSQL', icon: <Database /> },
    { name: 'Flask', icon: <Code2 /> },
    { name: 'CI/CD', icon: <Server /> },
  ];

  return (
    <section className="py-24 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-4">Tech Arsenal.</h2>
            <p className="text-xl text-slate-400 max-w-xl">Deep expertise across the modern cloud-native stack.</p>
          </div>
          <div className="hidden md:block h-[1px] flex-1 bg-white/5 mx-12 mb-6" />
        </div>
      </div>

      <div className="relative flex overflow-hidden py-10">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {[...allSkills, ...allSkills, ...allSkills].map((skill, i) => (
            <div 
              key={i} 
              className="flex items-center gap-6 px-12 py-8 glass-card glass-shine rounded-[2.5rem] border border-white/5 transition-all hover:border-brand-purple/50 group"
            >
              <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-brand-purple/20 transition-colors">
                {/* Fixed: Cast the icon to ReactElement<any> to allow Lucide-specific props like 'size' during cloning */}
                {React.cloneElement(skill.icon as React.ReactElement<any>, { size: 40, className: "text-slate-400 group-hover:text-brand-purple transition-colors" })}
              </div>
              <span className="text-4xl font-display font-black text-slate-300 group-hover:text-white uppercase tracking-tighter">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
