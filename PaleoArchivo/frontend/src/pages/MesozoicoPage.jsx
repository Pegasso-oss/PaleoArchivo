// src/pages/MesozoicoPage.jsx
import React from 'react';
import { useUser } from '../context/useUser';
import { useTranslation } from '../hooks/useTranslation';
import EraCard from '../components/EraCard';
import { motion } from 'framer-motion';

const MesozoicoPage = () => {
  const { theme } = useUser();
  const { tSection } = useTranslation();
  const ep = tSection('eraPage');
  const isLight = theme === 'light';

  const periodos = [
    { id: 'triasico',  name: 'TRIÁSICO',  age: '252 - 201 m.a.', image: 'https://www.mundoprehistorico.com/wp-content/uploads/Herrerasaurus-01.jpg', desc: ep.mesozoico?.triasico?.desc },
    { id: 'jurasico',  name: 'JURÁSICO',  age: '201 - 145 m.a.', image: 'https://www.papelpintado.com/media/catalog/product/cache/765175cf1e0a4cff0292d295081d4aa3/w/0/w09424_-_small.jpg', desc: ep.mesozoico?.jurasico?.desc },
    { id: 'cretacico', name: 'CRETÁCICO', age: '145 - 66 m.a.',  image: 'https://images.unsplash.com/photo-1525877442103-5ddb2089b2bb?auto=format&fit=crop&q=80&w=800', desc: ep.mesozoico?.cretacico?.desc },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen px-4 py-12 relative isolate transition-colors duration-500 ${isLight ? 'bg-[#f5f2ed]' : 'bg-[#1d1914]'}`}
    >
      <div className="max-w-[1400px] mx-auto mb-16">
        <button onClick={() => window.history.back()}
          className="text-amber-500/80 hover:text-amber-600 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors flex items-center gap-2 group">
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> {ep.backToEras}
        </button>
        <h1 className={`text-5xl md:text-7xl font-black tracking-tighter italic leading-none uppercase transition-colors ${isLight ? 'text-stone-900' : 'text-white'}`}>
          {ep.periodsOf} <span className="text-amber-600">MESOZOICO</span>
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="h-0.5 w-12 bg-amber-600"></div>
          <p className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${isLight ? 'text-stone-500' : 'text-slate-500'}`}>
            // {ep.mesozoico?.subtitle}
          </p>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {periodos.map((p) => (
          <EraCard key={p.id} id={`mesozoico/${p.id}`} name={p.name} age={p.age} image={p.image}>{p.desc}</EraCard>
        ))}
      </div>
    </motion.div>
  );
};

export default MesozoicoPage;
