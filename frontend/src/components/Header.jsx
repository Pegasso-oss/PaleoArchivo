// src/components/Header.jsx — OPCIÓN C: avatar grande + nombre y subtítulo al lado
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, matchPath } from "react-router-dom";
import {
  LogIn, User, LogOut, LockOpen, AlertTriangle,
  Sun, Moon, ChevronDown, Star,
} from "lucide-react";
import paleoLogo from "../assets/logo.png";
import { allAnimals } from "../data/allData";
import { useUser } from "../context/useUser";
import { useFavorites } from "../context/FavoritesContext";
import { translations } from "../data/translations";

const ROUTE_SUBTITLES = {
  "/era/paleozoico": "Paleozoico",
  "/era/paleozoico/cambrico": "Cámbrico",
  "/era/paleozoico/ordovicico": "Ordovícico",
  "/era/paleozoico/silurico": "Silúrico",
  "/era/paleozoico/devonico": "Devónico",
  "/era/paleozoico/carbonifero": "Carbonífero",
  "/era/paleozoico/permico": "Pérmico",
  "/era/mesozoico": "Mesozoico",
  "/era/mesozoico/triasico": "Triásico",
  "/era/mesozoico/jurasico": "Jurásico",
  "/era/mesozoico/cretacico": "Cretácico",
  "/era/cenozoico": "Cenozoico",
  "/era/cenozoico/paleogeno": "Paleogeno",
  "/era/cenozoico/paleogeno/paleoceno": "Paleoceno",
  "/era/cenozoico/paleogeno/eoceno": "Eoceno",
  "/era/cenozoico/paleogeno/oligoceno": "Oligoceno",
  "/era/cenozoico/neogeno": "Neogeno",
  "/era/cenozoico/neogeno/mioceno": "Mioceno",
  "/era/cenozoico/neogeno/plioceno": "Plioceno",
  "/era/cenozoico/cuaternario": "Cuaternario",
  "/era/cenozoico/cuaternario/pleistoceno": "Pleistoceno",
  "/era/cenozoico/cuaternario/holoceno": "Holoceno",
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, language } = useUser();
  const { clearFavorites } = useFavorites();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const t = translations[language].header;
  const isLight = theme === "light";
  const iconColor = isLight ? "text-blue-500" : "text-amber-500";

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const savedName = localStorage.getItem("username");
    const savedAvatar = localStorage.getItem("avatar");
    if (auth === "true") {
      setIsLoggedIn(true);
      setUsername(savedName || "INVESTIGADOR");
      setAvatar(savedAvatar || "");
    } else {
      setIsLoggedIn(false);
      setAvatar("");
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("avatar");
    clearFavorites();
    setIsLoggedIn(false);
    setShowConfirm(false);
    setIsMenuOpen(false);
    navigate("/", { state: { logoutSuccess: true } });
  };

  const getSubtitle = () => {
    if (location.pathname.includes("/favorites")) return t.favorites;
    if (location.pathname === "/login") return t.login;
    if (location.pathname === "/register") return t.register;
    if (location.pathname === "/perfil") return t.profile;
    const animalMatch = matchPath({ path: "/animal/:id" }, location.pathname);
    if (animalMatch) {
      const animal = allAnimals.find(
        (a) => a.nombre.toLowerCase() === animalMatch.params.id.toLowerCase()
      );
      return animal ? animal.nombre : animalMatch.params.id;
    }
    return ROUTE_SUBTITLES[location.pathname] || t.subtitleDefault;
  };

  return (
    <>
      <header className="bg-[#1a1614] border-b border-[#d97706] sticky top-0 z-[50]">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-2">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-6 shrink-0">
            <img src={paleoLogo} alt="Logo"
              className="h-10 md:h-20 w-auto transition-transform group-hover:scale-110" />
            <div className="hidden md:flex flex-col">
              <h1 className={`text-3xl font-black tracking-tighter uppercase italic ${isLight ? "text-stone-900" : "text-white"}`}>
                Paleo<span className="text-amber-600">Archivo</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-0.5 w-8 bg-amber-500/40" />
                <span className={`text-sm font-light tracking-[0.2em] uppercase italic ${isLight ? "text-stone-600" : "text-white"}`}>
                  {getSubtitle()}
                </span>
                <div className="h-0.5 w-8 bg-amber-500/40" />
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">

            {/* Botón tema */}
            <button onClick={toggleTheme}
              className={`flex items-center justify-center border-2 px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-lg transition-all
                ${isLight ? "bg-white border-stone-200 hover:border-stone-400" : "bg-black/40 border-white/10 hover:border-white/25"}`}>
              {isLight
                ? <Moon size={18} className={`${iconColor} md:w-6 md:h-6`} />
                : <Sun size={18} className={`${iconColor} md:w-6 md:h-6`} />}
            </button>

            {isLoggedIn ? (
              <div className="relative" ref={menuRef}>

                {/* ── OPCIÓN C: avatar grande + columna nombre/subtítulo ── */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-3 group"
                >
                  {/* Avatar con badge */}
                  <div className="relative shrink-0">
                    {avatar ? (
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-[2.5px] border-amber-500 transition-all group-hover:border-amber-400">
                        <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-[2.5px] border-amber-500 flex items-center justify-center transition-all group-hover:border-amber-400 ${isLight ? "bg-stone-100" : "bg-[#2a2520]"}`}>
                        <User size={22} className={iconColor} />
                      </div>
                    )}
                    {/* Badge ámbar */}
                    <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-[#1a1614]" />
                  </div>

                  {/* Columna nombre + subtítulo — solo en desktop */}
                  <div className="hidden md:flex flex-col items-start gap-0.5">
                    <span className={`font-black italic text-sm uppercase leading-none tracking-wide ${isLight ? "text-stone-900" : "text-[#fef3c7]"}`}>
                      {username}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-500/70">
                      Investigador
                    </span>
                  </div>

                  {/* Chevron */}
                  <ChevronDown size={13} className={`${iconColor} opacity-50 transition-transform hidden md:block ${isMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Menú desplegable */}
                {isMenuOpen && (
                  <div className={`absolute top-full right-0 mt-3 w-60 border rounded-xl shadow-2xl z-[1000] overflow-hidden
                    ${isLight ? "bg-white border-stone-200 text-stone-900" : "bg-[#1a1614] border-white/10 text-white"}`}>
                    <div className="px-4 py-3 border-b border-white/5 bg-amber-600/5">
                      <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.25em]">{username}</p>
                    </div>
                    <div className="p-1.5 flex flex-col gap-0.5">
                      <Link to="/favorites" onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                          ${isLight ? "hover:bg-blue-500/10 text-stone-700" : "hover:bg-white/5 text-stone-300"}`}>
                        <Star size={15} className={iconColor} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t.favorites}</span>
                      </Link>
                      <Link to="/perfil" onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                          ${isLight ? "hover:bg-blue-500/10 text-stone-700" : "hover:bg-white/5 text-stone-300"}`}>
                        <User size={15} className={iconColor} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Mi perfil</span>
                      </Link>
                      <div className={`h-px mx-2 my-1 ${isLight ? "bg-stone-100" : "bg-white/5"}`} />
                      <button onClick={() => { setIsMenuOpen(false); setShowConfirm(true); }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-red-500/70 hover:text-red-500 hover:bg-red-500/5 w-full">
                        <LogOut size={15} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t.logout}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            ) : (
              <div className="flex items-center gap-1.5 md:gap-4">
                <Link to="/login"
                  className={`border-2 px-2.5 py-2 md:px-8 md:py-4 rounded-lg transition-all flex items-center gap-2 font-black tracking-widest
                    ${isLight ? "bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-900 hover:text-white" : "bg-white/5 border-white/10 text-stone-300 hover:bg-white hover:text-black"}`}>
                  <LogIn size={14} />
                  <span className="text-[9px] md:text-base uppercase">{t.login}</span>
                </Link>
                <Link to="/register"
                  className="bg-amber-600/10 border-2 border-amber-600/60 px-2.5 py-2 md:px-8 md:py-4 rounded-lg text-amber-500 hover:bg-amber-600 hover:text-white transition-all flex items-center gap-2 font-black shadow-lg">
                  <LockOpen size={14} />
                  <span className="text-[9px] md:text-base uppercase">{t.register}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal confirmar logout */}
      {showConfirm && (
        <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className={`relative border w-full max-w-md overflow-hidden rounded-2xl shadow-2xl
            ${isLight ? "bg-white border-stone-200" : "bg-[#1a1614] border-white/10"}`}>
            <div className="bg-red-600/10 border-b border-red-600/20 p-4 flex items-center gap-3">
              <AlertTriangle className="text-red-500" size={18} />
              <span className="text-red-500 font-mono text-[14px] tracking-[0.3em] font-bold uppercase">{t.logout}</span>
            </div>
            <div className="p-8 text-center">
              <h3 className={`text-xl font-black italic uppercase tracking-tighter mb-4 ${isLight ? "text-stone-900" : "text-white"}`}>
                {t.confirmLogout} <span className="text-red-600">{t.exit}</span>?
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={handleLogoutConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs">
                  {t.confirm || "SÍ, SALIR"}
                </button>
                <button onClick={() => setShowConfirm(false)}
                  className={`flex-1 font-black py-4 rounded-xl uppercase tracking-widest text-xs
                    ${isLight ? "bg-stone-100 text-stone-600" : "bg-stone-800 text-white"}`}>
                  {t.keep}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;