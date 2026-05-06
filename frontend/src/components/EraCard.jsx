import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/useUser';

const EraCard = ({ name, age, image, children, id }) => {
  const navigate = useNavigate();
  const { theme } = useUser();
  const isLight = theme === 'light';

  const bgCard    = isLight ? '#ffffff'  : '#1a1816';
  const textPrimary   = isLight ? '#1c1917'  : '#fef3c7';
  const textSecondary = isLight ? '#57534e'  : '#a8a29e';

  return (
    <div
      className="relative overflow-hidden group rounded-[1.25em] border border-amber-500/30 max-w-[450px] transition-all duration-500 hover:border-amber-500 hover:-translate-y-2 shadow-sm hover:shadow-xl flex flex-col cursor-pointer"
      style={{ aspectRatio: '2/3', backgroundColor: bgCard }}
      onClick={() => navigate(`/era/${id}`)}
    >
      {/* Imagen */}
      <div className="flex-grow overflow-hidden relative leading-[0]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: `linear-gradient(to top, ${bgCard} 0%, ${bgCard}e6 40%, transparent 100%)`,
          }}
        />
      </div>

      {/* Texto */}
      <div className="p-8 pt-4 relative z-10 -mt-[1px]" style={{ backgroundColor: bgCard }}>
        <div className="mb-4">
          <h3
            className="text-4xl font-black font-mono tracking-tighter leading-none group-hover:text-amber-600 transition-colors uppercase italic"
            style={{ color: textPrimary }}
          >
            {name}
          </h3>
          <p
            className="font-black text-amber-600 text-[15px] font-mono tracking-tighter uppercase italic leading-none break-words transition-colors"
            style={{ '--hover-color': textPrimary }}
          >
            {age}
          </p>
        </div>

        <div className="h-px w-full bg-amber-500/20 mb-5" />

        <div className="text-sm leading-relaxed font-light italic" style={{ color: textSecondary }}>
          {children}
        </div>
      </div>

      {/* Brillo hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-amber-500/0 via-amber-500/[0.08] to-amber-500/0 pointer-events-none" />
    </div>
  );
};

export default EraCard;