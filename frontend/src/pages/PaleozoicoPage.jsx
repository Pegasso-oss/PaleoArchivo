import React from 'react';
import EraCard from '../components/EraCard';
import { motion } from 'framer-motion'; // 1. Importamos la librería de animación

const PaleozoicoPage = () => {
  const periodos = [
    {
      id: 'cambrico',
      name: 'CÁMBRICO',
      age: '541 - 485 m.a.',
      image: 'https://content.nationalgeographic.com.es/medio/2020/10/31/reconstruccion-artistica-de-kylinxia-zhangi-en-su-ambiente_415cb01b_1280x584.jpg',
      desc: 'Conocido por la "explosión cámbrica", un rápido aumento en la diversidad de vida marina, incluyendo los primeros artrópodos'
    },
    {
      id: 'ordovicico',
      name: 'Ordovícico',
      age: '485 - 444 m.a.',
      image: 'https://www.vistaalmar.es/images/stories/imagenes/ordovicico-oceano.jpg',
      desc: 'Dominación de los invertebrados marinos, aparición de los primeros invertebrados y colonización de las costas por plantas primitivas.'
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
      desc: 'Conocido como la "Edad de los Peces", donde estos se diversifican enormemente. Aparecen los primeros tetrápodos (anfibios) y bosques primitivos.'
    },
    {
      id: 'carbonifero',
      name: 'CARBONÍFERO',
      age: '359 - 299 m.a.',
      image: 'https://preview.redd.it/the-carboniferous-period-the-time-when-arthropods-were-the-v0-6801ls1e5gxf1.png?auto=webp&s=d63f7549aa3a44af9da9bc2d53226edc9f0f8ee7',
      desc: 'Gran expansión de selvas y bosques que, al fosilizarse, formaron los grandes depósitos de carbón actuales. Aparecen los primeros reptiles.'
    },
    {
      id: 'permico',
      name: 'PÉRMICO',
      age: '299 - 252 m.a.',
      image: 'https://quo.eldiario.es/wp-content/uploads/2025/07/Mays-EPE-scene-press-release-smaller-1024x640-1.jpg',
      desc: 'Formación del supercontinente Pangea, clima más seco. Finaliza con la mayor extinción masiva en la historia de la Tierra.'
    }
  ];

  return (
    <motion.div 
          initial={{ opacity: 0, y: 30 }} // Empieza invisible y 30px abajo
          animate={{ opacity: 1, y: 0 }}  // Termina visible y en su sitio
          transition={{ duration: 0.8, ease: "easeOut" }} // Duración de casi 1 segundo para que sea suave
          className="min-h-screen bg-[#0f0d0c] px-4 py-12"
        >
      <div className="max-w-6xl mx-auto mb-16">
        <button 
          onClick={() => window.history.back()}
          className="text-amber-500/80 hover:text-amber-500 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors"
        >
          ← Volver a las eras
        </button>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic leading-none">
          PERIODOS DEL <span className="text-amber-600">PALEOZOICO</span>
        </h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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