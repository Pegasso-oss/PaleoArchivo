import { useEffect, useRef, useState } from "react";
import { X, Clock, Thermometer, AlertTriangle } from "lucide-react";
import { useTimeline } from "../hooks/useTimeline.jsx";
import { ERAS } from "../data/timelineData";

/* ─── chip de animal ─────────────────────────────────────── */
function AnimalChip({ animal, acento }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
          style={{ borderColor: `${acento}50`, zIndex: 10 }}
          className="absolute top-[calc(100%+4px)] left-0 min-w-[160px] bg-[#0f0e0c] border rounded-lg px-3 py-2"
        >
          <p style={{ color: acento }} className="text-[10px] font-mono font-bold uppercase mb-1.5">{animal.nombre}</p>
          <p className="text-[10px] font-mono text-[#6b5e4e]">Dieta: <span className="text-[#c8b89a]">{animal.dieta}</span></p>
          <p className="text-[10px] font-mono text-[#6b5e4e]">Tamaño: <span className="text-[#c8b89a]">{animal.tamano}</span></p>
        </div>
      )}
    </div>
  );
}

/* ─── panel de detalle del periodo ──────────────────────── */
function PeriodDetail({ periodo }) {
  if (!periodo) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-[#4a3f32] font-mono text-[11px] uppercase tracking-widest text-center p-8">
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
          <span className="font-mono text-[10px] text-[#6b5e4e] tracking-wide">{periodo.ma}</span>
        </div>
        <div className="h-px w-full bg-[#2a2520] mb-3">
          <div
            style={{
              width: `${Math.min(((periodo.inicio - periodo.fin) / 538) * 100, 100)}%`,
              background: periodo.acento,
            }}
            className="h-full opacity-60"
          />
        </div>
        <p className="font-mono text-[11px] text-[#a09080] leading-relaxed">{periodo.descripcion}</p>
      </div>

      {/* clima + extinciones */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#0f0e0c] border border-[#2a2520] rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-[#6b5e4e] text-[9px] uppercase tracking-widest font-mono mb-1.5">
            <Thermometer size={10} strokeWidth={1.5} />
            Clima
          </div>
          <p className="font-mono text-[10px] text-[#c8b89a] leading-relaxed">{periodo.clima}</p>
        </div>
        <div className="bg-[#0f0e0c] border border-[#cf6a6a30] rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-mono mb-1.5" style={{ color: "#cf6a6a80" }}>
            <AlertTriangle size={10} strokeWidth={1.5} />
            Extinción
          </div>
          <p className="font-mono text-[10px] text-[#cf8888] leading-relaxed">{periodo.extinciones}</p>
        </div>
      </div>

      {/* animales */}
      <div>
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#4a3f32] mb-2.5">
          Especies representativas — {periodo.animales.length} registros
        </p>
        <div className="flex flex-wrap gap-1.5">
          {periodo.animales.map(a => (
            <AnimalChip key={a.nombre} animal={a} acento={periodo.acento} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── lista de periodos estilo sidebar ───────────────────── */
function TimelineList({ selectedId, onSelect }) {
  return (
    <div className="border-b border-[#2a2520]">
      {ERAS.map((era) => (
        <div key={era.era}>
          {/* label de era */}
          <div className="flex items-center gap-2 px-5 pt-4 pb-1.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#3a3028] font-bold">{era.era}</span>
            <div className="flex-1 h-px bg-[#1a1814]" />
          </div>

          {/* periodos */}
          <div className="relative px-5 pb-2">
            {/* línea vertical */}
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-[#2a2520]" />

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
                      borderColor: "#0c0b0a",
                      outline: isSelected ? `2px solid ${p.acento}50` : "none",
                    }}
                    className="w-[11px] h-[11px] rounded-full shrink-0 border-2 z-10 transition-all group-hover/tl:scale-125"
                  />
                  {/* nombre + ma */}
                  <div className="flex items-baseline justify-between flex-1 gap-1 min-w-0">
                    <span
                      style={isSelected ? { color: p.acento } : {}}
                      className={`font-mono text-[12px] font-bold uppercase tracking-wide truncate transition-colors group-hover/tl:text-amber-500 ${isSelected ? "" : "text-[#6b5e4e]"}`}
                    >
                      {p.nombre}
                    </span>
                    <span className="font-mono text-[11px] shrink-0 text-[#3a3028]">
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
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);

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
      {/* overlay oscuro */}
      <div
        onClick={closeTimeline}
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.6)",
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
          background: "#0c0b0a",
          borderLeft: "0.5px solid #2a2520",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        {/* header del panel */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#2a2520] shrink-0">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#f5e6c8] font-bold">
              Cronología geológica
            </p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#4a3f32] mt-0.5">
              16 periodos · 538 Ma – presente
            </p>
          </div>
          <button
            onClick={closeTimeline}
            aria-label="Cerrar"
            className="w-7 h-7 flex items-center justify-center border border-[#2a2520] rounded text-[#6b5e4e] hover:text-[#f5e6c8] hover:border-[#4a3f32] transition-all"
          >
            <X size={13} strokeWidth={1.5} />
          </button>
        </div>

        {/* lista estilo sidebar */}
        <TimelineList selectedId={selectedPeriodo?.id} onSelect={setSelectedPeriodo} />

        {/* detalle del periodo seleccionado */}
        <PeriodDetail periodo={selectedPeriodo} />
      </aside>
    </>
  );
}
