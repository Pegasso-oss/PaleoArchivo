import React from 'react';
import { useUser } from '../context/useUser';
import { dinosaurios } from '../data/jurasico'; 
import DinoCard from '../components/DinoCard';
import { motion } from 'framer-motion';

const JurasicoPage = () => {
  const { theme } = useUser();
  const isLight = theme === 'light';
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      // isolate para evitar conflictos de z-index con el Header
      className={`min-h-screen px-4 py-12 relative isolate transition-colors duration-500 ${
        isLight ? 'bg-[#f5f2ed]' : 'bg-[#1d1914]'
      }`}
    >

      {/* Header */}
      <div className="max-w-[1820px] mx-auto mb-16">
        <button 
          onClick={() => window.history.back()} 
          className="text-amber-500/80 hover:text-amber-600 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors flex items-center gap-2 group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> VOLVER A PERIODOS
        </button>
        
        <h1 className={`text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none transition-colors ${
          isLight ? 'text-stone-900' : 'text-white'
        }`}>
          REGISTROS <span className="text-amber-600 font-black">JURÁSICOS</span>
        </h1>

        <div className="flex items-center gap-4 mt-4">
          <div className="h-0.5 w-12 bg-amber-600"></div>
          <p className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
            isLight ? 'text-stone-500' : 'text-slate-500'
          }`}>
              // Dinosaurios clasificados: {dinosaurios.length} (WIP)
          </p>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {dinosaurios.map((dino) => (
          <DinoCard 
            key={dino.id} 
            dino={dino} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default JurasicoPage;