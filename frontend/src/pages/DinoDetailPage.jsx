import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { allAnimals } from "../data/allData";
import {
  ChevronLeft,
  Ruler,
  Utensils,
  Info,
  FileText,
  Skull,
  ArrowsUpFromLine,
} from "lucide-react";

const DinoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dino = allAnimals.find(
    (d) => d.nombre.toLowerCase() === id.toLowerCase(),
  );

  if (!dino)
    return (
      <div className="bg-[#0f0d0c] min-h-screen text-white p-10 font-mono text-xs uppercase tracking-widest">
        Cargando archivo...
      </div>
    );

  const getTheme = (dieta) => {
  switch (dieta) {
    case "Carnívoro":
      return {
        text: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
      };
    case "Herbívoro":
      return {
        text: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
      };
    case "Omnívoro":
      return {
        text: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
      };
    case "Insectívoro":
      return {
        text: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
      };
    case "Piscívoro":
      return {
        text: "text-cyan-500",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
      };
    case "Carroñero":
      return {
        text: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
      };
    case "Filtrador":
      return {
        text: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
      };
    case "Detritívoro":
      return {
        text: "text-slate-400",
        bg: "bg-slate-400/10",
        border: "border-slate-400/30",
      };
    default:
      return {
        text: "text-stone-400",
        bg: "bg-stone-400/10",
        border: "border-stone-400/30",
      };
  }
};

  const theme = getTheme(dino.dieta);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#1d1914] text-white pb-20 relative"
    >
      {/* 1. BOTÓN VOLVER */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:pt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-600 hover:text-white transition-colors font-mono text-[10px] tracking-[0.2em] uppercase"
        >
          <ChevronLeft size={14} /> VOLVER AL REGISTRO
        </button>
      </div>

      {/* 2. CONTENEDOR PRINCIPAL: Grid de 2 columnas en PC */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* --- COLUMNA IZQUIERDA: Información Suelta --- */}
        <div className="flex flex-col gap-6 lg:gap-8 overflow-hidden">
          <header>
            <span
              className={`font-mono text-[10px] lg:text-xs tracking-[0.4em] uppercase ${theme.text}`}
            >
              // {dino.subName}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-5xl font-black italic uppercase leading-none mt-3 tracking-tighter break-words max-w-full">
              {dino.nombre}
            </h1>
          </header>

          <p className="text-stone-300 text-base lg:text-lg leading-relaxed font-light">
            <Info
              size={16}
              className={`inline mr-2.5 mb-1 ${theme.text} opacity-60`}
            />
            {dino.descripcion}
          </p>

          {/* GRID DE DATOS: Cajitas individuales sin tarjeta envolvente */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4 mt-2">
            {[
              {
                label: "Longitud",
                val: dino.longitud,
                icon: <Ruler size={14} />,
              },
              {
                label: "Altura",
                val: dino.altura,
                icon: <ArrowsUpFromLine size={14} />,
              },
              {
                label: "Dieta",
                val: dino.dieta,
                icon: <Utensils size={14} />,
                color: theme.text,
              },
              {
                label: "Estado y Registro",
                val: (
                  <div className="flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-2">
                    <span
                      className={
                        dino.estado === "VIVO"
                          ? "text-cyan-400"
                          : "text-red-700"
                      }
                    >
                      {dino.estado || "EXTINTO"}
                    </span>
                    <span className="text-[10px] text-stone-500 font-normal">
                      {dino.extincion}
                    </span>
                  </div>
                ),
                icon: <Skull size={14} />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/[0.03] border border-white/5 p-4 rounded-xl flex flex-col justify-between h-28 lg:h-32"
              >
                <div className="flex items-center gap-2 text-stone-500 mb-1.5 shrink-0">
                  {item.icon}
                  <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-bold">
                    {item.label}
                  </span>
                </div>
                <div
                  className={`text-lg lg:text-2xl font-mono font-bold ${item.color || "text-white"}`}
                >
                  {item.val}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              className={`w-full lg:w-max bg-white/5 hover:bg-white/10 border border-white/10 ${theme.text} px-8 py-4 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3`}
            >
              <FileText size={14} /> CONSULTAR PAPERS CIENTIFICOS
            </button>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: Imagen en Landscape (Horizontal) --- */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="relative w-full self-center" // Centrada verticalmente respecto al texto
        >
          {/* El brillo de fondo basado en la dieta */}
          <div
            className={`absolute -inset-10 ${theme.bg} rounded-full blur-[120px] opacity-30`}
          ></div>

          {/* Contenedor con Aspect Ratio fijo para forzar el Landscape */}
          <div
            className="relative aspect-video lg:aspect-[5/3] w-full overflow-hidden rounded-[2.5rem] border-2 shadow-2xl shadow-black/60"
            style={{ borderColor: theme.border.split("-")[1] }}
          >
            {" "}
            {/* Usa el color del tema para el borde */}
            <img
              src={dino.imagen}
              alt={dino.nombre}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DinoDetailPage;
