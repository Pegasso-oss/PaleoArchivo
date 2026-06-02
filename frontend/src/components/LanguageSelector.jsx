// src/components/LanguageSelector.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useUser } from "../context/useUser";
import i18n from "../i18n"; // ajusta la ruta si tu instancia de i18next está en otro sitio

const LANGUAGES = [
  { code: "es", label: "Español",  flag: "🇪🇸" },
  { code: "en", label: "English",  flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

/**
 * LanguageSelector
 *
 * Props:
 *   compact  — si es true muestra solo bandera + chevron (para el drawer móvil)
 *   onSelect — callback opcional tras seleccionar idioma
 */
const LanguageSelector = ({ compact = false, onSelect }) => {
  const { theme, language, setLanguage } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isLight = theme === "light";
  const iconColor = isLight ? "text-blue-500" : "text-amber-500";

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  // Cierra al hacer click fuera
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);           // actualiza contexto
    i18n.changeLanguage(code);   // actualiza i18next
    setOpen(false);
    onSelect?.();
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger — mismo estilo que los demás botones del header */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Seleccionar idioma"
        aria-expanded={open}
        className={`flex items-center gap-1.5 border-2 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-lg transition-all
          ${isLight
            ? "bg-white border-stone-200 hover:border-stone-400"
            : "bg-black/40 border-white/10 hover:border-white/25"}`}
      >
        <span className="text-base leading-none">{current.flag}</span>
        {!compact && (
          <span className={`hidden md:inline font-mono text-[10px] uppercase tracking-widest font-bold ${iconColor}`}>
            {current.code}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`${iconColor} opacity-50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={`absolute top-full right-0 mt-2 w-44 border rounded-xl z-[1001] overflow-hidden shadow-xl
            ${isLight
              ? "bg-white border-stone-200 text-stone-900"
              : "bg-[#1a1614] border-white/10 text-white"}`}
        >
          <div className="px-3 py-2 border-b border-white/5 bg-amber-600/5">
            <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.25em]">
              Idioma / Language
            </p>
          </div>
          <div className="p-1.5 flex flex-col gap-0.5">
            {LANGUAGES.map(({ code, label, flag }) => (
              <button
                key={code}
                onClick={() => handleSelect(code)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors text-left
                  ${code === language
                    ? isLight
                      ? "bg-amber-50 text-amber-700"
                      : "bg-amber-600/15 text-amber-400"
                    : isLight
                      ? "hover:bg-stone-50 text-stone-700"
                      : "hover:bg-white/5 text-stone-300"}`}
              >
                <span className="text-base">{flag}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                  {label}
                </span>
                {code === language && (
                  <span className="ml-auto text-amber-500 text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;