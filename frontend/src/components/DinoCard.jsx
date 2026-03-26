const DinoCard = ({ dino }) => {
  // Estilos de dieta optimizados para el fondo marrón
  const dietStyles = {
    Carnívoro: "bg-red-900/40 text-red-300 border-red-500/50",
    Herbívoro: "bg-green-900/40 text-green-300 border-green-500/50",
    Omnívoro: "bg-amber-900/40 text-amber-300 border-amber-500/50",
    Insectívoro: "bg-orange-900/40 text-orange-300 border-orange-500/50",
    Piscívoro: "bg-cyan-900/40 text-cyan-300 border-cyan-500/50",
    Carroñero: "bg-purple-900/40 text-purple-300 border-purple-500/50",
    Filtrador: "bg-blue-900/40 text-blue-300 border-blue-500/50",
    Detritívoro: "bg-slate-700/40 text-slate-300 border-slate-500/50",
  };

  const colorDieta =
    dietStyles[dino.dieta] || "bg-stone-800 text-stone-400 border-stone-700";

  return (
    // Contenedor de tarjeta h-550px con fondo marrón
    <div className="w-[380px] h-[550px] bg-[#2a2420] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-[#3f3833] transition-transform duration-300 hover:scale-105">
      {/* Imagen: Ocupando todo el ancho superior */}
      <div className="h-52 w-full border-b border-[#3f3833] overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={dino.imagen}
          alt={dino.nombre}
        />
      </div>

      {/* Contenido del texto */}
      <div className="p-7 flex flex-col flex-1">
        {/* Cabecera: Nombre e ID */}
        <div className="flex justify-between items-start mb-1">
          <div className="flex-1">
            {/* Nombre en crema f-black y uppercase */}
            <h2 className="text-3xl font-black text-[#fef3c7] tracking-tighter uppercase italic leading-none">
              {dino.nombre}
            </h2>
            <span className="text-sm italic text-amber-500/80 font-medium block mt-1.5">
              "{dino.subName}"
            </span>
          </div>

          <div className="text-center shrink-0 ml-3">
            <p className="text-[#b0a8a0] text-[9px] uppercase tracking-widest mb-0.5">
              Dino ID
            </p>
            <p className="text-base font-bold text-amber-500 font-mono">
              #{String(dino.id).padStart(3, "0")}
            </p>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-stone-300 text-sm leading-relaxed line-clamp-4 mt-4">
          {dino.descripcion}
        </p>

        {/* Dieta: El 'mt-auto' la empuja hacia abajo para que toque la línea horizontal */}
        <div className="mt-auto mb-2 shrink-0">
          <span
            className={`inline-block text-[11px] uppercase tracking-[0.25em] font-black px-4 py-1.5 rounded-lg border ${colorDieta}`}
          >
            {dino.dieta}
          </span>
        </div>

        {/* Footer con datos técnicos pegado abajo */}
        <div className="border-t border-[#3f3833] pt-5">
          <div className="flex justify-between items-center text-center">
            {/* Longitud */}
            <div className="flex-1">
              <span className="text-[#b0a8a0] text-[9px] uppercase tracking-widest mb-1 block">
                Longitud
              </span>
              <span className="text-base font-bold text-white font-mono">
                {dino.longitud}
              </span>
            </div>

            {/* Altura: border-l solamente para quitar la raya de la derecha */}
            <div className="flex-1 border-l border-[#3f3833] px-2">
              <span className="text-[#b0a8a0] text-[9px] uppercase tracking-widest mb-1 block">
                Altura
              </span>
              <span className="text-base font-bold text-white font-mono">
                {dino.altura}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoCard;
