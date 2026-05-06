import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Languages, User, ChevronDown } from "lucide-react";
import { useUser } from "../context/useUser";

const SettingsMenu = () => {
  const { theme, toggleTheme, language, setLanguage } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* DESPLEGABLE */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-60 bg-[#1a1614] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[200] animate-page backdrop-blur-xl">
          <div className="p-4 border-b border-white/5 bg-amber-600/5">
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">Ajustes de Perfil</p>
          </div>

          <div className="p-2">
            {/* TOGGLE TEMA */}
            <button 
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Sun size={16} className="text-amber-500" /> : <Moon size={16} className="text-blue-400" />}
                <span className="text-xs font-bold uppercase tracking-widest text-stone-300">
                  Interfaz: {theme === 'dark' ? 'Clara' : 'Oscura'}
                </span>
              </div>
            </button>

            <div className="h-[1px] bg-white/5 my-1" />

            {/* SELECCIÓN IDIOMA */}
            <div className="p-2">
              <p className="flex items-center gap-2 text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2 px-1">
                <Languages size={14} /> Idioma
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['es', 'en'].map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`py-2 rounded-lg text-[10px] font-black transition-all ${language === lang ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'bg-white/5 text-stone-500 hover:text-white'}`}
                  >
                    {lang === 'es' ? 'ESPAÑOL' : 'ENGLISH'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;