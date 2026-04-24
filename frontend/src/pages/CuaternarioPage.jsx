// src/pages/CuaternarioPage.jsx
import React from 'react';
import { useUser } from '../context/useUser';
import { useTranslation } from '../hooks/useTranslation';
import EraCard from '../components/EraCard';
import { motion } from 'framer-motion';

const CuaternarioPage = () => {
  const { theme } = useUser();
  const { tSection } = useTranslation();
  const ep = tSection('eraPage');
  const isLight = theme === 'light';

  const periodos = [
    { id: 'pleistoceno', name: 'PLEISTOCENO', age: '2.6 m.a. - 11.700 a.C.', image: 'https://i.pinimg.com/736x/d9/df/59/d9df59ccd11a5fbb8543c34efecea2a8.jpg', desc: ep.cuaternario?.pleistoceno?.desc },
    { id: 'holoceno',    name: 'HOLOCENO',    age: '11.700 a.C. - Hoy', image: 'https://pymstatic.com/94419/conversions/holoceno-social.jpg', desc: ep.cuaternario?.holoceno?.desc },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`min-h-screen px-4 py-12 relative isolate transition-colors duration-500 ${isLight ? 'bg-[#f5f2ed]' : 'bg-[#1d1914]'}`}
    >
      <div className="max-w-[1400px] mx-auto mb-16">
        <button onClick={() => window.history.back()}
          className="text-amber-500/60 hover:text-amber-600 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors flex items-center gap-2 group">
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> {ep.backToEras}
        </button>
        <h1 className={`text-5xl md:text-7xl font-black tracking-tighter italic leading-none transition-colors ${isLight ? 'text-stone-900' : 'text-white'}`}>
          {ep.epochsOf} <span className="text-sky-400">CUATERNARIO</span>
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="h-0.5 w-12 bg-sky-400"></div>
          <p className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${isLight ? 'text-stone-500' : 'text-slate-500'}`}>
            // {ep.cuaternario?.subtitle}
          </p>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {periodos.map((p) => (
          <EraCard key={p.id} id={`cenozoico/cuaternario/${p.id}`} name={p.name} age={p.age} image={p.image}>{p.desc}</EraCard>
        ))}
      </div>
    </motion.div>
  );
};

export default CuaternarioPage;
