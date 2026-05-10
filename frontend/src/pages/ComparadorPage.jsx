// src/pages/ComparadorPage.jsx
import React, { useState, useMemo } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Search, X, ArrowLeft, RefreshCw, Scale } from "lucide-react";
import { useUser } from "../context/useUser";
import { useTranslation } from "../hooks/useTranslation";
import { allAnimals } from "../data/allData";
import { getDietConfig, getDietLabel } from "../data/dietConfig";

// ── Parsear longitud en metros ────────────────────────────────────────────────
function parseLongitudMetros(longitud) {
  if (!longitud) return null;
  const str = String(longitud).toLowerCase();
  const cmMatch = str.match(/([\d.]+)\s*cm/);
  if (cmMatch) return parseFloat(cmMatch[1]) / 100;
  const rangeMatch = str.match(/([\d.]+)\s*[-–]\s*([\d.]+)/);
  if (rangeMatch) return parseFloat(rangeMatch[2]);
  const numMatch = str.match(/([\d.]+)/);
  if (numMatch) return parseFloat(numMatch[1]);
  return null;
}

// ── Silueta humana SVG (1.75m de referencia) ─────────────────────────────────
const HUMAN_PATH = `M 12,4 C 12,6.2 10.2,8 8,8 C 5.8,8 4,6.2 4,4 C 4,1.8 5.8,0 8,0 C 10.2,0 12,1.8 12,4 Z
  M 3,9 L 13,9 L 14,20 L 10,20 L 10,32 L 6,32 L 6,20 L 2,20 Z
  M 2,20 L 0,32 L 3,32 L 5,22 Z
  M 14,20 L 16,32 L 13,32 L 11,22 Z`;

const HUMAN_HEIGHT_M = 1.75;

// ── Buscador de animal ────────────────────────────────────────────────────────
function AnimalPicker({ value, onChange, exclude, isLight, accentHex, label }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return allAnimals
      .filter(a =>
        a.nombre.toLowerCase().includes(query.toLowerCase()) &&
        a.id !== exclude?.id
      )
      .slice(0, 8);
  }, [query, exclude]);

  const select = (animal) => { onChange(animal); setQuery(""); setOpen(false); };

  return (
    <div className="flex flex-col gap-2">
      <p className={`font-mono text-[9px] uppercase tracking-[0.2em] ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
        {label}
      </p>
      {value ? (
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${isLight ? "border-stone-200 bg-stone-50" : "border-[#2a2520] bg-[#0f0e0c]"}`}>
          <img src={value.imagen} alt={value.nombre} className="w-10 h-10 rounded-lg object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            <p className={`font-mono text-[11px] font-bold uppercase truncate ${isLight ? "text-stone-800" : "text-[#f5e6c8]"}`}>{value.nombre}</p>
            <p className={`font-mono text-[9px] ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>{value.longitud || "?"}</p>
          </div>
          <button onClick={() => onChange(null)} className={`shrink-0 transition-colors ${isLight ? "text-stone-400 hover:text-stone-700" : "text-[#4a3f32] hover:text-[#f5e6c8]"}`}>
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${isLight ? "border-stone-200 bg-stone-50" : "border-[#2a2520] bg-[#0f0e0c]"}`}>
            <Search size={14} style={{ color: accentHex }} />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="Buscar especie..."
              className={`flex-1 bg-transparent font-mono text-[11px] uppercase tracking-wide outline-none ${isLight ? "text-stone-700 placeholder:text-stone-300" : "text-[#f5e6c8] placeholder:text-[#3a3028]"}`}
            />
          </div>
          {open && results.length > 0 && (
            <div className={`absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-2xl overflow-hidden z-30 ${isLight ? "bg-white border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
              {results.map(a => {
                const cfg = getDietConfig(a.dieta);
                return (
                  <button key={a.id} onMouseDown={() => select(a)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left border-b last:border-none transition-colors
                      ${isLight ? "border-stone-50 hover:bg-amber-50" : "border-[#1a1816] hover:bg-amber-600/5"}`}>
                    <img src={a.imagen} alt={a.nombre} className="w-9 h-9 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className={`font-mono text-[11px] font-bold uppercase truncate ${isLight ? "text-stone-800" : "text-[#f5e6c8]"}`}>{a.nombre}</p>
                      <p className={`font-mono text-[9px] ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>{a.era}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase shrink-0 ${cfg.color.bg} ${cfg.color.text} ${cfg.color.border}`}>{cfg.emoji}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── parsear altura ────────────────────────────────────────────────────────────
function parseAlturaMetros(altura) {
  if (!altura) return null;
  const str = String(altura).toLowerCase();
  const cmMatch = str.match(/([\d.]+)\s*cm/);
  if (cmMatch) return parseFloat(cmMatch[1]) / 100;
  const rangeMatch = str.match(/([\d.]+)\s*[-–]\s*([\d.]+)/);
  if (rangeMatch) return parseFloat(rangeMatch[2]);
  const numMatch = str.match(/([\d.]+)/);
  if (numMatch) return parseFloat(numMatch[1]);
  return null;
}

// ── Visualizador: rectángulo ancho=longitud, alto=altura ──────────────────────
function ScaleVisualizer({ animalA, animalB, colorA, colorB, isLight }) {
  const containerRef = React.useRef(null);
  const [containerW, setContainerW] = React.useState(600);

  React.useEffect(() => {
    const ro = new ResizeObserver(([e]) => setContainerW(Math.round(e.contentRect.width)));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const lonA = parseLongitudMetros(animalA?.longitud);
  const lonB = parseLongitudMetros(animalB?.longitud);
  const altA = parseAlturaMetros(animalA?.altura);
  const altB = parseAlturaMetros(animalB?.altura);

  const HUMAN_H = HUMAN_HEIGHT_M;
  const HUMAN_W = 0.5; // anchura humano estimada

  // Total de metros horizontales que hay que mostrar
  const GAP_M = 1; // separación entre elementos en metros
  const totalLonM = HUMAN_W + GAP_M + (lonA || 0) + GAP_M + (lonB || 0) + GAP_M;
  const maxAltM = Math.max(altA || 0, altB || 0, HUMAN_H, 1);

  const CANVAS_H = 240;
  const PADDING_LEFT = 40; // espacio para eje Y
  const CANVAS_W = containerW - PADDING_LEFT - 16;

  // Escala: la que permita que TODO quepa tanto en ancho como en alto
  const scaleH = CANVAS_H / maxAltM;
  const scaleW = CANVAS_W / totalLonM;
  const PX_PER_M = Math.min(scaleH, scaleW);
  const humanUrl = "https://imgur.com/gBbR4lF.png";
  const mutedColor = isLight ? "#a09080" : "#4a3f32";

  const humanPxH = Math.round(HUMAN_H * PX_PER_M);
  const humanPxW = Math.round(HUMAN_W * PX_PER_M);

  const rectA = animalA && lonA && altA
    ? { w: Math.round(lonA * PX_PER_M), h: Math.round(altA * PX_PER_M) } : null;
  const rectB = animalB && lonB && altB
    ? { w: Math.round(lonB * PX_PER_M), h: Math.round(altB * PX_PER_M) } : null;

  const GAP = Math.round(GAP_M * PX_PER_M);
  const LEFT_MARGIN = PADDING_LEFT;
  const humanRight = LEFT_MARGIN + humanPxW + GAP;
  const rectARight = humanRight + (rectA?.w || lonA ? Math.round((lonA||0) * PX_PER_M) : 0) + GAP;
  const totalW = containerW;

  return (
    <div ref={containerRef}
      className={`relative rounded-xl overflow-hidden ${isLight ? "bg-stone-50" : "bg-[#0c0b0a]"}`}
      style={{ minHeight: CANVAS_H + 80 + 20 }}
    >
      {/* Cuadrícula */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: isLight ? 0.1 : 0.06 }}>
        <defs>
          <pattern id="g-s" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={isLight ? "#000" : "#fff"} strokeWidth="0.5" />
          </pattern>
          <pattern id="g-l" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke={isLight ? "#000" : "#fff"} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g-s)" />
        <rect width="100%" height="100%" fill="url(#g-l)" />
      </svg>

      {/* Eje Y */}
      <div className="absolute left-2 pointer-events-none" style={{ bottom: 40, height: CANVAS_H }}>
        {Array.from({ length: Math.ceil(maxAltM) + 1 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", bottom: i * PX_PER_M, left: 0,
            display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ fontFamily: "monospace", fontSize: 8, color: mutedColor }}>{i}m</span>
            <div style={{ width: 6, height: 1, background: mutedColor, opacity: 0.4 }} />
          </div>
        ))}
      </div>

      {/* Contenido */}
      <div style={{ position: "relative", paddingBottom: 40, paddingTop: 16, minHeight: CANVAS_H + 68 }}>

        {/* Humano */}
        <div style={{ position: "absolute", bottom: 40, left: LEFT_MARGIN,
          display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={humanUrl} alt="Humano" style={{
            height: humanPxH, width: "auto",
            objectFit: "contain", objectPosition: "bottom",
            filter: isLight ? "brightness(0) opacity(0.3)" : "brightness(0) invert(1) opacity(0.25)",
          }} />
          <span style={{ fontFamily: "monospace", fontSize: 8, color: mutedColor, marginTop: 3 }}>
            1.75m
          </span>
        </div>

        {/* Rectángulo A */}
        {rectA && (
          <div style={{ position: "absolute", bottom: 40, left: humanRight }}>
            {/* Rectángulo */}
            <div style={{
              width: rectA.w, height: rectA.h,
              background: `${colorA}30`,
              border: `2px solid ${colorA}`,
              borderRadius: 4,
              boxShadow: `0 0 16px ${colorA}30`,
              position: "relative",
            }}>
                {/* Nombre centrado */}
              <span style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                fontFamily: "monospace", fontSize: 10, color: colorA,
                fontWeight: "bold", textTransform: "uppercase",
                textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                whiteSpace: "nowrap",
              }}>
                {animalA.nombre}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
              <span style={{ fontFamily: "monospace", fontSize: 8, color: `${colorA}99` }}>
                ↔ {animalA.longitud}
              </span>
            </div>
          </div>
        )}

        {/* Rectángulo B */}
        {rectB && (
          <div style={{ position: "absolute", bottom: 40, left: rectARight }}>
            <div style={{
              width: rectB.w, height: rectB.h,
              background: `${colorB}30`,
              border: `2px solid ${colorB}`,
              borderRadius: 4,
              boxShadow: `0 0 16px ${colorB}30`,
              position: "relative",
            }}>
              {/* Nombre centrado */}
              <span style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                fontFamily: "monospace", fontSize: 10, color: colorB,
                fontWeight: "bold", textTransform: "uppercase",
                textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                whiteSpace: "nowrap",
              }}>
                {animalB.nombre}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
              <span style={{ fontFamily: "monospace", fontSize: 8, color: `${colorB}99` }}>
                ↔ {animalB.longitud}
              </span>
            </div>
          </div>
        )}

        {/* Animales sin altura — solo longitud como barra horizontal */}
        {animalA && lonA && !altA && (
          <div style={{ position: "absolute", bottom: 40, left: humanRight,
            display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ fontFamily: "monospace", fontSize: 9, fontWeight: "bold",
              textTransform: "uppercase", color: colorA, marginBottom: 4 }}>
              {animalA.nombre}
            </span>
            <div style={{ width: Math.round(lonA * PX_PER_M), height: 28,
              background: `${colorA}30`, border: `2px solid ${colorA}`, borderRadius: 4,
              display: "flex", alignItems: "center", paddingLeft: 8 }}>
              <span style={{ fontFamily: "monospace", fontSize: 9, color: colorA, fontWeight: "bold" }}>
                {animalA.longitud}
              </span>
            </div>
            <span style={{ fontFamily: "monospace", fontSize: 8, color: mutedColor, marginTop: 2 }}>
              Sin datos de altura
            </span>
          </div>
        )}
        {animalB && lonB && !altB && (
          <div style={{ position: "absolute", bottom: 40, left: rectARight,
            display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ fontFamily: "monospace", fontSize: 9, fontWeight: "bold",
              textTransform: "uppercase", color: colorB, marginBottom: 4 }}>
              {animalB.nombre}
            </span>
            <div style={{ width: Math.round(lonB * PX_PER_M), height: 28,
              background: `${colorB}30`, border: `2px solid ${colorB}`, borderRadius: 4,
              display: "flex", alignItems: "center", paddingLeft: 8 }}>
              <span style={{ fontFamily: "monospace", fontSize: 9, color: colorB, fontWeight: "bold" }}>
                {animalB.longitud}
              </span>
            </div>
            <span style={{ fontFamily: "monospace", fontSize: 8, color: mutedColor, marginTop: 2 }}>
              Sin datos de altura
            </span>
          </div>
        )}
      </div>

      {/* Línea de base */}
      <div className="absolute left-0 right-0 h-[2px]"
        style={{ bottom: 40, background: isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)" }} />

      {/* Leyenda */}
      <div className="absolute bottom-2 right-4 flex items-center gap-4 pointer-events-none">
        <span style={{ fontFamily: "monospace", fontSize: 8, color: mutedColor }}>↕ Alto · ↔ Largo · misma escala</span>
      </div>
    </div>
  );
}
// ── Stat row ──────────────────────────────────────────────────────────────────
function StatRow({ label, valA, valB, isLight }) {
  return (
    <div className={`flex items-center gap-3 py-2 border-b last:border-none ${isLight ? "border-stone-100" : "border-[#1a1816]"}`}>
      <span className={`font-mono text-[9px] uppercase tracking-widest w-20 shrink-0 ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>{label}</span>
      <span className={`flex-1 font-mono text-[11px] font-bold ${isLight ? "text-stone-700" : "text-[#f5e6c8]"}`}>{valA || "—"}</span>
      <span className={`w-px h-4 ${isLight ? "bg-stone-200" : "bg-[#2a2520]"}`} />
      <span className={`flex-1 font-mono text-[11px] font-bold text-right ${isLight ? "text-stone-700" : "text-[#f5e6c8]"}`}>{valB || "—"}</span>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function ComparadorPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { theme, language } = useUser();
  const isLight = theme === "light";

  const initA = allAnimals.find(a => a.nombre.toLowerCase() === (params.get("a") || "").toLowerCase()) || null;
  const initB = allAnimals.find(a => a.nombre.toLowerCase() === (params.get("b") || "").toLowerCase()) || null;
  const [animalA, setAnimalA] = useState(initA);
  const [animalB, setAnimalB] = useState(initB);

  const cfgA = animalA ? getDietConfig(animalA.dieta) : null;
  const cfgB = animalB ? getDietConfig(animalB.dieta) : null;
  const colorA = cfgA?.fill || "#d97706";
  const colorB = cfgB?.fill || "#6b5e4e";

  const metrosA = parseLongitudMetros(animalA?.longitud);
  const metrosB = parseLongitudMetros(animalB?.longitud);

  const comparMsg = useMemo(() => {
    if (!metrosA || !metrosB || metrosA === metrosB) return null;
    const bigger = metrosA > metrosB ? animalA : animalB;
    const smaller = metrosA > metrosB ? animalB : animalA;
    const veces = (Math.max(metrosA, metrosB) / Math.min(metrosA, metrosB)).toFixed(1);
    const diff = Math.abs(metrosA - metrosB).toFixed(1);
    const bigColor = metrosA > metrosB ? colorA : colorB;
    const smallColor = metrosA > metrosB ? colorB : colorA;
    return { bigger, smaller, veces, diff, bigColor, smallColor };
  }, [metrosA, metrosB]);

  const swap = () => { setAnimalA(animalB); setAnimalB(animalA); };

  return (
    <div className={`min-h-screen font-mono transition-colors duration-500 ${isLight ? "bg-[#f5f2ed]" : "bg-[#0c0b0a]"}`}>
      <div className="max-w-5xl mx-auto px-4 py-8 pb-20">

        {/* Back */}
        <button onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-[11px] uppercase tracking-widest mb-8 transition-colors ${isLight ? "text-stone-400 hover:text-stone-700" : "text-stone-600 hover:text-stone-300"}`}>
          <ArrowLeft size={13} /> Volver
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-[3px] bg-amber-600" />
            <span className={`text-[10px] uppercase tracking-[0.2em] ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
              PaleoArchivo · Comparador de tamaño
            </span>
          </div>
          <h1 className={`text-4xl sm:text-5xl font-black tracking-tighter uppercase italic leading-none ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
            ¿Cuánto más <span className="text-amber-600">grande</span>?
          </h1>
        </div>

        {/* Selectores */}
        <div className={`rounded-2xl border p-5 mb-6 ${isLight ? "border-stone-200 bg-white" : "border-[#2a2520] bg-[#0f0e0c]"}`}>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <AnimalPicker value={animalA} onChange={setAnimalA} exclude={animalB}
              isLight={isLight} language={language} accentHex={colorA} label="Especie A" />
            <button onClick={swap}
              className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-all hover:scale-110 mx-auto
                ${isLight ? "border-stone-200 text-stone-400 hover:border-amber-400 hover:text-amber-600"
                          : "border-[#2a2520] text-[#4a3f32] hover:border-amber-600/40 hover:text-amber-500"}`}>
              <RefreshCw size={14} />
            </button>
            <AnimalPicker value={animalB} onChange={setAnimalB} exclude={animalA}
              isLight={isLight} language={language} accentHex={colorB} label="Especie B" />
          </div>
        </div>

        {/* Visualizador */}
        {(animalA || animalB) ? (
          <div className={`rounded-2xl border overflow-hidden mb-6 ${isLight ? "border-stone-200 bg-white" : "border-[#2a2520] bg-[#0f0e0c]"}`}>

            {/* Cabecera */}
            <div className={`px-5 py-3 border-b flex items-center gap-2 ${isLight ? "border-stone-100 bg-stone-50" : "border-[#1a1816] bg-[#0c0b0a]"}`}>
              <Scale size={12} className="text-amber-600" />
              <span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
                Comparación a escala real · humano = 1.75 m de referencia
              </span>
            </div>

            {/* Imagen escalada */}
            <div className="p-4">
              <ScaleVisualizer
                animalA={animalA} animalB={animalB}
                colorA={colorA} colorB={colorB}
                isLight={isLight}
              />
            </div>

            {/* Mensaje */}
            {comparMsg && (
              <div className={`px-6 py-4 border-t text-center ${isLight ? "border-stone-100" : "border-[#1a1816]"}`}>
                <p className={`font-mono text-[12px] leading-relaxed ${isLight ? "text-stone-600" : "text-[#a09080]"}`}>
                  <span className="font-bold" style={{ color: comparMsg.bigColor }}>{comparMsg.bigger.nombre}</span>
                  {" "}era{" "}
                  <span className="font-black text-amber-600">{comparMsg.veces}×</span>
                  {" "}más grande que{" "}
                  <span className="font-bold" style={{ color: comparMsg.smallColor }}>{comparMsg.smaller.nombre}</span>
                  {" "}— diferencia de{" "}
                  <span className="font-black text-amber-600">{comparMsg.diff} m</span>
                </p>
              </div>
            )}

            {/* Stats */}
            {animalA && animalB && (
              <div className={`px-6 py-4 border-t ${isLight ? "border-stone-100" : "border-[#1a1816]"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-bold text-[10px] uppercase tracking-widest flex-1 font-mono" style={{ color: colorA }}>{animalA.nombre}</span>
                  <span className={`font-mono text-[9px] uppercase tracking-widest ${isLight ? "text-stone-300" : "text-[#3a3028]"}`}>vs</span>
                  <span className="font-bold text-[10px] uppercase tracking-widest flex-1 text-right font-mono" style={{ color: colorB }}>{animalB.nombre}</span>
                </div>
                <StatRow label="Longitud" valA={animalA.longitud} valB={animalB.longitud} isLight={isLight} />
                <StatRow label="Altura"   valA={animalA.altura}   valB={animalB.altura}   isLight={isLight} />
                <StatRow label="Dieta"    valA={getDietLabel(animalA.dieta, language)} valB={getDietLabel(animalB.dieta, language)} isLight={isLight} />
                <StatRow label="Era"      valA={animalA.era}      valB={animalB.era}      isLight={isLight} />
              </div>
            )}
          </div>
        ) : (
          <div className={`rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-16 gap-4 ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>
            <span className="text-5xl">⚖️</span>
            <div className="text-center">
              <p className={`font-mono text-[12px] uppercase tracking-[0.2em] font-black mb-1 ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                Selecciona dos especies
              </p>
              <p className={`font-mono text-[10px] uppercase tracking-widest ${isLight ? "text-stone-300" : "text-stone-700"}`}>
                para comparar su tamaño
              </p>
            </div>
          </div>
        )}

        {/* Links fichas */}
        {(animalA || animalB) && (
          <div className="flex gap-3 flex-wrap">
            {animalA && (
              <Link to={`/animal/${encodeURIComponent(animalA.nombre.toLowerCase())}`}
                style={{ borderColor: `${colorA}40`, color: colorA }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border font-mono text-[10px] uppercase tracking-widest hover:opacity-80 transition-all min-w-[200px]">
                Ver ficha → {animalA.nombre}
              </Link>
            )}
            {animalB && (
              <Link to={`/animal/${encodeURIComponent(animalB.nombre.toLowerCase())}`}
                style={{ borderColor: `${colorB}40`, color: colorB }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border font-mono text-[10px] uppercase tracking-widest hover:opacity-80 transition-all min-w-[200px]">
                Ver ficha → {animalB.nombre}
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  );
}