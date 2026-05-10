// src/components/PaleoMap.jsx
// Mapa global con todos los animales del catálogo
// Filtros por era (Paleozoico / Mesozoico / Cenozoico) para mostrar/ocultar puntos

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import { X, Loader } from "lucide-react";
import { useUser } from "../context/useUser";
import { allAnimals } from "../data/allData";
import { getHallazgosForAnimals } from "../data/paleomapCoords";

// ── Datos de todos los animales con coordenadas ───────────────────────────────
// Agrupados por era para poder filtrar
const ERA_CONFIG = {
  Paleozoico: { color: "#6aafc5", bg: "rgba(106,175,197,0.15)", border: "rgba(106,175,197,0.5)", label: "Paleozoico", ma: "538–252 Ma" },
  Mesozoico:  { color: "#6abf6a", bg: "rgba(106,191,106,0.15)", border: "rgba(106,191,106,0.5)", label: "Mesozoico",  ma: "252–66 Ma"  },
  Cenozoico:  { color: "#cf9a5a", bg: "rgba(207,154,90,0.15)",  border: "rgba(207,154,90,0.5)",  label: "Cenozoico",  ma: "66 Ma–hoy" },
};

// Mapeo de era del catálogo → era del filtro
const ERA_MAP = {
  "Cámbrico": "Paleozoico", "Ordovícico": "Paleozoico", "Silúrico": "Paleozoico",
  "Devónico": "Paleozoico", "Carbonífero": "Paleozoico", "Pérmico": "Paleozoico",
  "Triásico": "Mesozoico",  "Jurásico": "Mesozoico",    "Cretácico": "Mesozoico",
  "Paleoceno": "Cenozoico", "Eoceno": "Cenozoico",      "Oligoceno": "Cenozoico",
  "Mioceno": "Cenozoico",   "Plioceno": "Cenozoico",    "Pleistoceno": "Cenozoico",
  "Holoceno": "Cenozoico",
};

// ── GeoJSON moderno (precargado) ──────────────────────────────────────────────
const GEOJSON_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
let worldGeoJSON = null;
fetch(GEOJSON_URL).then(r => r.json()).then(d => { worldGeoJSON = d; }).catch(() => {});

async function fetchWorld() {
  if (worldGeoJSON) return worldGeoJSON;
  try {
    const res = await fetch(GEOJSON_URL);
    if (!res.ok) throw new Error();
    worldGeoJSON = await res.json();
    return worldGeoJSON;
  } catch { return null; }
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
function Tooltip({ animal, eraColor, isLight, onClose }) {
  const navigate = useNavigate();
  return (
    <div
      style={{ borderColor: `${eraColor}60`, background: isLight ? "#fff" : "#0f0e0c",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
      className="rounded-xl overflow-hidden w-44 border"
    >
      {animal?.imagen && (
        <div className="relative h-20">
          <img src={animal.imagen} alt={animal.nombre} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button onClick={onClose}
            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-all">
            <X size={9} />
          </button>
          {/* Badge de era */}
          <span style={{ background: `${eraColor}cc`, color: "#fff" }}
            className="absolute bottom-1.5 left-1.5 font-mono text-[8px] uppercase tracking-wide px-1.5 py-0.5 rounded">
            {animal.era}
          </span>
        </div>
      )}
      <div className="p-2.5 flex flex-col gap-1.5">
        <p style={{ color: eraColor }} className="font-mono text-[10px] font-bold uppercase tracking-wide leading-tight">
          {animal.nombre}
        </p>
        {animal?.dieta && (
          <p className={`font-mono text-[9px] ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>
            {animal.dieta}
          </p>
        )}
        <button
          onClick={() => navigate(`/animal/${encodeURIComponent(animal.nombre.toLowerCase())}`)}
          style={{ borderColor: `${eraColor}50`, color: eraColor }}
          className="w-full flex items-center justify-center gap-1 py-1 rounded-lg border bg-transparent font-mono text-[9px] uppercase tracking-widest hover:opacity-80 transition-all"
        >
          Ver ficha →
        </button>
      </div>
    </div>
  );
}

// ── Mapa SVG ──────────────────────────────────────────────────────────────────
function GeoMap({ geojson, puntos, isLight, onPointClick, activeAnimal, svgRef, zoomRef }) {
  const containerRef = useRef(null);
  const gRef = useRef(null);
  const [W, setW] = useState(900);
  const H = Math.round(W * 0.5);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // D3 zoom
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;
    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [W, H]])
      .on("zoom", (event) => {
        d3.select(gRef.current).attr("transform", event.transform);
        setZoomLevel(event.transform.k);
      });
    d3.select(svgRef.current).call(zoom);
    zoomRef.current = zoom;
    d3.select(svgRef.current).call(zoom.transform, d3.zoomIdentity);
    setZoomLevel(1);
  }, [W, H]);

  const handleZoom = (factor) => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, factor);
  };

  const handleReset = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(400).call(zoomRef.current.transform, d3.zoomIdentity);
  };

  const proj = d3.geoNaturalEarth1().scale(W / 6.3).translate([W / 2, H / 2]);
  const path = d3.geoPath().projection(proj);
  const grat = d3.geoGraticule()();

  const ocean  = isLight ? "#b8d4e8" : "#0a1a28";
  const land   = isLight ? "#c4a97a" : "#4a3a1e";
  const stroke = isLight ? "#7a6040" : "#9a7a50";
  const grid   = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.07)";

  return (
    <div ref={containerRef} className="w-full relative">
      <svg
        ref={svgRef}
        width={W} height={H}
        style={{ display: "block", width: "100%", height: "auto", cursor: "grab" }}
      >
        <rect width={W} height={H} fill={ocean} />
        <g ref={gRef}>
          <path d={path(grat)} fill="none" stroke={grid} strokeWidth={0.5} />
          {geojson?.features?.map((f, i) => (
            <path key={i} d={path(f)} fill={land} stroke={stroke} strokeWidth={0.7} />
          ))}
          {puntos.map(p => {
            const c = proj([p.lon, p.lat]);
            if (!c) return null;
            const [cx, cy] = c;
            const isActive = activeAnimal?.id === p.id;
            const r = (isActive ? 6 : 4) / Math.sqrt(zoomLevel);
            const rPulse = (isActive ? 16 : 9) / Math.sqrt(zoomLevel);
            return (
              <g key={`${p.id}-${p.lon}-${p.lat}`}
                onClick={e => onPointClick(p, cx, cy, e)}
                style={{ cursor: "pointer" }}>
                <circle cx={cx} cy={cy} r={rPulse} fill={p.eraColor} opacity={0.2} />
                <circle cx={cx} cy={cy} r={r} fill={p.eraColor} stroke="white" strokeWidth={1.5 / zoomLevel}
                  style={{ filter: `drop-shadow(0 0 ${4 / zoomLevel}px ${p.eraColor}99)` }} />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Controles zoom */}
      <div className="absolute top-3 right-3 flex flex-col gap-1">
        {[
          { label: "+", fn: () => handleZoom(1.5),   title: "Acercar" },
          { label: "−", fn: () => handleZoom(1/1.5), title: "Alejar"  },
          { label: "↺", fn: handleReset,              title: "Restablecer", small: true },
        ].map(({ label, fn, title, small }) => (
          <button key={label} onClick={fn} title={title}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-all font-mono font-bold"
            style={{ fontSize: small ? 10 : 16 }}>
            {label}
          </button>
        ))}
      </div>

      {zoomLevel > 1.1 && (
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 pointer-events-none">
          <span className="font-mono text-[9px] text-white/70">{zoomLevel.toFixed(1)}×</span>
        </div>
      )}
    </div>
  );
}

// ── Tarjeta de era ────────────────────────────────────────────────────────────
function EraCard({ era, config, count, active, onToggle, isLight }) {
  return (
    <button
      onClick={onToggle}
      style={{
        borderColor: active ? config.border : isLight ? "#e5e0d8" : "#2a2520",
        background: active ? config.bg : "transparent",
      }}
      className="flex-1 flex flex-col items-start gap-1 px-2 py-2 sm:px-4 sm:py-3 rounded-xl border transition-all hover:scale-[1.02]"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span style={{ background: config.color }} className="w-2 h-2 rounded-full shrink-0" />
          <span style={{ color: active ? config.color : isLight ? "#78716c" : "#6b5e4e" }}
            className="font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-wide">
            {config.label}
          </span>
        </div>
        {/* check indicator */}
        <span
          style={{
            background: active ? config.color : "transparent",
            borderColor: active ? config.color : isLight ? "#d5cfc8" : "#3a3028",
          }}
          className="w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0"
        >
          {active && <span className="text-white font-bold" style={{ fontSize: 9, lineHeight: 1 }}>✓</span>}
        </span>
      </div>
      <span style={{ color: isLight ? "#a09080" : "#4a3f32" }}
        className="hidden sm:block font-mono text-[9px] uppercase tracking-widest">
        {config.ma}
      </span>
      <span style={{ color: active ? config.color : isLight ? "#a09080" : "#4a3f32" }}
        className="font-mono text-[10px] font-bold">
        {count} {count === 1 ? "especie" : "especies"}
      </span>
    </button>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function PaleoMap() {
  const { theme } = useUser();
  const isLight = theme === "light";
  const svgRef  = useRef(null);
  const zoomRef = useRef(null);
  const mapRef  = useRef(null);

  const [geojson, setGeojson]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [activeAnimal, setActiveAnimal] = useState(null);
  const [tipPos, setTipPos]         = useState({ x: 0, y: 0 });

  // Filtros de era — todos activos por defecto
  const [activeEras, setActiveEras] = useState({
    Paleozoico: true,
    Mesozoico:  true,
    Cenozoico:  true,
  });

  // Construir todos los puntos del catálogo con coordenadas
  const allHallazgos = React.useMemo(() => {
    const hallazgos = getHallazgosForAnimals(allAnimals);
    return hallazgos.map(h => {
      const animal = allAnimals.find(a => a.id === h.id);
      const eraGrupo = ERA_MAP[animal?.era] || "Cenozoico";
      return {
        ...h,
        animal,
        eraGrupo,
        eraColor: ERA_CONFIG[eraGrupo]?.color || "#cf9a5a",
      };
    });
  }, []);

  // Puntos filtrados según eras activas
  const puntosFiltrados = React.useMemo(() =>
    allHallazgos.filter(p => activeEras[p.eraGrupo]),
    [allHallazgos, activeEras]
  );

  // Conteo por era
  const countByEra = React.useMemo(() => {
    const counts = { Paleozoico: 0, Mesozoico: 0, Cenozoico: 0 };
    allHallazgos.forEach(p => { counts[p.eraGrupo] = (counts[p.eraGrupo] || 0) + 1; });
    return counts;
  }, [allHallazgos]);

  useEffect(() => {
    fetchWorld().then(d => { setGeojson(d); setLoading(false); });
  }, []);

  const toggleEra = (era) => {
    setActiveEras(prev => ({ ...prev, [era]: !prev[era] }));
    setActiveAnimal(null);
  };

  const handlePoint = (p, cx, cy, e) => {
    e.stopPropagation();
    if (activeAnimal?.id === p.id) { setActiveAnimal(null); return; }
    const rect = mapRef.current?.getBoundingClientRect();
    const W = rect?.width  || 900;
    const H = rect?.height || 450;
    let x = cx + 14, y = cy + 14;
    if (x + 190 > W) x = cx - 200;
    if (y + 200 > H) y = cy - 210;
    setTipPos({ x, y });
    setActiveAnimal(p);
  };

  const activeAnimalData = activeAnimal?.animal;
  const activeEraColor = activeAnimal ? ERA_CONFIG[activeAnimal.eraGrupo]?.color : "#cf9a5a";

  return (
    <div className={`rounded-2xl border overflow-hidden ${isLight ? "border-stone-200 bg-white" : "border-[#2a2520] bg-[#0f0e0c]"}`}>

      {/* Tarjetas de era */}
      <div className={`px-5 py-4 border-b ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>
        <p className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-3 ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
          <span className="hidden sm:inline">Filtrar por era — </span>{puntosFiltrados.length} de {allHallazgos.length} especies visibles
        </p>
        <div className="grid grid-cols-3 sm:flex gap-2">
          {Object.entries(ERA_CONFIG).map(([era, config]) => (
            <EraCard
              key={era}
              era={era}
              config={config}
              count={countByEra[era] || 0}
              active={activeEras[era]}
              onToggle={() => toggleEra(era)}
              isLight={isLight}
            />
          ))}
        </div>
      </div>

      {/* Mapa */}
      <div ref={mapRef} className="relative" onClick={() => setActiveAnimal(null)}>

        {loading && (
          <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 ${isLight ? "bg-stone-50" : "bg-[#0c0b0a]"}`}
            style={{ minHeight: 300 }}>
            <Loader size={20} className="animate-spin text-amber-600" />
            <span className={`font-mono text-[10px] uppercase tracking-widest ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
              Cargando mapa...
            </span>
          </div>
        )}

        <GeoMap
          geojson={geojson}
          puntos={puntosFiltrados}
          isLight={isLight}
          onPointClick={handlePoint}
          activeAnimal={activeAnimal}
          svgRef={svgRef}
          zoomRef={zoomRef}
        />

        {/* Tooltip — dentro del mapa en desktop, panel debajo en móvil */}
        {activeAnimal && activeAnimalData && (
          <>
            {/* Desktop: posición absoluta dentro del mapa */}
            <div
              style={{ position: "absolute", top: tipPos.y, left: tipPos.x, zIndex: 20 }}
              onClick={e => e.stopPropagation()}
              className="hidden sm:block"
            >
              <Tooltip
                animal={activeAnimalData}
                eraColor={activeEraColor}
                isLight={isLight}
                onClose={() => setActiveAnimal(null)}
              />
            </div>
          </>
        )}

        {/* Badge info */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1.5 pointer-events-none">
          <span className="font-mono text-[10px] text-white/70">
            {puntosFiltrados.length} hallazgos en el mapa
          </span>
        </div>
      </div>

      {/* Panel móvil — aparece debajo del mapa al seleccionar un animal */}
      {activeAnimal && activeAnimalData && (
        <div
          className={`sm:hidden border-t flex items-center gap-3 px-4 py-3 ${isLight ? "border-stone-200 bg-stone-50" : "border-[#2a2520] bg-[#0c0b0a]"}`}
          onClick={e => e.stopPropagation()}
        >
          {activeAnimalData.imagen && (
            <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden border" style={{ borderColor: `${activeEraColor}40` }}>
              <img src={activeAnimalData.imagen} alt={activeAnimalData.nombre} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p style={{ color: activeEraColor }} className="font-mono text-[14px] font-bold uppercase tracking-wide truncate">
              {activeAnimalData.nombre}
            </p>
            <p className={`font-mono text-[12px] truncate ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>
              {activeAnimalData.era} · {activeAnimalData.dieta}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => { window.location.href = `/animal/${encodeURIComponent(activeAnimalData.nombre.toLowerCase())}`; }}
              style={{ borderColor: `${activeEraColor}50`, color: activeEraColor }}
              className="font-mono text-[12px] uppercase tracking-widest px-3 py-1.5 rounded-lg border bg-transparent hover:opacity-80 transition-all"
            >
              Ver →
            </button>
            <button onClick={() => setActiveAnimal(null)}
              className={`w-6 h-6 flex items-center justify-center rounded-lg ${isLight ? "text-stone-400 hover:text-stone-700" : "text-[#4a3f32] hover:text-[#f5e6c8]"} transition-all`}>
              <X size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}