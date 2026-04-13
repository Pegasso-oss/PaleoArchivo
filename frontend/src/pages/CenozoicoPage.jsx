import React, { useState, useEffect } from 'react';
import EraCard from '../components/EraCard';
import { motion } from 'framer-motion';

const CenozoicoPage = () => {
  // --- LÓGICA DE TEMA REACTIVO ---
  const [isLight, setIsLight] = useState(document.documentElement.classList.contains('light-theme'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light-theme'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);
  // -------------------------------

  const periodos = [
    {
      id: 'paleogeno',
      name: 'PALEÓGENO',
      age: '66 - 23 m.a.',
      image: 'https://dinosauriacreatures.com/cdn/shop/articles/Paleogeno.jpg?v=1678198294',
      desc: 'El amanecer de los mamíferos. Tras la extinción de los dinosaurios, la vida se recupera en selvas tropicales.'
    },
    {
      id: 'neogeno',
      name: 'NEÓGENO',
      age: '23 - 2.5 m.a.',
      image: 'https://www.mundoprehistorico.com/wp-content/uploads/Phorusrhacos-01.jpg',
      desc: 'La era de las praderas. Los mamíferos evolucionan a formas gigantes y aparecen los primeros homínidos.'
    },
    {
      id: 'cuaternario',
      name: 'CUATERNARIO',
      age: '2.5 m.a. - Actualidad',
      image: 'https://geologicalmanblog.wordpress.com/wp-content/uploads/2016/10/glaciaciones.jpg',
      desc: 'Grandes glaciaciones y el ascenso de los humanos modernos en un mundo de mamuts y tigres dientes de sable.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen px-4 py-12 transition-colors duration-500 ${isLight ? 'bg-[#f5f2ed]' : 'bg-[#1d1914]'}`}
    >
      <div className="max-w-[1400px] mx-auto mb-16">
        <button 
          onClick={() => window.history.back()}
          className="text-amber-500/80 hover:text-amber-600 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors flex items-center gap-2 group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> VOLVER A LAS ERAS
        </button>
        
        <h1 className={`text-5xl md:text-7xl font-black tracking-tighter italic leading-none uppercase transition-colors ${isLight ? 'text-stone-900' : 'text-white'}`}>
          PERIODOS DEL <span className="text-amber-600">CENOZOICO</span>
        </h1>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="h-0.5 w-12 bg-amber-600"></div>
          <p className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${isLight ? 'text-stone-500' : 'text-slate-500'}`}>
             // Registros de la megafauna reciente
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {periodos.map((p) => (
          <EraCard 
            key={p.id}
            id={`cenozoico/${p.id}`}
            name={p.name}
            age={p.age}
            image={p.image}
          >
            {p.desc}
          </EraCard>
        ))}
      </div>
    </motion.div>
  );
};

export default CenozoicoPage;