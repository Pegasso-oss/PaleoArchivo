// src/pages/DinoDetailPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { allAnimals } from "../data/allData";
import { useFavorites } from "../context/FavoritesContext";
import { useUser } from "../context/useUser";
import { useTranslation } from "../hooks/useTranslation";
import apiClient from "../api/apiClient";
import Toast from "../components/Toast";
import {
  Ruler,
  Utensils,
  Skull,
  ArrowsUpFromLine,
  Star,
  Pickaxe,
  FlaskConical,
  Layers,
  Clock,
  Dna,
  MapPin,
  Swords,
} from "lucide-react";
import { getDietConfig, getDietLabel } from "../data/dietConfig";

// ── Textos de rivalidad por rol ───────────────────────────────────────────
const getRivalText = (dino, rival, language) => {
  const texts = {
    es: {
      presa: `${rival.nombre} era una presa habitual de`,
      depredador: `${rival.nombre} cazaba activamente a`,
      competidor: `${rival.nombre} competía por los mismos recursos que`,
    },
    en: {
      presa: `${rival.nombre} was regular prey for`,
      depredador: `${rival.nombre} actively hunted`,
      competidor: `${rival.nombre} competed for resources with`,
    },
    fr: {
      presa: `${rival.nombre} était une proie habituelle de`,
      depredador: `${rival.nombre} chassait activement`,
      competidor: `${rival.nombre} était en compétition avec`,
    },
    it: {
      presa: `${rival.nombre} era una preda abituale di`,
      depredador: `${rival.nombre} cacciava attivamente`,
      competidor: `${rival.nombre} competeva per le risorse con`,
    },
  };
  return (texts[language] || texts.es)[rival.rol] || texts.es[rival.rol];
};

// ── Color e icono según rol ───────────────────────────────────────────────
const RIVAL_STYLE = {
  presa: {
    border: "border-red-500/40",
    bg: "bg-red-500/5",
    text: "text-red-400",
    label: { es: "PRESA", en: "PREY", fr: "PROIE", it: "PREDA" },
  },
  depredador: {
    border: "border-blue-500/40",
    bg: "bg-blue-500/5",
    text: "text-blue-400",
    label: {
      es: "DEPREDADOR",
      en: "PREDATOR",
      fr: "PRÉDATEUR",
      it: "PREDATORE",
    },
  },
  competidor: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/5",
    text: "text-amber-400",
    label: { es: "RIVAL", en: "RIVAL", fr: "RIVAL", it: "RIVALE" },
  },
};

const Sparkles = ({ isFav, fill }) => {
  const pts = [
    { x: -38, y: -38, d: 0 },
    { x: 38, y: -38, d: 0.08 },
    { x: -38, y: 38, d: 0.18 },
    { x: 38, y: 38, d: 0.12 },
    { x: 0, y: -50, d: 0.04 },
  ];
  return (
    <AnimatePresence>
      {isFav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          {pts.map((s, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: fill }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: s.x,
                y: s.y,
                opacity: [0, 1, 0],
                scale: [0, 1.6, 0],
              }}
              transition={{ duration: 0.75, ease: "easeOut", delay: s.d }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DinoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, setFavorites } = useFavorites();
  const { theme: colorTheme, language } = useUser();
  const { tSection } = useTranslation();
  const dd = tSection("dinoDetail");
  const isLight = colorTheme === "light";
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const dino = allAnimals.find((d) => d.nombre.toLowerCase() === decodeURIComponent(id).toLowerCase(),);
  const isFav = dino ? isFavorite(dino.id) : false;
  const theme = useMemo(() => getDietConfig(dino?.dieta), [dino]);
  const hex = theme.fill;
  const conservacion = parseInt(dino?.conservacion) || 0;

  const getTheme = (dieta) => getDietConfig(dieta);

  // ── Rivales con datos completos ───────────────────────────────────────
  const rivals = useMemo(() => {
    if (!dino?.rival) return [];
    return dino.rival
      .map((r) => {
        const animal = allAnimals.find((a) => a.id === r.id);
        return animal ? { ...animal, rol: r.rol } : null;
      })
      .filter(Boolean);
  }, [dino]);

  const recommendations = useMemo(() => {
    if (!dino) return [];
    const rivalIds = (dino.rival || []).map((r) => r.id);
    return allAnimals
      .filter((a) => a.nombre.toLowerCase() !== decodeURIComponent(id).toLowerCase())
      .filter((a) => !rivalIds.includes(a.id))
      .filter((a) => a.dieta === dino.dieta || a.era === dino.era)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [id, dino]);

  const handleToggleFavorite = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setToast({ show: true, msg: dd.authRequired, type: "error" });
      return;
    }
    try {
      const response = await apiClient.post("/favorites/add", {
        userId,
        dinoId: dino.id,
        nombre: dino.nombre,
      });
      if (setFavorites)
        setFavorites(response.data.map((fav) => String(fav.id)));
      setToast({
        show: true,
        msg: isFav ? dd.removedFav : dd.addedFav,
        type: "success",
      });
    } catch {
      setToast({ show: true, msg: dd.connectionError, type: "error" });
    }
  };

  if (!dino)
    return (
      <div
        className={`min-h-screen flex items-center justify-center font-mono italic tracking-[0.5em] text-sm
      ${isLight ? "bg-[#f5f2ed] text-stone-400" : "bg-[#0f0d0b] text-amber-600"}`}
      >
        {dd.loading}
      </div>
    );

  const fossilFields = [
    { label: dd.method, value: dino.metodo, icon: <FlaskConical size={11} /> },
    { label: dd.material, value: dino.material, icon: <Layers size={11} /> },
    { label: dd.extinction, value: dino.extincion, icon: <Clock size={11} /> },
  ].filter((f) => f.value);

  const conservacionLabel =
    conservacion >= 80
      ? dd.conservationExcellent
      : conservacion >= 50
        ? dd.conservationModerate
        : dd.conservationFragmentary;

  const conservacionColor =
    conservacion >= 80 ? "#22c55e" : conservacion >= 50 ? "#f59e0b" : "#ef4444";

  const extraFields = [
    { label: dd.type, value: dino.tipo },
    { label: dd.era, value: dino.era },
  ].filter((f) => f.value);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen transition-colors duration-500
        ${isLight ? "bg-[#f5f2ed] text-stone-900" : "bg-[#1d1914] text-white"}`}
    >
      <Toast
        isVisible={toast.show}
        message={toast.msg}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />

      <div className="max-w-[1920px] mx-auto px-4 lg:px-10 py-6 pb-28">
        {/* ── TOP BAR ── */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-amber-500/80 hover:text-amber-500 font-mono text-xs uppercase tracking-[0.3em] transition-colors flex items-center gap-2 group"
          >
            <span className="text-lg group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            {dd.backToRecords}
          </button>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-6 xl:gap-12 items-start">
          {/* ════ COLUMNA IZQUIERDA ════ */}
          <div className="flex flex-col gap-5">
            {/* Título + ID + estrella */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] break-words min-w-0">
                  {dino.nombre}
                </h1>
                <div className="hidden lg:flex items-center gap-2 shrink-0 mt-2">
                  <div
                    className="font-mono text-lg font-black px-3 py-1.5 rounded-lg border"
                    style={{
                      borderColor: `${hex}50`,
                      color: hex,
                      backgroundColor: `${hex}14`,
                    }}
                  >
                    #{String(dino.id).padStart(3, "0")}
                  </div>
                  <button
                    onClick={handleToggleFavorite}
                    className="relative p-2 outline-none group"
                  >
                    <Sparkles isFav={isFav} fill={hex} />
                    <motion.div
                      animate={{
                        scale: isFav ? [1, 1.5, 1] : 1,
                        rotate: isFav ? [0, 12, -12, 0] : 0,
                      }}
                    >
                      <Star
                        size={30}
                        fill={isFav ? hex : "none"}
                        stroke={isFav ? hex : "currentColor"}
                        className={`transition-all duration-300 group-hover:scale-110 ${isFav ? "" : "opacity-25 hover:opacity-60"}`}
                      />
                    </motion.div>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="h-px w-8 shrink-0"
                    style={{ backgroundColor: hex }}
                  />
                  <span
                    className="font-mono text-[14px] uppercase tracking-[0.3em] truncate"
                    style={{ color: hex }}
                  >
                    {dino.subName}
                  </span>
                </div>
                <div className="flex lg:hidden items-center gap-1.5 shrink-0">
                  <div
                    className="font-mono text-[12px] font-black px-2.5 py-1 rounded-lg border"
                    style={{
                      borderColor: `${hex}50`,
                      color: hex,
                      backgroundColor: `${hex}14`,
                    }}
                  >
                    #{String(dino.id).padStart(3, "0")}
                  </div>
                  <button
                    onClick={handleToggleFavorite}
                    className="relative p-1.5 outline-none group"
                  >
                    <Sparkles isFav={isFav} fill={hex} />
                    <motion.div
                      animate={{
                        scale: isFav ? [1, 1.5, 1] : 1,
                        rotate: isFav ? [0, 12, -12, 0] : 0,
                      }}
                    >
                      <Star
                        size={20}
                        fill={isFav ? hex : "none"}
                        stroke={isFav ? hex : "currentColor"}
                        className={`transition-all duration-300 ${isFav ? "" : "opacity-25"}`}
                      />
                    </motion.div>
                  </button>
                </div>
              </div>
            </div>

            {/* Imagen móvil */}
            <div
              className="lg:hidden rounded-xl overflow-hidden border aspect-[4/3]"
              style={{ borderColor: `${hex}30` }}
            >
              <img
                src={dino.imagen}
                alt={dino.nombre}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Descripción */}
            <p
              className={`text-base leading-relaxed font-light border rounded-xl p-5
              ${isLight ? "text-stone-600 bg-white border-stone-100" : "text-stone-400 bg-white/[0.03] border-white/[0.06]"}`}
            >
              {dino.descripcion}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                {
                  label: dd.length,
                  value: dino.longitud,
                  icon: <Ruler size={11} />,
                  accentHex: "#78716c",
                },
                {
                  label: dd.height,
                  value: dino.altura,
                  icon: <ArrowsUpFromLine size={11} />,
                  accentHex: "#78716c",
                },
                {
                  label: dd.diet,
                  value: dino.dieta,
                  icon: <Utensils size={11} />,
                  accentHex: hex,
                  textColor: theme.text,
                },
                {
                  label: dd.status,
                  value: dino.estado || dd.extinct,
                  icon: <Skull size={11} />,
                  accentHex: dino.estado === "VIVO" ? "#22d3ee" : "#ef4444",
                  textColor:
                    dino.estado === "VIVO" ? "text-cyan-400" : "text-red-400",
                },
              ].map(({ label, value, icon, accentHex, textColor }) => (
                <div
                  key={label}
                  className={`relative flex flex-col gap-2 p-4 rounded-xl border overflow-hidden
                    ${isLight ? "bg-white border-stone-100" : "bg-white/[0.04] border-white/[0.06]"}`}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ backgroundColor: accentHex }}
                  />
                  <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 mt-1">
                    <span style={{ color: accentHex }}>{icon}</span> {label}
                  </div>
                  <div
                    className={`text-xl font-mono font-black leading-none ${textColor || (isLight ? "text-stone-900" : "text-white")}`}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Conservación fósil */}
            {dino.conservacion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={`rounded-xl border overflow-hidden
                  ${isLight ? "bg-white border-stone-100" : "bg-white/[0.04] border-white/[0.06]"}`}
              >
                <div
                  className="px-5 py-3.5 flex items-center justify-between"
                  style={{
                    background: `linear-gradient(90deg, ${hex}12 0%, transparent 70%)`,
                    borderBottom: `1px solid ${hex}18`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Pickaxe size={12} style={{ color: hex }} />
                    <span
                      className="font-mono text-[14px] font-black uppercase tracking-[0.25em]"
                      style={{ color: hex }}
                    >
                      {dd.fossilConservation}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="font-mono text-[12px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-lg border"
                      style={{
                        color: conservacionColor,
                        borderColor: `${conservacionColor}40`,
                        backgroundColor: `${conservacionColor}12`,
                      }}
                    >
                      {conservacionLabel}
                    </span>
                    <span
                      className="font-mono text-xl font-black"
                      style={{ color: hex }}
                    >
                      {conservacion}%
                    </span>
                  </div>
                </div>

                <div className="px-5 py-4">
                  <div
                    className={`relative h-2 rounded-full overflow-hidden ${isLight ? "bg-stone-100" : "bg-white/[0.06]"}`}
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: hex }}
                      initial={{ width: 0 }}
                      animate={{ width: `${conservacion}%` }}
                      transition={{
                        duration: 1.5,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.3,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span
                      className={`text-[12px] font-mono uppercase tracking-widest ${isLight ? "text-stone-400" : "text-stone-600"}`}
                    >
                      {dd.specimenIntegrity}
                    </span>
                    <span
                      className={`text-[12px] font-mono uppercase tracking-widest ${isLight ? "text-stone-400" : "text-stone-600"}`}
                    >
                      100%
                    </span>
                  </div>
                </div>

                {fossilFields.length > 0 && (
                  <div
                    className={`grid border-t
                    ${fossilFields.length === 3 ? "grid-cols-3" : fossilFields.length === 2 ? "grid-cols-2" : "grid-cols-1"}
                    ${isLight ? "border-stone-100 divide-x divide-stone-100" : "border-white/[0.06] divide-x divide-white/[0.06]"}`}
                  >
                    {fossilFields.map(({ label, value, icon }) => (
                      <div key={label} className="px-5 py-4">
                        <div className="flex items-center gap-1.5 mb-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500">
                          <span style={{ color: hex }}>{icon}</span> {label}
                        </div>
                        <span
                          className={`font-mono text-sm font-bold break-words
                          ${isLight ? "text-stone-800" : "text-stone-200"}`}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* ════ COLUMNA DERECHA ════ */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            {/* Imagen desktop */}
            <div
              className="hidden lg:block rounded-xl overflow-hidden border aspect-[4/3]"
              style={{ borderColor: `${hex}30` }}
            >
              <img
                src={dino.imagen}
                alt={dino.nombre}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Datos extra */}
            {extraFields.length > 0 && (
              <div
                className={`rounded-xl border overflow-hidden
                ${isLight ? "bg-white border-stone-100" : "bg-white/[0.04] border-white/[0.06]"}`}
              >
                {extraFields.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between px-4 py-3
                      ${
                        i < extraFields.length - 1
                          ? isLight
                            ? "border-b border-stone-100"
                            : "border-b border-white/[0.06]"
                          : ""
                      }`}
                  >
                    <span
                      className={`text-[12px] font-black uppercase tracking-[0.2em]
                      ${isLight ? "text-stone-400" : "text-stone-600"}`}
                    >
                      {label}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold
                      ${isLight ? "text-stone-800" : "text-stone-200"}`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Placeholder mapa */}
            <div
              className={`rounded-lg border-2 border-dashed flex flex-col items-center justify-center py-10 gap-3
              ${isLight ? "border-stone-200 bg-stone-50" : "border-white/[0.07] bg-white/[0.02]"}`}
            >
              <MapPin
                size={22}
                className={isLight ? "text-stone-300" : "text-stone-700"}
              />
              <div className="text-center">
                <p
                  className={`font-mono text-[14px] uppercase tracking-[0.25em] font-black
                  ${isLight ? "text-stone-400" : "text-stone-600"}`}
                >
                  {dd.discoveryMap}
                </p>
                <p
                  className={`font-mono text-[12px] uppercase tracking-widest mt-1
                  ${isLight ? "text-stone-300" : "text-stone-700"}`}
                >
                  {dd.comingSoon}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ════ RIVALIDAD BIOLÓGICA ════ */}
        {rivals.length > 0 && (
          <div
            className={`mt-8 pt-6 border-t ${isLight ? "border-stone-200" : "border-white/[0.07]"}`}
          >
            <p className="font-mono text-[14px] uppercase tracking-[0.3em] text-stone-500 mb-4 flex items-center gap-2">
              <Swords size={18} style={{ color: hex }} />
              {language === "en"
                ? "Biological Rivalry"
                : language === "fr"
                  ? "Rivalité Biologique"
                  : language === "it"
                    ? "Rivalità Biologica"
                    : "Rivalidad Biológica"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rivals.map((rival) => {
                const style = RIVAL_STYLE[rival.rol] || RIVAL_STYLE.competidor;
                const rt = getTheme(rival.dieta);
                const labelText = style.label[language] || style.label.es;
                const rivalText = getRivalText(dino, rival, language);

                return (
                  <Link
                    key={rival.id}
                    to={`/animal/${rival.nombre.toLowerCase()}`}
                    className={`group rounded-xl border overflow-hidden transition-all duration-300
                      hover:-translate-y-1 hover:shadow-lg
                      ${isLight ? "bg-white" : "bg-white/[0.03]"} ${style.border}`}
                  >
                    {/* Imagen */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={rival.imagen}
                        alt={rival.nombre}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                      {/* Badge de rol */}
                      <div
                        className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[9px]
                        font-black uppercase tracking-widest border backdrop-blur-md
                        ${style.border} ${style.bg} ${style.text}`}
                      >
                        {labelText}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h4
                        className={`text-base font-black italic uppercase leading-tight mb-1
                        group-hover:text-amber-500 transition-colors
                        ${isLight ? "text-stone-900" : "text-white"}`}
                      >
                        {rival.nombre}
                      </h4>
                      <p
                        className={`text-[11px] font-mono leading-relaxed mb-3
                        ${isLight ? "text-stone-500" : "text-stone-400"}`}
                      >
                        {rivalText}{" "}
                        <span className={`font-black ${style.text}`}>
                          {dino.nombre}
                        </span>
                        .
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide border"
                          style={{
                            color: rt.fill,
                            borderColor: `${rt.fill}35`,
                            backgroundColor: `${rt.fill}10`,
                          }}
                        >
                          {getDietLabel(rival.dieta, language)}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase tracking-widest
                          ${isLight ? "text-stone-400" : "text-stone-600"}`}
                        >
                          {rival.era}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ════ ESPECIES RELACIONADAS ════ */}
        {recommendations.length > 0 && (
          <div
            className={`mt-8 pt-6 border-t ${isLight ? "border-stone-200" : "border-white/[0.07]"}`}
          >
            <p className="font-mono text-[14px] uppercase tracking-[0.3em] text-stone-500 mb-4 flex items-center gap-2">
              <Dna size={21} style={{ color: hex }} /> {dd.relatedSpecies}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {recommendations.map((rec) => {
                const rt = getTheme(rec.dieta);
                return (
                  <Link
                    key={rec.id}
                    to={`/animal/${rec.nombre.toLowerCase()}`}
                    className={`group rounded-xl overflow-hidden border transition-all duration-300
                      hover:-translate-y-1
                      ${
                        isLight
                          ? "bg-white border-stone-100 hover:border-stone-300 hover:shadow-md"
                          : "bg-white/[0.03] border-white/[0.06] hover:border-white/20"
                      }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={rec.imagen}
                        alt={rec.nombre}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ backgroundColor: rt.fill }}
                      />
                    </div>
                    <div className="p-3.5">
                      <h4
                        className={`text-sm font-black italic uppercase leading-tight mb-1
                        ${isLight ? "text-stone-900" : "text-white"}`}
                      >
                        {rec.nombre}
                      </h4>
                      <p className="text-stone-500 text-[9px] uppercase tracking-[0.15em] mb-2 line-clamp-1">
                        {rec.subName}
                      </p>
                      <span
                        className="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide border"
                        style={{
                          color: rt.fill,
                          borderColor: `${rt.fill}35`,
                          backgroundColor: `${rt.fill}10`,
                        }}
                      >
                        {getDietLabel(rec.dieta, language)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DinoDetailPage;
