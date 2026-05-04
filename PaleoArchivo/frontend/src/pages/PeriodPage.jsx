// src/pages/PeriodPage.jsx
// Componente genérico para TODAS las páginas de período (Cámbrico, Triásico, etc.)
// Reemplaza CambricoPage, OrdovicicoPage, JurasicoPage, CretacicoPage, TriasicoPage, PaleocenoPage
//
// Uso en pages.js / App.jsx:
//   <Route path="/era/paleozoico/cambrico" element={<PeriodPage data={dinosaurios_cambrico} accentColor="text-blue-600" accentHex="#2563eb" title="Cámbricos" />} />

import React from 'react';
import { useUser } from '../context/useUser';
import { useTranslation } from '../hooks/useTranslation';
import DinoCard from '../components/DinoCard';
import { motion } from 'framer-motion';

/**
 * @param {Array}  data         - Array de animales del período
 * @param {string} title        - Adjetivo del título, e.g. "Cámbricos", "Jurásicos"
 * @param {string} accentColor  - Clase Tailwind para el color de acento, e.g. "text-blue-600"
 * @param {string} accentHex    - Color hex para la línea decorativa, e.g. "#2563eb"
 */
const PeriodPage = ({ data = [], title = "", accentColor = "text-amber-600", accentHex = "#d97706" }) => {
  const { theme } = useUser();
  const { tSection } = useTranslation();
  const ep = tSection('eraPage');
  const isLight = theme === 'light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen px-4 py-12 relative isolate transition-colors duration-500 ${
        isLight ? 'bg-[#f5f2ed]' : 'bg-[#1d1914]'
      }`}
    >
      <div className="max-w-[1720px] mx-auto mb-16">
        <button
          onClick={() => window.history.back()}
          className={`font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors flex items-center gap-2 group`}
          style={{ color: `${accentHex}cc` }}
          onMouseEnter={e => e.currentTarget.style.color = accentHex}
          onMouseLeave={e => e.currentTarget.style.color = `${accentHex}cc`}
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> {ep.backToPeriods}
        </button>

        <h1 className={`text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none transition-colors ${isLight ? 'text-stone-900' : 'text-white'}`}>
          {ep.recordsOf} <span className={`font-black ${accentColor}`}>{title}</span>
        </h1>

        <div className="flex items-center gap-4 mt-4">
          <div className="h-0.5 w-12" style={{ backgroundColor: accentHex }}></div>
          <p className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${isLight ? 'text-stone-500' : 'text-slate-500'}`}>
            // {ep.classifiedAnimals}: {data.length} ({ep.wip})
          </p>
        </div>
      </div>

      <div className="max-w-[1720px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {data.map((dino) => (
          <DinoCard key={dino.id} dino={dino} />
        ))}
      </div>
    </motion.div>
  );
};

export default PeriodPage;
