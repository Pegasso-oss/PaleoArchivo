import React from 'react';
import { useNavigate } from 'react-router-dom';

const EraCard = ({ name, age, image, children, id }) => {
  const navigate = useNavigate();

  // 1. Cambiamos border-[var(--border-color)] por border-amber-500/30
  const posterStyle = `
    relative overflow-hidden group rounded-[1.25em]
    border border-amber-500/30 max-w-[450px]
    bg-[var(--bg-card)] 
    transition-all duration-500 
    hover:border-amber-500 hover:-translate-y-2 
    shadow-sm hover:shadow-xl 
    flex flex-col cursor-pointer
  `;

  return (
    <div 
      className={posterStyle} 
      style={{ aspectRatio: '2/3' }}
      onClick={() => navigate(`/era/${id}`)}
    >
      
      {/* 1. LA IMAGEN */}
      {/* Eliminamos el borde inferior que también se veía gris */}
      <div className="flex-grow overflow-hidden relative leading-[0]">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* DEGRADADO: Ajustado para que se funda mejor con el fondo de la carta */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/90 to-transparent" />
      </div>

      {/* 2. EL TEXTO */}
      <div className="p-8 pt-4 relative z-10 bg-[var(--bg-card)] -mt-[1px]">
        <div className="mb-4">
          <h3 className="text-4xl font-black text-[var(--text-primary)] font-mono tracking-tighter leading-none group-hover:text-amber-600 transition-colors uppercase italic">
            {name}
          </h3>
          <p className="font-black text-amber-600 text-[15px] font-mono tracking-tighter uppercase italic leading-none group-hover:text-[var(--text-primary)] transition-colors break-words">
            {age}
          </p>
        </div>
        
        {/* Separador: Ahora también en ámbar suave */}
        <div className="h-px w-full bg-amber-500/20 mb-5"></div>

        <div className="text-[var(--text-secondary)] text-sm leading-relaxed font-light italic">
          {children}
        </div>
      </div>

      {/* Efecto de brillo sutil en ámbar */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-amber-500/0 via-amber-500/[0.08] to-amber-500/0 pointer-events-none"></div>
    </div>
  );
};

export default EraCard;