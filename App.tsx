
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ProductDetails from './pages/ProductDetails';

const ScrollToAnchor = () => {
  const { hash, pathname } = useLocation();
  
  useEffect(() => {
    // If we transition to a page without a hash, scroll to top
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      // If there is a hash, wait for content to render then scroll
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash, pathname]);
  
  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    // Ensure dark mode class is always present
    const root = window.document.documentElement;
    root.classList.add('dark');
  }, []);

  return (
    <Router>
      <ScrollToAnchor />
      <div className={`min-h-screen selection:bg-brand-purple selection:text-white bg-midnight text-white overflow-x-hidden`}>
        <Navbar />
        <Background />
        
        <Routes>
          {/* Explicitly define Home as the root */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          
          {/* Catch-all fallback ensures we always land on Home if path is unknown */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="w-12 h-1 bg-gradient-to-r from-brand-purple to-brand-teal mx-auto mb-8 rounded-full" />
            <div className="flex flex-col items-center mb-6">
              <p className="text-xl font-display font-black uppercase tracking-tighter">
                nikz<span className="text-brand-purple">devz</span>
              </p>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">& Co. Studio</p>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest max-w-md mx-auto leading-relaxed">
              &copy; {new Date().getFullYear()} Built by Nikhil Kumar Gupta. <br/> Engineering Digital Excellence Worldwide.
            </p>
            <div className="flex justify-center gap-8 mt-10">
              <a href="https://github.com/nikzdevz" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-purple transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/nikzdevz" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-teal transition-colors">LinkedIn</a>
              <a href="https://twitter.com/nikzdevz" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-pink transition-colors">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
