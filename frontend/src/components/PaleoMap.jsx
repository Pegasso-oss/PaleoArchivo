// src/components/PaleoMap.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import { X, Loader } from "lucide-react";
import { useUser } from "../context/useUser";
import { useTranslation } from "../hooks/useTranslation";
import { allAnimals } from "../data/allData";
import { getHallazgosForAnimals } from "../data/paleomapCoords";

const ERA_CONFIG = {
  Precámbrico: { color: "#9b7bd6", bg: "rgba(155,123,214,0.15)", border: "rgba(155,123,214,0.5)", labelKey: "precambrian", label: "Precámbrico", ma: "635–538 Ma" },
  Paleozoico: { color: "#6aafc5", bg: "rgba(106,175,197,0.15)", border: "rgba(106,175,197,0.5)", label: "Paleozoico", ma: "538–252 Ma" },
  Mesozoico:  { color: "#6abf6a", bg: "rgba(106,191,106,0.15)", border: "rgba(106,191,106,0.5)", label: "Mesozoico",  ma: "252–66 Ma"  },
  Cenozoico:  { color: "#cf9a5a", bg: "rgba(207,154,90,0.15)",  border: "rgba(207,154,90,0.5)",  label: "Cenozoico",  ma: "66 Ma–hoy" },
};

const ERA_MAP = {
  "Ediacárico": "Precámbrico",
  "Cámbrico": "Paleozoico", "Ordovícico": "Paleozoico", "Silúrico": "Paleozoico",
  "Devónico": "Paleozoico", "Carbonífero": "Paleozoico", "Pérmico": "Paleozoico",
  "Triásico": "Mesozoico",  "Jurásico": "Mesozoico",    "Cretácico": "Mesozoico",
  "Paleoceno": "Cenozoico", "Eoceno": "Cenozoico",      "Oligoceno": "Cenozoico",
  "Mioceno": "Cenozoico",   "Plioceno": "Cenozoico",    "Pleistoceno": "Cenozoico",
  "Holoceno": "Cenozoico",
};

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

// ── Tooltip individual ────────────────────────────────────────────────────────
function Tooltip({ animal, eraColor, isLight, onClose, am }) {
  const navigate = useNavigate();
  return (
    <div
      style={{ borderColor: `${eraColor}60`, background: isLight ? "#fff" : "#0f0e0c", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
      className="rounded-xl overflow-hidden w-44 border"
    >
      {animal?.imagen && (
        <div className="relative h-20">
          <img src={animal.imagen} alt={animal.nombre} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button onClick={onClose} className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-all">
            <X size={9} />
          </button>
          <span style={{ background: `${eraColor}cc`, color: "#fff" }} className="absolute bottom-1.5 left-1.5 font-mono text-[8px] uppercase tracking-wide px-1.5 py-0.5 rounded">
            {animal.era}
          </span>
        </div>
      )}
      <div className="p-2.5 flex flex-col gap-1.5">
        <p style={{ color: eraColor }} className="font-mono text-[10px] font-bold uppercase tracking-wide leading-tight">{animal.nombre}</p>
        {animal?.dieta && (
          <p className={`font-mono text-[9px] ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>{animal.dieta}</p>
        )}
        <button
          onClick={() => navigate(`/animal/${encodeURIComponent(animal.nombre.toLowerCase())}`)}
          style={{ borderColor: `${eraColor}50`, color: eraColor }}
          className="w-full flex items-center justify-center gap-1 py-1 rounded-lg border bg-transparent font-mono text-[9px] uppercase tracking-widest hover:opacity-80 transition-all"
        >
          {am.viewRecord || "Ver ficha"} →
        </button>
      </div>
    </div>
  );
}

// ── Cluster Tooltip ───────────────────────────────────────────────────────────
function ClusterTooltip({ puntos, isLight, onClose, am }) {
  const navigate = useNavigate();
  return (
    <div
      style={{ background: isLight ? "#fff" : "#0f0e0c", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", border: `1px solid ${isLight ? "#e5e0d8" : "#2a2520"}` }}
      className="rounded-xl overflow-hidden w-52"
    >
      <div className={`flex items-center justify-between px-3 py-2 border-b ${isLight ? "border-stone-100 bg-stone-50" : "border-[#1a1816] bg-[#0c0b0a]"}`}>
        <span className={`font-mono text-[9px] uppercase tracking-widest font-bold ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
          {puntos.length} {puntos.length === 1 ? (am.speciesSingular || "especie") : (am.speciesPlural || "especies")}
        </span>
        <button onClick={onClose} className={`w-4 h-4 flex items-center justify-center rounded ${isLight ? "text-stone-400 hover:text-stone-700" : "text-[#4a3f32] hover:text-[#f5e6c8]"}`}>
          <X size={10} />
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {puntos.map(p => {
          const animal = p.animal;
          const color = ERA_CONFIG[p.eraGrupo]?.color || "#cf9a5a";
          return (
            <button
              key={p.id}
              onClick={() => navigate(`/animal/${encodeURIComponent(animal.nombre.toLowerCase())}`)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 border-b last:border-none text-left transition-all ${isLight ? "border-stone-50 hover:bg-amber-50" : "border-[#1a1816] hover:bg-amber-600/5"}`}
            >
              {animal?.imagen && (
                <div className="w-8 h-8 shrink-0 rounded-lg overflow-hidden">
                  <img src={animal.imagen} alt={animal.nombre} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p style={{ color }} className="font-mono text-[10px] font-bold uppercase tracking-wide truncate leading-tight">{animal?.nombre}</p>
                <p className={`font-mono text-[8px] truncate ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>{animal?.era}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Mapa SVG ──────────────────────────────────────────────────────────────────
function GeoMap({ geojson, puntos, isLight, onPointClick, activeCluster, svgRef, zoomRef, projRef }) {
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

  const proj = d3.geoNaturalEarth1().scale(W / 6.3).translate([W / 2, H / 2]);
  if (projRef) projRef.current = proj;
  const path = d3.geoPath().projection(proj);
  const grat = d3.geoGraticule()();

  const handleZoom = (factor) => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, factor);
  };

  const handleReset = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(400).call(zoomRef.current.transform, d3.zoomIdentity);
  };

  const ocean  = isLight ? "#b8d4e8" : "#0a1a28";
  const land   = isLight ? "#c4a97a" : "#4a3a1e";
  const stroke = isLight ? "#7a6040" : "#9a7a50";
  const grid   = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.07)";
  const activeIds = new Set(activeCluster?.map(a => a.id) || []);

  return (
    <div ref={containerRef} className="w-full relative">
      <svg ref={svgRef} width={W} height={H} style={{ display: "block", width: "100%", height: "auto", cursor: "grab" }}>
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
            const isActive = activeIds.has(p.id);
            const r = isActive ? 3.5 : 2.5;
            return (
              <g key={`${p.id}-${p.lon}-${p.lat}`} style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); onPointClick(p, cx, cy, e); }}>
                <circle cx={cx} cy={cy} r={isActive ? 6 : 5} fill={p.eraColor} opacity={0.15} />
                <circle cx={cx} cy={cy} r={r} fill={p.eraColor} stroke={isActive ? "white" : "rgba(255,255,255,0.6)"} strokeWidth={isActive ? 1 : 0.8} />
              </g>
            );
          })}
        </g>
      </svg>

      <div className="absolute top-3 right-3 flex flex-col gap-1">
        {[
          { label: "+", fn: () => handleZoom(1.5) },
          { label: "−", fn: () => handleZoom(1/1.5) },
          { label: "↺", fn: handleReset, small: true },
        ].map(({ label, fn, small }) => (
          <button key={label} onClick={fn}
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
function EraCard({ era, config, count, active, onToggle, isLight, am, label }) {
  return (
    <button
      onClick={onToggle}
      style={{ borderColor: active ? config.border : isLight ? "#e5e0d8" : "#2a2520", background: active ? config.bg : "transparent" }}
      className="flex-1 flex flex-col items-start gap-1 px-2 py-2 sm:px-4 sm:py-3 rounded-xl border transition-all hover:scale-[1.02]"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span style={{ background: config.color }} className="w-2 h-2 rounded-full shrink-0" />
          <span style={{ color: active ? config.color : isLight ? "#78716c" : "#6b5e4e" }} className="font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-wide">
            {label}
          </span>
        </div>
        <span style={{ background: active ? config.color : "transparent", borderColor: active ? config.color : isLight ? "#d5cfc8" : "#3a3028" }} className="w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0">
          {active && <span className="text-white font-bold" style={{ fontSize: 9, lineHeight: 1 }}>✓</span>}
        </span>
      </div>
      <span style={{ color: isLight ? "#a09080" : "#4a3f32" }} className="hidden sm:block font-mono text-[9px] uppercase tracking-widest">
        {config.ma}
      </span>
      <span style={{ color: active ? config.color : isLight ? "#a09080" : "#4a3f32" }} className="font-mono text-[10px] font-bold">
        {count} {count === 1 ? (am.speciesSingular || "especie") : (am.speciesPlural || "especies")}
      </span>
    </button>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function PaleoMap() {
  const { theme } = useUser();
  const { tSection } = useTranslation();
  const am = tSection("animalMap");
  const mapEras = tSection("mapEras");
  const isLight = theme === "light";
  const svgRef  = useRef(null);
  const zoomRef = useRef(null);
  const mapRef  = useRef(null);
  const projRef = useRef(null);

  const [geojson, setGeojson]             = useState(null);
  const [loading, setLoading]             = useState(true);
  const [activeCluster, setActiveCluster] = useState(null);
  const [tipPos, setTipPos]               = useState({ x: 0, y: 0 });
  const [activeEras, setActiveEras] = useState({ Precámbrico: true, Paleozoico: true, Mesozoico: true, Cenozoico: true });

  const allHallazgos = React.useMemo(() => {
    const hallazgos = getHallazgosForAnimals(allAnimals);
    return hallazgos.map(h => {
      const animal = allAnimals.find(a => a.id === h.id);
      const eraGrupo = ERA_MAP[animal?.era];
      if (!eraGrupo) return null;
      return { ...h, animal, eraGrupo, eraColor: ERA_CONFIG[eraGrupo]?.color || "#cf9a5a" };
    }).filter(Boolean);
  }, []);

  const puntosFiltrados = React.useMemo(() => allHallazgos.filter(p => activeEras[p.eraGrupo]), [allHallazgos, activeEras]);

  const countByEra = React.useMemo(() => {
    const counts = { Precámbrico: 0, Paleozoico: 0, Mesozoico: 0, Cenozoico: 0 };
    allHallazgos.forEach(p => { counts[p.eraGrupo] = (counts[p.eraGrupo] || 0) + 1; });
    return counts;
  }, [allHallazgos]);

  useEffect(() => { fetchWorld().then(d => { setGeojson(d); setLoading(false); }); }, []);

  const toggleEra = (era) => { setActiveEras(prev => ({ ...prev, [era]: !prev[era] })); setActiveCluster(null); };

  const CLUSTER_RADIUS_PX = 18;

  const handlePoint = (p, svgX, svgY, e) => {
    e.stopPropagation();
    if (activeCluster && activeCluster.some(c => c.id === p.id)) { setActiveCluster(null); return; }
    const proj = projRef.current;
    if (!proj) { setActiveCluster([p]); setTipPos({ x: svgX + 14, y: svgY + 14 }); return; }
    const gEl = svgRef.current?.querySelector("g");
    let scale = 1;
    if (gEl) { const m = (gEl.getAttribute("transform") || "").match(/scale\(([\d.]+)\)/); if (m) scale = parseFloat(m[1]); }
    const effectiveRadius = CLUSTER_RADIUS_PX / scale;
    const nearby = puntosFiltrados.filter(other => { const oc = proj([other.lon, other.lat]); if (!oc) return false; return Math.hypot(oc[0] - svgX, oc[1] - svgY) <= effectiveRadius; });
    const mapRect = mapRef.current?.getBoundingClientRect();
    const mapW = mapRect?.width || 900;
    const mapH = mapRect?.height || 450;
    const svgEl = svgRef.current;
    const svgRect = svgEl?.getBoundingClientRect();
    const svgNaturalW = svgEl?.getAttribute("width") || mapW;
    const displayScale = svgRect ? svgRect.width / svgNaturalW : 1;
    let screenX = svgX * displayScale * scale;
    let screenY = svgY * displayScale * scale;
    if (gEl) { const m = (gEl.getAttribute("transform") || "").match(/translate\(([\d.-]+)[, ]+([\d.-]+)\)/); if (m) { screenX += parseFloat(m[1]) * displayScale; screenY += parseFloat(m[2]) * displayScale; } }
    const tipW = 210;
    const tipH = Math.min(60 + nearby.length * 52, 320);
    let x = screenX + 14; let y = screenY + 14;
    if (x + tipW > mapW - 8) x = screenX - tipW - 8;
    if (x < 8) x = 8;
    if (y + tipH > mapH - 8) y = Math.max(8, screenY - tipH - 8);
    if (y < 8) y = 8;
    setTipPos({ x, y });
    setActiveCluster(nearby.length > 0 ? nearby : [p]);
  };

  return (
    <div className={`rounded-2xl border overflow-hidden ${isLight ? "border-stone-200 bg-white" : "border-[#2a2520] bg-[#0f0e0c]"}`}>

      {/* Tarjetas de era */}
      <div className={`px-5 py-4 border-b ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>
        <p className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-3 ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
          <span className="hidden sm:inline">{am.filterByEra || "Filtrar por era"} — </span>
          {puntosFiltrados.length} {am.of || "de"} {allHallazgos.length} {am.speciesVisible || "especies visibles"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(ERA_CONFIG).map(([era, config]) => (
            <EraCard key={era} era={era} config={config} label={mapEras[config.labelKey] || config.label} count={countByEra[era] || 0} active={activeEras[era]} onToggle={() => toggleEra(era)} isLight={isLight} am={am} />
          ))}
        </div>
      </div>

      {/* Mapa */}
      <div ref={mapRef} className="relative" onClick={() => setActiveCluster(null)}>
        {loading && (
          <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 ${isLight ? "bg-stone-50" : "bg-[#0c0b0a]"}`} style={{ minHeight: 300 }}>
            <Loader size={20} className="animate-spin text-amber-600" />
            <span className={`font-mono text-[10px] uppercase tracking-widest ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
              {am.loadingMap || "Cargando mapa..."}
            </span>
          </div>
        )}

        <GeoMap geojson={geojson} puntos={puntosFiltrados} isLight={isLight} onPointClick={handlePoint} activeCluster={activeCluster} svgRef={svgRef} zoomRef={zoomRef} projRef={projRef} />

        {activeCluster && activeCluster.length > 0 && (
          <div style={{ position: "absolute", top: tipPos.y, left: tipPos.x, zIndex: 20 }} onClick={e => e.stopPropagation()} className="hidden sm:block">
            {activeCluster.length === 1 ? (
              <Tooltip animal={activeCluster[0].animal} eraColor={ERA_CONFIG[activeCluster[0].eraGrupo]?.color || "#cf9a5a"} isLight={isLight} onClose={() => setActiveCluster(null)} am={am} />
            ) : (
              <ClusterTooltip puntos={activeCluster} isLight={isLight} onClose={() => setActiveCluster(null)} am={am} />
            )}
          </div>
        )}

        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1.5 pointer-events-none">
          <span className="font-mono text-[10px] text-white/70">
            {puntosFiltrados.length} {am.findingsOnMap || "hallazgos en el mapa"}
          </span>
        </div>
      </div>

      {/* Panel móvil */}
      {activeCluster && activeCluster.length > 0 && (
        <div className={`sm:hidden border-t ${isLight ? "border-stone-200 bg-stone-50" : "border-[#2a2520] bg-[#0c0b0a]"}`} onClick={e => e.stopPropagation()}>
          {activeCluster.map(p => {
            const animal = p.animal;
            const color = ERA_CONFIG[p.eraGrupo]?.color || "#cf9a5a";
            return (
              <div key={p.id} className={`flex items-center gap-3 px-4 py-2.5 border-b last:border-none ${isLight ? "border-stone-100" : "border-[#1a1816]"}`}>
                {animal?.imagen && (
                  <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden border" style={{ borderColor: `${color}40` }}>
                    <img src={animal.imagen} alt={animal.nombre} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p style={{ color }} className="font-mono text-[10px] font-bold uppercase tracking-wide truncate">{animal?.nombre}</p>
                  <p className={`font-mono text-[9px] truncate ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>{animal?.era}</p>
                </div>
                <button
                  onClick={() => { window.location.href = `/animal/${encodeURIComponent(animal.nombre.toLowerCase())}`; }}
                  style={{ borderColor: `${color}50`, color }}
                  className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-lg border bg-transparent hover:opacity-80 transition-all shrink-0"
                >
                  {am.viewRecord || "Ver"} →
                </button>
              </div>
            );
          })}
          <div className="flex justify-end px-4 py-2">
            <button onClick={() => setActiveCluster(null)} className={`w-6 h-6 flex items-center justify-center rounded-lg ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
              <X size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
