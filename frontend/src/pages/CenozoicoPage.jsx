import React from 'react';
import EraCard from '../components/EraCard';
import { motion } from 'framer-motion'; // 1. Importamos la librería de animación

const CenozoicoPage = () => {
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
    // 2. Cambiamos el <div> principal por <motion.div> y añadimos la animación
    <motion.div 
      initial={{ opacity: 0, y: 30 }} // Empieza invisible y 30px abajo
      animate={{ opacity: 1, y: 0 }}  // Termina visible y en su sitio
      transition={{ duration: 0.8, ease: "easeOut" }} // Duración de casi 1 segundo para que sea suave
      className="min-h-screen bg-[#1d1914] px-4 py-12"
    >
      <div className="max-w-6xl mx-auto mb-16">
        <button 
          onClick={() => window.history.back()}
          className="text-amber-500/50 hover:text-amber-500 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors"
        >
          ← Volver a las eras
        </button>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic leading-none">
          PERIODOS DEL <span className="text-amber-600">CENOZOICO</span>
        </h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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