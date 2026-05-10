// src/components/AnimalMap.jsx
// Mini mapa de hallazgo — globo geoOrthographic centrado en el punto de hallazgo

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import { MapPin, ExternalLink } from "lucide-react";
import { useUser } from "../context/useUser";
import { ANIMAL_COORDS } from "../data/paleomapCoords";

const MODERN_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";


const geoCache = {};

// Siempre usamos el mapa moderno de países para el fondo visual
let modernGeo = null;
async function fetchGeo() {
  if (modernGeo) return modernGeo;
  try {
    const res = await fetch(MODERN_URL);
    if (!res.ok) throw new Error();
    modernGeo = await res.json();
    return modernGeo;
  } catch { return null; }
}



// ── Componente ────────────────────────────────────────────────────────────────
export default function AnimalMap({ animal, hex }) {
  const { theme } = useUser();
  const navigate = useNavigate();
  const isLight = theme === "light";
  const containerRef = useRef(null);
  const [W, setW] = useState(400);
  const H = Math.round(W * 0.85);

  const [geojson, setGeojson]   = useState(null);
  const [paleoPoint, setPaleoPoint] = useState(null); // [lon, lat] reconstruido
  const [loading, setLoading]   = useState(true);

  const coords = ANIMAL_COORDS[animal?.nombre?.toUpperCase()];

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!coords) { setLoading(false); return; }
    setLoading(true);
    fetchGeo().then(geo => {
      setGeojson(geo);
      setPaleoPoint([coords.lon, coords.lat]);
      setLoading(false);
    });
  }, [animal?.nombre]);

  if (!coords) {
    return (
      <div className={`rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-10 gap-3
        ${isLight ? "border-stone-200 bg-stone-50" : "border-white/[0.07] bg-white/[0.02]"}`}>
        <MapPin size={22} className={isLight ? "text-stone-300" : "text-stone-700"} />
        <div className="text-center px-4">
          <p className={`font-mono text-[11px] uppercase tracking-[0.2em] font-black ${isLight ? "text-stone-400" : "text-stone-600"}`}>
            Ubicación no disponible
          </p>
          <p className={`font-mono text-[10px] uppercase tracking-widest mt-1 ${isLight ? "text-stone-300" : "text-stone-700"}`}>
            Coordenadas de hallazgo no registradas
          </p>
        </div>
      </div>
    );
  }

  const [pLon, pLat] = paleoPoint ?? [coords.lon, coords.lat];

  // geoOrthographic — globo terráqueo centrado exactamente en el punto
  // El océano queda perfectamente definido dentro del círculo, sin artefactos
  const scale = W / 2.2;
  const proj = d3.geoOrthographic()
    .scale(scale)
    .translate([W / 2, H / 2])
    .rotate([-pLon, -pLat, 0])
    .clipAngle(90);

  const path = d3.geoPath().projection(proj);
  const point = proj([pLon, pLat]);
  const sphere = { type: "Sphere" };
  const grat = d3.geoGraticule()();

  const ocean  = isLight ? "#b8d4e8" : "#0a1a28";
  const land   = isLight ? "#c4a97a" : "#4a3a1e";
  const stroke = isLight ? "#7a6040" : "#9a7a50";
  const grid   = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)";

  const mapsUrl = `https://maps.google.com/?q=${coords.lat},${coords.lon}`;

  return (
    <div ref={containerRef}
      className={`rounded-xl border overflow-hidden ${isLight ? "border-stone-200" : "border-white/[0.07]"}`}>

      {/* Cabecera */}
      <div
        className={`flex items-center justify-between px-4 py-2.5 border-b
          ${isLight ? "border-stone-100 bg-stone-50" : "border-white/[0.06]"}`}
        style={{ background: isLight ? undefined : `linear-gradient(90deg, ${hex}08 0%, transparent 70%)` }}
      >
        <div className="flex items-center gap-2">
          <MapPin size={12} style={{ color: hex }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: hex }}>
            Zona de hallazgo
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/mapa")}
            style={{ borderColor: `${hex}40`, color: hex }}
            className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest border rounded-lg px-2 py-1 bg-transparent hover:opacity-80 transition-all"
          >
            <MapPin size={9} /> Ver mapa completo
          </button>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest transition-colors
              ${isLight ? "text-stone-400 hover:text-stone-700" : "text-stone-600 hover:text-stone-300"}`}>
            <ExternalLink size={9} /> Maps
          </a>
        </div>
      </div>

      {/* Mapa */}
      <div className="relative" style={{ background: isLight ? "#e8e0d0" : "#0c0b0a" }}>
        {loading ? (
          <div className="flex items-center justify-center" style={{ height: H }}>
            <div className="w-5 h-5 rounded-full border-2 animate-spin"
              style={{ borderColor: `${hex}40`, borderTopColor: hex }} />
          </div>
        ) : (
          <svg width={W} height={H} style={{ display: "block", width: "100%", height: "auto", overflow: "hidden" }}>
            {/* Fondo neutro fuera del globo */}
            <rect width={W} height={H} fill={isLight ? "#e8e0d0" : "#0c0b0a"} />
            {/* Esfera = océano */}
            <path d={path(sphere)} fill={ocean} stroke={isLight ? "#a0b8cc" : "#1a3040"} strokeWidth={1} />
            {/* Cuadrícula */}
            <path d={path(grat)} fill="none" stroke={grid} strokeWidth={0.5} />
            {/* Costas / países */}
            {geojson?.features?.map((f, i) => (
              <path key={i} d={path(f)} fill={land} stroke={stroke} strokeWidth={0.7} />
            ))}

            {/* Punto de hallazgo */}
            {point && (
              <g>
                <circle cx={point[0]} cy={point[1]} r={22} fill={hex} opacity={0.12} />
                <circle cx={point[0]} cy={point[1]} r={13} fill={hex} opacity={0.22} />
                <circle cx={point[0]} cy={point[1]} r={6}  fill={hex} stroke="white" strokeWidth={2}
                  style={{ filter: `drop-shadow(0 0 8px ${hex})` }} />
              </g>
            )}
          </svg>
        )}

        {/* Badges */}
        {!loading && (
          <>
            <div className="absolute bottom-2 left-2 bg-black/65 backdrop-blur-sm rounded-lg px-2 py-1 pointer-events-none">
              <span className="font-mono text-[8px]" style={{ color: hex }}>
                {Math.abs(coords.lat).toFixed(1)}°{coords.lat >= 0 ? "N" : "S"}{" "}
                {Math.abs(coords.lon).toFixed(1)}°{coords.lon >= 0 ? "E" : "W"}
              </span>
            </div>

          </>
        )}
      </div>
    </div>
  );
}