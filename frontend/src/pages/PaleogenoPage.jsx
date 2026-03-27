import React from 'react';
import EraCard from '../components/EraCard';
import { motion } from 'framer-motion'; // 1. Importamos la librería de animación

const PaleogenoPage = () => {
  const periodos = [
    {
      id: 'paleoceno',
      name: 'PALEOCENO',
      age: '252 - 201 m.a.',
      image: 'https://eltamiz.com/elcedazo/wp-content/uploads/2013/11/bosque-del-paleoceno.jpg',
      desc: 'El resurgir tras la gran extinción. Aparecen los primeros dinosaurios y mamíferos verdaderos.'
    },
    {
      id: 'eoceno',
      name: 'EOCENO',
      age: '201 - 145 m.a.',
      image: 'https://www.lifeder.com/wp-content/uploads/2019/01/Eoceno.jpg',
      desc: 'La edad de oro de los gigantes. El Allosaurus y el Brachiosaurus dominan un mundo húmedo y verde.'
    },
    {
      id: 'oligoceno',
      name: 'OLIGOCENO',
      age: '145 - 66 m.a.',
      image: 'https://i.pinimg.com/736x/97/af/53/97af53e9b6ba8d39d281a4f80e746f0f.jpg',
      desc: 'El fin de una era. Aparecen las flores y el T-Rex reina antes del impacto del meteorito.'
    }
  ];

  return (
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
          ÉPOCAS DEL <span className="text-amber-600">PALEOGENO</span>
        </h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {periodos.map((p) => (
          <EraCard 
            key={p.id}
            id={`cenozoico/paleogeno/${p.id}`}
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

export default PaleogenoPage;