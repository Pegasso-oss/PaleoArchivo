import React from 'react';
import { useUser } from '../context/useUser';
import EraCard from '../components/EraCard';
import { motion } from 'framer-motion';

const PaleogenoPage = () => {
  const { theme } = useUser();
  const isLight = theme === 'light';
  const periodos = [
    {
      id: 'paleoceno',
      name: 'PALEOCENO',
      age: '66 - 56 m.a.',
      image: 'https://eltamiz.com/elcedazo/wp-content/uploads/2013/11/bosque-del-paleoceno.jpg',
      desc: 'El mundo tras los dinosaurios. Las selvas se expanden y los mamíferos arcaicos comienzan su ascenso.'
    },
    {
      id: 'eoceno',
      name: 'EOCENO',
      age: '56 - 34 m.a.',
      image: 'https://www.lifeder.com/wp-content/uploads/2019/01/Eoceno.jpg',
      desc: 'Máximo térmico y diversificación. Aparecen los ancestros de ballenas, caballos y primates en selvas globales.'
    },
    {
      id: 'oligoceno',
      name: 'OLIGOCENO',
      age: '34 - 23 m.a.',
      image: 'https://i.pinimg.com/736x/97/af/53/97af53e9b6ba8d39d281a4f80e746f0f.jpg',
      desc: 'La expansión de las praderas. El clima se enfría, los bosques retroceden y surgen mamíferos gigantes.'
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
      <div className="max-w-[1400px] mx-auto mb-16">
        <button 
          onClick={() => window.history.back()}
          className="text-amber-500/60 hover:text-amber-600 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors flex items-center gap-2 group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Volver a las eras
        </button>

        <h1 className={`text-5xl md:text-7xl font-black tracking-tighter italic leading-none transition-colors ${
          isLight ? 'text-stone-900' : 'text-white'
        }`}>
          ÉPOCAS DEL <span className="text-amber-600">PALEÓGENO</span>
        </h1>

        <div className="flex items-center gap-4 mt-4">
          <div className="h-0.5 w-12 bg-amber-600"></div>
          <p className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
            isLight ? 'text-stone-500' : 'text-slate-500'
          }`}>
             // El amanecer de los mamíferos modernos
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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