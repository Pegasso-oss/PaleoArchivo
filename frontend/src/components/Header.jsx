import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, matchPath } from "react-router-dom";
import {
  LogIn,
  User,
  LogOut,
  LockOpen,
  AlertTriangle,
  Sun,
  Moon,
  Languages,
  ChevronDown,
  Star,
} from "lucide-react";
import paleoLogo from "../assets/logo.png";
import { allAnimals } from "../data/allData";
import { useUser } from "../context/useUser";
import { translations } from "../data/translations";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, language, setLanguage } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLangOpen, setIsLangOpen] = useState(false);
  const menuRef = useRef(null);
  const langRef = useRef(null);

  const t = translations[language].header;
  const isLight = theme === "light";

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const savedName = localStorage.getItem("username");
    if (auth === "true") {
      setIsLoggedIn(true);
      setUsername(savedName || "INVESTIGADOR");
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setShowConfirm(false);
    setIsMenuOpen(false);
    navigate("/", { state: { logoutSuccess: true } });
  };

  const getSubtitle = () => {
    if (location.pathname.includes("/favorites")) return t.favorites;

    const match = matchPath({ path: "/animal/:id" }, location.pathname);
    if (match) {
      const animalId = match.params.id;
      const animal = allAnimals.find(
        (a) => a.nombre.toLowerCase() === animalId.toLowerCase(),
      );
      return animal ? animal.nombre : animalId;
    }

    switch (location.pathname) {
      // --- PALEOZOICO ---
      case "/era/paleozoico":
        return "Paleozoico";
      case "/era/paleozoico/cambrico":
        return "Cámbrico";
      case "/era/paleozoico/ordovicico":
        return "Ordovícico";
      case "/era/paleozoico/silurico":
        return "Silúrico";
      case "/era/paleozoico/devonico":
        return "Devónico";
      case "/era/paleozoico/carbonifero":
        return "Carbonífero";
      case "/era/paleozoico/permico":
        return "Pérmico";

      // --- MESOZOICO ---
      case "/era/mesozoico":
        return "Mesozoico";
      case "/era/mesozoico/triasico":
        return "Triásico";
      case "/era/mesozoico/jurasico":
        return "Jurásico";
      case "/era/mesozoico/cretacico":
        return "Cretácico";

      // --- CENOZOICO ---
      case "/era/cenozoico":
        return "Cenozoico";
      case "/era/cenozoico/paleogeno":
        return "Paleogeno";
      case "/era/cenozoico/neogeno":
        return "Neogeno";
      case "/era/cenozoico/cuaternario":
        return "Cuaternario";

      // ------- SUBPERIODOS -------
      case "/era/cenozoico/paleogeno/paleoceno":
        return "Paleoceno";
      case "/era/cenozoico/paleogeno/eoceno":
        return "Eoceno";
      case "/era/cenozoico/paleogeno/oligoceno":
        return "Oligoceno";
      case "/era/cenozoico/neogeno/mioceno":
        return "Mioceno";
      case "/era/cenozoico/neogeno/plioceno":
        return "Plioceno";
      case "/era/cenozoico/cuaternario/pleistoceno":
        return "Pleistoceno";
      case "/era/cenozoico/cuaternario/holoceno":
        return "Holoceno";

      // --- OTROS ---
      case "/login":
        return t.login;
      case "/register":
        return t.register;
      default:
        return t.subtitleDefault;
    }
  };

  return (
    <>
      <header className="bg-[var(--bg-card)] border-b border-[var(--border-color)] transition-colors duration-500 sticky top-0 z-[100] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-2">
          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-center gap-3 md:gap-6 shrink-0 transition-all duration-300"
          >
            <img
              src={paleoLogo}
              alt="Logo"
              className="h-10 md:h-20 w-auto shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
            />
            <div className="hidden md:flex flex-col">
              <h1
                className={`md:text-3xl font-black tracking-tighter uppercase leading-none italic transition-colors duration-500 ${isLight ? "text-stone-900" : "text-white"}`}
              >
                Paleo<span className="text-amber-600">Archivo</span>
              </h1>
              <div className="flex items-center gap-2 mt-1 md:mt-2">
                <div className="h-0.5 w-4 md:w-8 bg-amber-500/40"></div>
                <span
                  className={`text-[10px] md:text-sm font-light tracking-[0.2em] uppercase italic transition-colors duration-500 ${isLight ? "text-stone-600" : "text-white"}`}
                >
                  {getSubtitle()}
                </span>
                <div className="h-0.5 w-4 md:w-8 bg-amber-500/40"></div>
              </div>
            </div>
          </Link>

          {/* ACCIONES */}
          <div className="flex items-center gap-1.5 md:gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className={`border-2 px-2.5 py-2 md:px-8 md:py-4 rounded-xl transition-all flex items-center gap-1.5 md:gap-2 font-black tracking-widest ${isLight ? "bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-900 hover:text-white" : "bg-white/5 border-white/10 text-stone-300 hover:bg-white hover:text-black"}`}
                >
                  <LogIn size={14} />
                  <span className="text-[9px] md:text-base uppercase">
                    {t.login}
                  </span>
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-600/10 border-2 border-amber-600/60 px-2.5 py-2 md:px-8 md:py-4 rounded-xl text-amber-500 hover:bg-amber-600 hover:text-white transition-all flex items-center gap-1.5 md:gap-2 font-black tracking-widest shadow-lg"
                >
                  <LockOpen size={14} />
                  <span className="text-[9px] md:text-base uppercase">
                    {t.register}
                  </span>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3 md:gap-6">
                {/* MENÚ DE USUARIO DESPLEGABLE */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`flex items-center gap-2 border-2 px-3 py-2 md:px-7 md:py-4 rounded-xl md:rounded-3xl shadow-inner transition-all group ${isLight ? "bg-white border-amber-500/20 hover:border-amber-500" : "bg-black/80 border-amber-500/40 hover:border-amber-500"}`}
                  >
                    <User size={18} className="text-amber-500 md:w-8 md:h-8" />
                    <span
                      className={`font-black italic text-[10px] md:text-xl uppercase leading-none ${isLight ? "text-stone-900" : "text-[#fef3c7]"}`}
                    >
                      {username}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-amber-500/50 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isMenuOpen && (
                    <div
                      className={`absolute top-full right-0 mt-3 w-64 border rounded-2xl shadow-2xl z-[10000] animate-in fade-in slide-in-from-top-2 flex flex-col ${isLight ? "bg-white border-stone-200 text-stone-900" : "bg-[#1a1614] border-white/10 text-white"}`}
                    >
                      <div className="p-4 border-b border-white/5 bg-amber-600/5">
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">
                          {t.config}
                        </p>
                      </div>

                      <div className="p-2 space-y-1">
                        {/* NUEVA OPCIÓN: FAVORITOS */}
                        <Link
                          to={`/${username.toLowerCase()}/favorites`}
                          onClick={() => setIsMenuOpen(false)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${isLight ? "hover:bg-amber-500/10 text-stone-700" : "hover:bg-white/5 text-stone-300"}`}
                        >
                          <Star
                            size={16}
                            className={`${
                              theme === "dark"
                                ? "text-blue-400"
                                : "text-amber-500"
                            } ${
                              location.pathname.includes("/favorites")
                                ? "fill-current"
                                : ""
                            }`}
                          />
                          <span className="text-[10px] font-bold uppercase tracking-widest">
                            {t.favorites}
                          </span>
                        </Link>

                        <div className="h-[1px] bg-white/5 my-1" />

                        {/* MODO OSCURO */}
                        <button
                          onClick={toggleTheme}
                          className="w-full flex items-center justify-between p-3 hover:bg-black/10 rounded-xl transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {theme === "dark" ? (
                              <Moon size={16} className="text-blue-400" />
                            ) : (
                              <Sun size={16} className="text-amber-500" />
                            )}
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                              {t.mode} {theme === "dark" ? t.dark : t.light}
                            </span>
                          </div>
                          <div
                            className={`w-8 h-4 rounded-full relative transition-colors ${theme === "dark" ? "bg-stone-700" : "bg-amber-600"}`}
                          >
                            <div
                              className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${theme === "dark" ? "left-1" : "left-5"}`}
                            />
                          </div>
                        </button>

                        <div className="h-[1px] bg-white/5 my-1" />

                        {/* SELECTOR IDIOMA */}
                        <div className="p-2 relative" ref={langRef}>
                          <p className="flex items-center gap-2 text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3 px-1">
                            <Languages
                              size={18}
                              className={
                                theme === "dark"
                                  ? "text-blue-400"
                                  : "text-amber-500"
                              }
                            />{" "}
                            {t.lang}
                          </p>

                          <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                              language === "es"
                                ? "border-red-500"
                                : language === "en"
                                  ? isLight
                                    ? "border-stone-300"
                                    : "border-white"
                                  : language === "fr"
                                    ? "border-sky-700"
                                    : "border-emerald-600"
                            } ${isLight ? "bg-stone-50" : "bg-white/5"}`}
                          >
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider ${
                                language === "es"
                                  ? "text-red-500"
                                  : language === "en"
                                    ? "${theme === ´dark´ ? ´text-black´ : text-white´}"
                                    : language === "fr"
                                      ? "text-sky-700"
                                      : "text-emerald-600"
                              }`}
                            >
                              {language === "es" && "ESPAÑOL"}
                              {language === "en" && "ENGLISH"}
                              {language === "fr" && "FRANÇAIS"}
                              {language === "it" && "ITALIANO"}
                            </span>

                            <ChevronDown
                              size={14}
                              className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                            />
                          </button>

                          {isLangOpen && (
                            <div
                              className={`absolute top-full left-2 right-2 mt-1 border rounded-xl shadow-2xl z-[10001] overflow-hidden animate-in fade-in slide-in-from-top-1 ${
                                isLight
                                  ? "bg-white border-stone-200"
                                  : "bg-[#25201d] border-white/10"
                              }`}
                            >
                              <button
                                onClick={() => {
                                  setLanguage("es");
                                  setIsLangOpen(false);
                                }}
                                className={`w-full text-left p-4 text-[11px] font-black uppercase transition-all ${
                                  language === "es"
                                    ? "bg-red-500 text-white"
                                    : "hover:bg-red-500/10 text-stone-400 hover:text-red-500"
                                }`}
                              >
                                ESPAÑOL
                              </button>

                              <button
                                onClick={() => {
                                  setLanguage("en");
                                  setIsLangOpen(false);
                                }}
                                className={`w-full text-left p-4 text-[11px] font-black uppercase transition-all ${
                                  language === "en"
                                    ? "bg-white text-black"
                                    : "hover:bg-neutral-300/90 text-stone-400 hover:text-stone-800"
                                }`}
                              >
                                ENGLISH
                              </button>

                              <button
                                onClick={() => {
                                  setLanguage("fr");
                                  setIsLangOpen(false);
                                }}
                                className={`w-full text-left p-4 text-[11px] font-black uppercase transition-all ${
                                  language === "fr"
                                    ? "bg-sky-700 text-white"
                                    : "hover:bg-sky-700/10 text-stone-400 hover:text-sky-700"
                                }`}
                              >
                                FRANÇAIS
                              </button>

                              <button
                                onClick={() => {
                                  setLanguage("it");
                                  setIsLangOpen(false);
                                }}
                                className={`w-full text-left p-4 text-[11px] font-black uppercase transition-all ${
                                  language === "it"
                                    ? "bg-emerald-600 text-white"
                                    : "hover:bg-emerald-600/10 text-stone-400 hover:text-emerald-600"
                                }`}
                              >
                                ITALIANO
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* BOTÓN LOGOUT */}
                <button
                  onClick={() => setShowConfirm(true)}
                  className="flex flex-col items-center gap-1 text-stone-500 hover:text-red-500 transition-all group shrink-0"
                >
                  <LogOut
                    size={24}
                    className="md:w-10 md:h-10 group-hover:scale-110"
                  />
                  <span className="hidden md:block text-[12px] md:text-xs font-black tracking-widest uppercase">
                    {t.logout}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MODAL LOGOUT */}
      {showConfirm && (
        <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          ></div>
          <div
            className={`relative border w-full max-w-md overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in-95 ${isLight ? "bg-white border-stone-200" : "bg-[#1a1614] border-white/10"}`}
          >
            <div className="bg-red-600/10 border-b border-red-600/20 p-4 flex items-center gap-3">
              <AlertTriangle className="text-red-500" size={18} />
              <span className="text-red-500 font-mono text-[14px] tracking-[0.3em] font-bold uppercase text-xs">
                {t.logout}
              </span>
            </div>
            <div className="p-8 text-center">
              <h3
                className={`text-xl font-black italic uppercase tracking-tighter mb-4 ${isLight ? "text-stone-900" : "text-white"}`}
              >
                {t.confirmLogout} <span className="text-red-600">{t.exit}</span>
                ?
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleLogoutConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest text-xs"
                >
                  {t.confirm}
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className={`flex-1 font-black py-4 rounded-xl transition-all uppercase tracking-widest text-xs ${isLight ? "bg-stone-100 text-stone-600" : "bg-stone-800 text-white"}`}
                >
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