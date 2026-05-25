
import React from 'react';
import { FEATURED_PROJECTS, PRODUCTS } from '../constants';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const ProjectsPage: React.FC = () => {
  const allProjects = [...PRODUCTS, ...FEATURED_PROJECTS];

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-purple font-bold mb-12 hover:-translate-x-1 transition-transform">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6">
            All <span className="text-brand-purple">Projects</span>
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            A comprehensive list of products, client works, and experimental projects.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden group h-full flex flex-col"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.isProduct && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-pink text-white text-xs font-bold uppercase tracking-widest">
                    Studio Product
                  </div>
                )}
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-secondary mb-6 line-clamp-3">{project.description}</p>
                <div className="mt-auto flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-secondary uppercase font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.isProduct && (
                      <Link 
                        to={`/product/${project.id}`}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center"
                      >
                        Deep Dive
                      </Link>
                    )}
                    {project.link ? (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-brand-purple hover:text-white transition-colors"
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    ) : (
                      <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center opacity-30 cursor-not-allowed">
                        <ArrowUpRight size={20} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectsPage;
