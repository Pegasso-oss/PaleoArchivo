// src/components/EraCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EraCard = ({ name, age, image, children, id }) => {
  const navigate = useNavigate();

  // CAMBIOS REALIZADOS:
  // 1. bg-[#1a1816] para coincidir con las DinoCards.
  // 2. border-[#3f3833] (un marrón muy oscuro) en lugar de transparente para dar estructura.
  // 3. shadow-none para eliminar los halos grises en fondos oscuros.
  const posterStyle = "relative overflow-hidden group rounded-[2.5rem] border border-[#3f3833] bg-[#1a1816] transition-all duration-500 hover:border-amber-500/40 hover:-translate-y-2 shadow-none flex flex-col cursor-pointer";

  return (
    <div 
      className={posterStyle} 
      style={{ aspectRatio: '2/3' }}
      onClick={() => navigate(`/era/${id}`)}
    >
      
      {/* 1. LA IMAGEN */}
      <div className="flex-grow overflow-hidden relative leading-[0] border-b border-[#3f3833]">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-110"
        />
        {/* El degradado ahora nace del color exacto de la tarjeta */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a1816] via-[#1a1816]/80 to-transparent" />
      </div>

      {/* 2. EL TEXTO */}
      <div className="p-8 pt-4 relative z-10 bg-[#1a1816] -mt-[2px]">
        <div className="mb-4">
          <h3 className="text-4xl font-black text-[#fef3c7] font-mono tracking-tighter leading-none group-hover:text-amber-500 transition-colors uppercase italic">
            {name}
          </h3>
          <p className="font-black text-amber-500 text-[15px] font-mono tracking-tighter uppercase italic leading-none group-hover:text-[#fef3c7] transition-colors break-words">
            {age}
          </p>
        </div>
        
        {/* Separador sutil */}
        <div className="h-px w-full bg-[#3f3833] mb-5"></div>

        <div className="text-stone-400 text-sm leading-relaxed font-light italic">
          {children}
        </div>
      </div>

      {/* Brillo "Foil" corregido para que no ensucie el negro */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-amber-500/0 via-amber-500/[0.03] to-amber-500/0 pointer-events-none"></div>
    </div>
  );
};

export default EraCard;