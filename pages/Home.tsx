
import React from 'react';
import Hero from '../components/Hero';
import CompanyHero from '../components/CompanyHero';
import Skills from '../components/Skills';
import { PRODUCTS, TESTIMONIALS } from '../constants';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, ExternalLink, Star, Shield, Cpu, Code2, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    title: "Cloud Systems",
    tag: "DEVOPS & INFRA",
    desc: "Architecting resilient Kubernetes clusters & automated CI/CD pipelines on AWS/GCP.",
    icon: <Shield className="w-8 h-8" />,
    color: "brand-teal",
    size: "large"
  },
  {
    title: "Full-Stack Dev",
    tag: "WEB ENGINEERING",
    desc: "End-to-end applications using React, Flask, and Django with cloud scalability.",
    icon: <Code2 className="w-8 h-8" />,
    color: "brand-purple",
    size: "small"
  },
  {
    title: "AI Automation",
    tag: "PROMPT ENG",
    desc: "Building LLM-powered tools and generative workflows for modern teams.",
    icon: <Sparkles className="w-8 h-8" />,
    color: "brand-pink",
    size: "small"
  },
  {
    title: "Mobile Labs",
    tag: "ANDROID NATIVE",
    desc: "Visual-first Android experiences and native library development via nikzdevz studio.",
    icon: <Cpu className="w-8 h-8" />,
    color: "white",
    size: "medium"
  }
];

const Home: React.FC = () => {
  return (
    <main className="bg-midnight">
      <Hero />
      
      {/* Studio Command Center - Full Width Bento */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <CompanyHero />
        </div>
      </section>
      
      {/* Product Suite Section - Bento Grid */}
      <section id="suite" className="py-32 px-6">
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-5xl md:text-8xl font-display font-extrabold tracking-tighter mb-8">
            Studio <span className="text-brand-purple">Focus.</span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-brand-purple to-brand-teal rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Product Card - Large (DroidLabZ) */}
          <motion.div
            whileHover={{ y: -10 }}
            className="md:col-span-2 glass-card glass-shine rounded-5xl p-12 md:p-20 relative overflow-hidden group border-brand-purple/20"
          >
            <div className="relative z-10">
              <div className="mb-10 w-20 h-20 rounded-3xl bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                <ExternalLink size={40} />
              </div>
              <h3 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tight">{PRODUCTS[0].title}</h3>
              <p className="text-2xl text-slate-400 mb-12 max-w-xl leading-relaxed font-medium">
                {PRODUCTS[0].description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={PRODUCTS[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-midnight rounded-2xl font-black uppercase tracking-widest inline-block hover:scale-105 transition-transform"
                >
                  Visit Website
                </a>
                <Link 
                  to={`/product/${PRODUCTS[0].id}`}
                  className="px-10 py-5 glass-card rounded-2xl font-black uppercase tracking-widest inline-block hover:bg-white/5 transition-colors"
                >
                  Deep Dive
                </Link>
              </div>
            </div>
            <div className="absolute -right-20 bottom-0 w-1/2 opacity-20 group-hover:opacity-40 transition-opacity">
               <img src={PRODUCTS[0].image} className="rounded-tl-[5rem] shadow-2xl" alt={PRODUCTS[0].title} />
            </div>
          </motion.div>

          {/* Side Card 1 (BEAN Attendance) */}
          <motion.div
            whileHover={{ y: -10 }}
            className="glass-card glass-shine rounded-5xl p-12 flex flex-col justify-between border-brand-teal/20"
          >
            <div>
              <div className="mb-8 p-4 w-fit rounded-2xl bg-brand-teal/10 text-brand-teal">
                <Star size={24} />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">{PRODUCTS[1].title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">{PRODUCTS[1].description}</p>
            </div>
            <div className="flex justify-between items-center mt-10">
               <a href={PRODUCTS[1].link} target="_blank" rel="noopener noreferrer" className="font-black text-brand-teal tracking-widest uppercase text-sm flex items-center gap-2 group">
                 Open App <ArrowUpRight className="group-hover:translate-x-1 transition-transform" />
               </a>
               <Link to={`/product/${PRODUCTS[1].id}`} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Case Study</Link>
            </div>
          </motion.div>

          {/* Row 2 - Bento continues (Devzstore) */}
          <motion.div
            whileHover={{ y: -10 }}
            className="glass-card glass-shine rounded-5xl p-12 flex flex-col justify-between border-brand-pink/20"
          >
             <h3 className="text-3xl font-display font-bold mb-4">{PRODUCTS[2].title}</h3>
             <p className="text-slate-400 font-medium mb-8">{PRODUCTS[2].description}</p>
             <div className="flex items-center gap-4">
               <a href={PRODUCTS[2].link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors shadow-lg">
                  <ArrowUpRight />
               </a>
               <Link to={`/product/${PRODUCTS[2].id}`} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-pink transition-colors">Plugin Hub Info</Link>
             </div>
          </motion.div>

          {/* Kraftresume Large Bento Piece */}
          <motion.div
            whileHover={{ y: -10 }}
            className="md:col-span-2 glass-card glass-shine rounded-5xl p-12 md:p-16 flex items-center justify-between gap-10 bg-gradient-to-br from-midnight to-surface"
          >
            <div className="relative z-10">
              <h3 className="text-4xl font-display font-bold mb-4">{PRODUCTS[3].title}</h3>
              <p className="text-slate-400 max-w-md font-medium mb-8">{PRODUCTS[3].description}</p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={PRODUCTS[3].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-5 bg-brand-pink text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-pink/20"
                >
                  Visit Kraftresume
                </a>
                <Link 
                  to={`/product/${PRODUCTS[3].id}`}
                  className="inline-block px-8 py-4 border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all"
                >
                  Engine Details
                </Link>
              </div>
            </div>
            <div className="hidden lg:block w-48 h-48 rounded-full bg-brand-pink/10 blur-3xl" />
          </motion.div>
        </div>
      </section>

      <Skills />

      {/* Strategic Solutions */}
      <section className="py-32 px-6 bg-midnight relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div>
            <h2 className="text-5xl md:text-8xl font-display font-extrabold tracking-tighter mb-4">Strategic <br/> Solutions.</h2>
            <p className="text-xl text-slate-400 font-medium">Professional services for high-growth ventures.</p>
          </div>
          <Link to="/projects" className="px-10 py-5 glass-card rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-brand-purple transition-all hover:text-white shadow-xl shadow-brand-purple/10">
            View All Work
          </Link>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-fr">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.01 }}
              className={`glass-card rounded-[3rem] p-8 md:p-10 flex flex-col justify-between border-white/5 relative overflow-hidden group 
                ${service.size === 'large' ? 'md:col-span-8' : 
                  service.size === 'medium' ? 'md:col-span-7' : 'md:col-span-4'}`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-${service.color} to-transparent`} />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all border border-white/10 shadow-lg bg-white/5 group-hover:bg-${service.color}/20 text-white`}>
                  {React.cloneElement(service.icon as React.ReactElement<any>, { size: 24 })}
                </div>
                <span className={`text-[9px] font-black tracking-[0.3em] uppercase opacity-40 mb-2 block group-hover:text-${service.color} transition-colors`}>{service.tag}</span>
                <h3 className="text-2xl md:text-3xl font-display font-black mb-3 tracking-tight">{service.title}</h3>
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-4">
                <p className="text-base text-slate-400 font-medium max-w-sm leading-snug">
                  {service.desc}
                </p>
                <Link to="/#contact" className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:bg-${service.color} group-hover:text-midnight group-hover:border-transparent group-hover:rotate-45 shrink-0`}>
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
          
          {/* Decorative Callout Bento Piece */}
          <motion.div 
             className="md:col-span-5 glass-card rounded-[3rem] p-10 border-brand-pink/20 bg-gradient-to-br from-brand-pink/5 to-transparent flex flex-col justify-center items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-brand-pink/20 flex items-center justify-center mb-4 text-brand-pink">
               <Globe className="animate-spin-slow" size={24} />
            </div>
            <h4 className="text-xl font-display font-black mb-1 uppercase tracking-tight">Global Collab</h4>
            <p className="text-slate-400 font-medium text-sm">Open for remote contracts worldwide.</p>
            <Link to="/#contact" className="mt-6 font-black text-brand-pink uppercase tracking-widest text-[10px] border-b border-brand-pink/30 pb-0.5 hover:border-brand-pink transition-all">Start Project</Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-surface/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={i} 
              className="glass-card glass-shine p-12 rounded-4xl border border-white/5"
            >
              <div className="flex gap-1.5 mb-10">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill="currentColor" className="text-brand-pink" />)}
              </div>
              <p className="text-2xl mb-12 leading-relaxed text-slate-300 font-medium">"{t.quote}"</p>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-teal flex items-center justify-center font-black text-white text-xl">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-display font-bold text-xl text-white">{t.name}</p>
                  <p className="text-xs text-brand-teal uppercase tracking-widest font-black">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modern Minimalist Contact */}
      <section id="contact" className="py-40 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-1"
          >
            <div className="glass-card glass-shine rounded-5xl p-20 md:p-32 border-white/5">
              <span className="text-brand-pink font-black text-[11px] uppercase tracking-[0.6em] mb-12 block">New Business</span>
              <h2 className="text-6xl md:text-[8rem] font-display font-extrabold mb-12 tracking-tighter leading-none">
                Hire <span className="text-gradient text-glow">Nikhil.</span>
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-20">
                <a href="mailto:nikzdreamer2001@gmail.com" className="text-2xl md:text-4xl font-display font-bold hover:text-brand-purple transition-colors border-b-2 border-brand-purple/20 pb-2">
                  nikzdreamer2001@gmail.com
                </a>
              </div>
              
              <div className="flex flex-wrap justify-center gap-12">
                <a href="https://wa.me/916387577224" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center group-hover:bg-brand-teal transition-all group-hover:text-midnight">
                    <Phone size={28} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">WhatsApp</p>
                    <p className="font-bold">+91 6387577224</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center">
                    <Mail size={28} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Availability</p>
                    <p className="font-bold">Mon - Fri, 9am - 6pm IST</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
