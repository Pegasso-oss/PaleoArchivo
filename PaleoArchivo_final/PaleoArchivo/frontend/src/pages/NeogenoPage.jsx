// src/pages/NeogenoPage.jsx
import React from 'react';
import { useUser } from '../context/useUser';
import { useTranslation } from '../hooks/useTranslation';
import EraCard from '../components/EraCard';
import { motion } from 'framer-motion';

const NeogenoPage = () => {
  const { theme } = useUser();
  const { tSection } = useTranslation();
  const ep = tSection('eraPage');
  const isLight = theme === 'light';

  const periodos = [
    { id: 'mioceno',  name: 'MIOCENO',  age: '23 - 5.3 m.a.', image: 'https://i.pinimg.com/1200x/4d/d4/54/4dd45419df842b161525b72ac8fef5f6.jpg', desc: ep.neogeno?.mioceno?.desc },
    { id: 'plioceno', name: 'PLIOCENO', age: '5.3 - 2.6 m.a.', image: 'https://i.pinimg.com/1200x/50/1c/6f/501c6f69456196fc3e8e79cc155a2c41.jpg', desc: ep.neogeno?.plioceno?.desc },
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
          {ep.epochsOf} <span className="text-lime-500">NEÓGENO</span>
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="h-0.5 w-12 bg-lime-500"></div>
          <p className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${isLight ? 'text-stone-500' : 'text-slate-500'}`}>
            // {ep.neogeno?.subtitle}
          </p>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {periodos.map((p) => (
          <EraCard key={p.id} id={`cenozoico/neogeno/${p.id}`} name={p.name} age={p.age} image={p.image}>{p.desc}</EraCard>
        ))}
      </div>
    </motion.div>
  );
};

export default NeogenoPage;
