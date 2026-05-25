
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Globe, Sparkles, Rocket } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight text-white">
        <div className="text-center">
          <h2 className="text-4xl font-display font-black mb-8 tracking-tighter">Engine Component Missing</h2>
          <Link to="/" className="px-10 py-4 bg-brand-purple text-white rounded-2xl font-bold hover:scale-105 transition-transform inline-block">
            Return to Command Center
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 bg-midnight">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-3 text-brand-purple font-black text-xs uppercase tracking-widest mb-12 hover:-translate-x-1 transition-transform">
          <ArrowLeft size={18} /> Terminal Home
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-5 py-2 rounded-full glass-card text-brand-teal text-[10px] font-black uppercase tracking-[0.4em] mb-8 border-brand-teal/20">
              nikzdevz & Co. Registry
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black mb-6 tracking-tighter leading-none">{product.title}</h1>
            <p className="text-2xl text-brand-pink font-display font-bold mb-10 tracking-tight">{product.tagline}</p>
            
            <div className="space-y-6 text-xl text-slate-400 leading-relaxed mb-12 font-medium">
              <p>{product.longDescription || product.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-12">
              {product.features?.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="flex items-center gap-4 p-5 glass-card rounded-3xl border border-white/5 bg-white/[0.02]"
                >
                  <CheckCircle2 className="text-brand-teal flex-shrink-0" size={22} />
                  <span className="font-bold text-xs uppercase tracking-widest text-slate-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6">
              <Link 
                to="/#contact" 
                className="px-10 py-5 bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-brand-purple/20"
              >
                <Rocket size={18} /> Hire for Similar
              </Link>
              <a 
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 glass-card rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-white/5 transition-all border border-white/10 text-slate-300"
              >
                <Globe size={18} /> Visit Live Project
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-brand-purple to-brand-teal blur-[100px] opacity-20 rounded-[4rem]" />
            <div className="glass-card rounded-[3.5rem] overflow-hidden p-3 relative border border-white/10 shadow-3xl">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-auto rounded-[3rem] shadow-2xl object-cover aspect-[4/5]"
              />
              <div className="absolute bottom-10 left-10 right-10">
                 <div className="glass-card p-8 rounded-[2.5rem] backdrop-blur-3xl border border-white/10 bg-midnight/40">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-pink rounded-[1.5rem] flex items-center justify-center text-white shadow-xl">
                        <Sparkles size={32} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-500 mb-1">Core Identity</p>
                        <p className="font-display font-black text-2xl text-white">nikzdevz & Co.</p>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
