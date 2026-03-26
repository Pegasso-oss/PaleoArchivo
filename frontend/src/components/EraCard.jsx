// src/components/EraCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos el navegador

const EraCard = ({ name, age, image, children, id }) => {
  const navigate = useNavigate(); // Hook para movernos de página

  // Estilo con borde transparente inicial para evitar el salto/parpadeo al hacer hover
  const posterStyle = "relative overflow-hidden group rounded-3xl border border-transparent bg-[#1d1916] transition-all duration-300 hover:border-amber-500 hover:-translate-y-2 shadow-2xl hover:shadow-amber-950/40 flex flex-col cursor-pointer";

  return (
    <div 
      className={posterStyle} 
      style={{ aspectRatio: '2/3' }}
      onClick={() => navigate(`/era/${id}`)} // Al clicar, nos lleva a la selección de periodos
    >
      
      {/* 1. LA IMAGEN - leading-[0] y block para fulminar espacios fantasma */}
      <div className="flex-grow overflow-hidden relative leading-[0]">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1d1916] to-transparent" />
      </div>

      {/* 2. EL TEXTO - El -mt-[1px] tapa la línea sobre CENOZOICO */}
      <div className="p-7 pt-2 relative z-10 bg-[#1d1916] -mt-[1px]">
        <div className="mb-4">
          <h3 className="text-4xl font-black text-amber-500 font-mono tracking-tighter leading-none group-hover:text-amber-400 transition-colors uppercase">
            {name}
          </h3>
          <p className="text-cream/70 text-xs mt-1 font-mono tracking-widest uppercase">
            {age}
          </p>
        </div>
        
        <div className="h-px w-full bg-[#2e2621]/60 mb-4"></div>

        <div className="text-cream/80 text-sm leading-relaxed font-light">
          {children}
        </div>
      </div>

      {/* Efecto de brillo "foil" al pasar el ratón */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-amber-500/5 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default EraCard;