import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Clock, Thermometer, AlertTriangle, ArrowRight } from "lucide-react";
import { useTimeline } from "../hooks/useTimeline.jsx";
import { useUser } from "../context/useUser";
import { ERAS } from "../data/timelineData";
import { allAnimals } from "../data/allData";

/* ─── chip de animal ─────────────────────────────────────── */
function AnimalChip({ animal, acento, isLight, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Buscar si el animal existe en el catálogo
  const found = allAnimals.find(a => a.nombre.toLowerCase() === animal.nombre.toLowerCase());

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ borderColor: `${acento}40`, color: acento }}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded border bg-transparent text-[10px] font-mono uppercase tracking-wider transition-all hover:opacity-80"
      >
        {animal.nombre}
        <span style={{ fontSize: 8, opacity: 0.6 }}>▼</span>
      </button>
      {open && (
        <div
          style={{ borderColor: `${acento}50`, zIndex: 10,
            background: isLight ? "#ffffff" : "#0f0e0c",
            boxShadow: isLight ? "0 4px 12px rgba(0,0,0,0.1)" : "0 4px 12px rgba(0,0,0,0.4)",
          }}
          className="absolute top-[calc(100%+4px)] left-0 min-w-[180px] border rounded-lg px-3 py-2.5 flex flex-col gap-1.5"
        >
          <p style={{ color: acento }} className="text-[10px] font-mono font-bold uppercase">{animal.nombre}</p>
          <p className={`text-[10px] font-mono ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>
            Dieta: <span className={isLight ? "text-stone-700" : "text-[#c8b89a]"}>{animal.dieta}</span>
          </p>
          <p className={`text-[10px] font-mono ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>
            Tamaño: <span className={isLight ? "text-stone-700" : "text-[#c8b89a]"}>{animal.tamano}</span>
          </p>
          {found && (
            <button
              onClick={() => onNavigate(found.nombre)}
              style={{ borderColor: `${acento}40`, color: acento }}
              className="mt-1 flex items-center justify-between gap-2 px-2.5 py-1.5 rounded border bg-transparent text-[9px] font-mono uppercase tracking-widest transition-all hover:opacity-80 w-full"
            >
              Ir a ficha
              <ArrowRight size={10} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── panel de detalle del periodo ──────────────────────── */
function PeriodDetail({ periodo, isLight, onNavigate }) {
  if (!periodo) {
    return (
      <div className={`flex-1 flex flex-col items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-widest text-center p-8 ${isLight ? "text-stone-300" : "text-[#4a3f32]"}`}>
        <Clock size={24} strokeWidth={1} />
        <span>Selecciona un periodo</span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
      {/* nombre + barra */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <h3 style={{ color: periodo.acento }} className="font-mono text-base font-bold uppercase tracking-widest m-0">
            {periodo.nombre}
          </h3>
          <span className={`font-mono text-[10px] tracking-wide ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>
            {periodo.ma}
          </span>
        </div>
        <div className={`h-px w-full mb-3 ${isLight ? "bg-stone-200" : "bg-[#2a2520]"}`}>
          <div
            style={{
              width: `${Math.min(((periodo.inicio - periodo.fin) / 538) * 100, 100)}%`,
              background: periodo.acento,
            }}
            className="h-full opacity-60"
          />
        </div>
        <p className={`font-mono text-[11px] leading-relaxed ${isLight ? "text-stone-500" : "text-[#a09080]"}`}>
          {periodo.descripcion}
        </p>
      </div>

      {/* clima + extinciones */}
      <div className="grid grid-cols-2 gap-2">
        <div className={`border rounded-lg p-3 ${isLight ? "bg-stone-50 border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
          <div className={`flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-mono mb-1.5 ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>
            <Thermometer size={10} strokeWidth={1.5} />
            Clima
          </div>
          <p className={`font-mono text-[10px] leading-relaxed ${isLight ? "text-stone-600" : "text-[#c8b89a]"}`}>
            {periodo.clima}
          </p>
        </div>
        <div className={`border rounded-lg p-3 ${isLight ? "bg-red-50 border-red-100" : "bg-[#0f0e0c] border-[#cf6a6a30]"}`}>
          <div className={`flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-mono mb-1.5 ${isLight ? "text-red-400" : "text-[#cf6a6a80]"}`}
            style={!isLight ? { color: "#cf6a6a80" } : {}}>
            <AlertTriangle size={10} strokeWidth={1.5} />
            Extinción
          </div>
          <p className={`font-mono text-[10px] leading-relaxed ${isLight ? "text-red-500" : "text-[#cf8888]"}`}>
            {periodo.extinciones}
          </p>
        </div>
      </div>

      {/* animales */}
      <div>
        <p className={`font-mono text-[9px] uppercase tracking-widest mb-2.5 ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
          Especies representativas — {periodo.animales.length} registros
        </p>
        <div className="flex flex-wrap gap-1.5">
          {periodo.animales.map(a => (
            <AnimalChip key={a.nombre} animal={a} acento={periodo.acento} isLight={isLight} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── lista de periodos estilo sidebar ───────────────────── */
function TimelineList({ selectedId, onSelect, isLight }) {
  return (
    <div className={`border-b ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>
      {ERAS.map((era) => (
        <div key={era.era}>
          {/* label de era */}
          <div className="flex items-center gap-2 px-5 pt-4 pb-1.5">
            <span className={`font-mono text-[9px] uppercase tracking-[0.18em] font-bold ${isLight ? "text-stone-300" : "text-[#3a3028]"}`}>
              {era.era}
            </span>
            <div className={`flex-1 h-px ${isLight ? "bg-stone-100" : "bg-[#1a1814]"}`} />
          </div>

          {/* periodos */}
          <div className="relative px-5 pb-2">
            {/* línea vertical */}
            <div className={`absolute left-[22px] top-0 bottom-0 w-px ${isLight ? "bg-stone-200" : "bg-[#2a2520]"}`} />

            {era.periodos.map((p) => {
              const isSelected = selectedId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelect(p)}
                  className="w-full flex items-center gap-3 py-[5px] group/tl text-left transition-all"
                >
                  {/* punto de color */}
                  <div
                    style={{
                      background: p.acento,
                      borderColor: isLight ? "#f7f3ee" : "#0c0b0a",
                      outline: isSelected ? `2px solid ${p.acento}50` : "none",
                    }}
                    className="w-[11px] h-[11px] rounded-full shrink-0 border-2 z-10 transition-all group-hover/tl:scale-125"
                  />
                  {/* nombre + ma */}
                  <div className="flex items-baseline justify-between flex-1 gap-1 min-w-0">
                    <span
                      style={isSelected ? { color: p.acento } : {}}
                      className={`font-mono text-[12px] font-bold uppercase tracking-wide truncate transition-colors group-hover/tl:text-amber-500 ${isSelected ? "" : isLight ? "text-stone-500" : "text-[#6b5e4e]"}`}
                    >
                      {p.nombre}
                    </span>
                    <span className={`font-mono text-[11px] shrink-0 ${isLight ? "text-stone-300" : "text-[#3a3028]"}`}>
                      {p.inicio}<span className="text-[9px]">Ma</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── componente principal ───────────────────────────────── */
export default function TimelineModal() {
  const { isOpen, closeTimeline } = useTimeline();
  const { theme } = useUser();
  const navigate = useNavigate();
  const isLight = theme === "light";
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);

  const handleNavigate = (nombre) => {
    closeTimeline();
    navigate(`/animal/${encodeURIComponent(nombre.toLowerCase())}`);
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") closeTimeline(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeTimeline]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setSelectedPeriodo(null);
  }, [isOpen]);

  return (
    <>
      {/* overlay */}
      <div
        onClick={closeTimeline}
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0,
          background: isLight ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.6)",
          zIndex: 40,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* panel deslizante */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cronología geológica"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(460px, 96vw)",
          background: isLight ? "#f7f3ee" : "#0c0b0a",
          borderLeft: isLight ? "0.5px solid #e5e0d8" : "0.5px solid #2a2520",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        {/* header */}
        <div className={`flex items-center justify-between px-5 py-3.5 border-b shrink-0 ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>
          <div>
            <p className={`font-mono text-[11px] uppercase tracking-[0.14em] font-bold ${isLight ? "text-stone-800" : "text-[#f5e6c8]"}`}>
              Cronología geológica
            </p>
            <p className={`font-mono text-[9px] uppercase tracking-widest mt-0.5 ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
              16 periodos · 538 Ma – presente
            </p>
          </div>
          <button
            onClick={closeTimeline}
            aria-label="Cerrar"
            className={`w-7 h-7 flex items-center justify-center border rounded transition-all
              ${isLight
                ? "border-stone-200 text-stone-400 hover:text-stone-800 hover:border-stone-400"
                : "border-[#2a2520] text-[#6b5e4e] hover:text-[#f5e6c8] hover:border-[#4a3f32]"
              }`}
          >
            <X size={13} strokeWidth={1.5} />
          </button>
        </div>

        {/* lista */}
        <TimelineList selectedId={selectedPeriodo?.id} onSelect={setSelectedPeriodo} isLight={isLight} />

        {/* detalle */}
        <PeriodDetail periodo={selectedPeriodo} isLight={isLight} onNavigate={handleNavigate} />
      </aside>
    </>
  );
}