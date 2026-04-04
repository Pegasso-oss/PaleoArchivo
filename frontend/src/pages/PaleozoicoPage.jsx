import React, { useState, useEffect } from 'react';
import EraCard from '../components/EraCard';
import { motion } from 'framer-motion';

const PaleozoicoPage = () => {
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
      id: 'cambrico',
      name: 'CÁMBRICO',
      age: '541 - 485 m.a.',
      image: 'https://content.nationalgeographic.com.es/medio/2020/10/31/reconstruccion-artistica-de-kylinxia-zhangi-en-su-ambiente_415cb01b_1280x584.jpg',
      desc: 'Conocido por la "explosión cámbrica", un rápido aumento en la diversidad de vida marina, incluyendo los primeros artrópodos.'
    },
    {
      id: 'ordovicico',
      name: 'ORDOVÍCICO',
      age: '485 - 444 m.a.',
      image: 'https://www.vistaalmar.es/images/stories/imagenes/ordovicico-oceano.jpg',
      desc: 'Dominación de los invertebrados marinos, aparición de los primeros vertebrados y colonización de las costas por plantas primitivas.'
    },
    {
      id: 'silurico',
      name: 'SILÚRICO',
      age: '444 - 419 m.a.',
      image: 'https://www.mundoprehistorico.com/wp-content/uploads/Fauna-Silúrico-ID.jpg',
      desc: 'Estabilización del clima tras una glaciación. Aparecen las primeras plantas vasculares terrestres y los peces mandibulados.'
    },
    {
      id: 'devonico',
      name: 'DEVÓNICO',
      age: '419 - 359 m.a.',
      image: 'https://dinosauriacreatures.com/cdn/shop/articles/devonico_ffd0234d-feea-4a39-b299-f352e4a9707e.jpg?v=1677325746',
      desc: 'La "Edad de los Peces". Estos se diversifican enormemente y aparecen los primeros tetrápodos (anfibios) y bosques primitivos.'
    },
    {
      id: 'carbonifero',
      name: 'CARBONÍFERO',
      age: '359 - 299 m.a.',
      image: 'https://preview.redd.it/the-carboniferous-period-the-time-when-arthropods-were-the-v0-6801ls1e5gxf1.png?auto=webp&s=d63f7549aa3a44af9da9bc2d53226edc9f0f8ee7',
      desc: 'Expansión de selvas gigantes que formaron los depósitos de carbón actuales. Época de insectos gigantes y primeros reptiles.'
    },
    {
      id: 'permico',
      name: 'PÉRMICO',
      age: '299 - 252 m.a.',
      image: 'https://quo.eldiario.es/wp-content/uploads/2025/07/Mays-EPE-scene-press-release-smaller-1024x640-1.jpg',
      desc: 'Formación del supercontinente Pangea. Finaliza con la mayor extinción masiva de la historia, la "Gran Mortandad".'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen px-4 py-12 relative isolate transition-colors duration-500 ${
        isLight ? 'bg-[#f5f2ed]' : 'bg-[#1d1914]'
      }`}
    >
      <div className="max-w-6xl mx-auto mb-16">
        <button 
          onClick={() => window.history.back()}
          className="text-amber-500/80 hover:text-amber-600 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors flex items-center gap-2 group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Volver a las eras
        </button>

        <h1 className={`text-5xl md:text-7xl font-black tracking-tighter italic leading-none transition-colors ${
          isLight ? 'text-stone-900' : 'text-white'
        }`}>
          PERIODOS DEL <span className="text-amber-600">PALEOZOICO</span>
        </h1>

        <div className="flex items-center gap-4 mt-4">
          <div className="h-0.5 w-12 bg-amber-600"></div>
          <p className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
            isLight ? 'text-stone-500' : 'text-slate-500'
          }`}>
             // Los cimientos de la vida compleja
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {periodos.map((p) => (
          <EraCard 
            key={p.id}
            id={`paleozoico/${p.id}`} 
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

export default PaleozoicoPage;