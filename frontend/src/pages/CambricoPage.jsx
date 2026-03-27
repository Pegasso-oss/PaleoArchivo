import React from 'react';
import { dinosaurios } from '../data/cambrico'; 
import DinoCard from '../components/DinoCard';
import { motion } from 'framer-motion'; // 1. Importamos la librería de animación

const CambricoPage = () => {
  return (
    <motion.div 
          initial={{ opacity: 0, y: 30 }} // Empieza invisible y 30px abajo
          animate={{ opacity: 1, y: 0 }}  // Termina visible y en su sitio
          transition={{ duration: 0.8, ease: "easeOut" }} // Duración de casi 1 segundo para que sea suave
          className="min-h-screen bg-[#1d1914] px-4 py-12"
        >

      {/* Header */}
      <div className="max-w-[1240px] mx-auto mb-16"> {/* max-w ajustado al grid */}
        <button 
          onClick={() => window.history.back()} 
          className="text-amber-500/80 hover:text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors flex items-center gap-2 group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> VOLVER A PERIODOS
        </button>
        
        <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
          REGISTROS <span className="text-blue-600 font-black">Cámbricos</span>
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="h-0.5 w-12 bg-blue-600"></div>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">
             //  Animales clasificados: {dinosaurios.length} (WIP)
          </p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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

export default CambricoPage;