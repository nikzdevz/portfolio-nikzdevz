
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Small threshold for immediate feedback without jitter
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-[padding,background-color,box-shadow] duration-500 ease-in-out border-b ${
        scrolled 
          ? 'py-4 bg-midnight/80 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' 
          : 'py-8 bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-teal flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
            <Rocket size={20} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-display font-black tracking-tight uppercase">
              nikz<span className="text-brand-purple">devz</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand-teal transition-colors mt-0.5">
              & Co. Studio
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-brand-teal hover:translate-y-[-1px] ${
                location.pathname === link.path && !location.hash ? 'text-brand-purple' : 'text-slate-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full glass-card border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6 bg-midnight/95 backdrop-blur-3xl">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-display font-black uppercase tracking-widest border-b border-white/5 pb-4 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
