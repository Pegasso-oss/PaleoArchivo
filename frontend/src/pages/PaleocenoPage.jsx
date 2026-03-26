import React from 'react';
import { dinosaurios } from '../data/paleoceno'; 
import DinoCard from '../components/DinoCard';
import { motion } from 'framer-motion'; // 1. Importamos la librería de animación

// ... imports igual

const PaleocenoPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }} 
      className="min-h-screen bg-[#0f0d0c] px-4 py-12"
    >
      {/* Header */}
      <div className="max-w-[1240px] mx-auto mb-16">
        <button 
          onClick={() => window.history.back()} 
          // He cambiado amber a emerald en el hover
          className="text-stone-500 hover:text-emerald-500 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors flex items-center gap-2 group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> VOLVER A PERIODOS
        </button>
        
        <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
          {/* Aquí el color de la Era: EMERALD */}
          REGISTROS DEL <span className="text-emerald-500 font-black">PALEÓGENO</span>
        </h1>
        
        <div className="flex items-center gap-4 mt-4">
          {/* Línea decorativa en verde */}
          <div className="h-0.5 w-12 bg-emerald-500"></div>
          <p className="text-stone-500 font-mono text-xs uppercase tracking-[0.2em]">
             // Animales clasificados: {dinosaurios.length} (WIP)
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

export default PaleocenoPage;