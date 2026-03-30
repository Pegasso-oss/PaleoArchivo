import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, matchPath } from "react-router-dom";
import { LogIn, User, LogOut, LockOpen, AlertTriangle } from "lucide-react";
import paleoLogo from "../assets/logo.png";
import { allAnimals } from "../data/allData";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  
  // Estado para controlar la visibilidad del modal de confirmación
  const [showConfirm, setShowConfirm] = useState(false);

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

  // Ejecuta el cierre de sesión real tras confirmar en el modal
  const handleLogoutConfirm = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setShowConfirm(false);
    
    // Navegamos a la Landing enviando el estado para mostrar el aviso de éxito
    navigate("/", { state: { logoutSuccess: true } });
  };

  const getSubtitle = () => {
    const match = matchPath({ path: "/animal/:id" }, location.pathname);
    
    if (match) {
      const animalId = match.params.id;
      const animal = allAnimals.find(a => a.nombre.toLowerCase() === animalId.toLowerCase());
      return animal ? animal.nombre : animalId;
    }

    switch (location.pathname) {
      case "/era/paleozoico": return "Paleozoico";
      case "/era/paleozoico/cambrico": return "Cámbrico";
      case "/era/mesozoico": return "Mesozoico";
      case "/era/mesozoico/jurasico": return "Jurásico";
      case "/era/cenozoico": return "Cenozoico";
      case "/era/cenozoico/paleogeno": return "Paleogeno";
      case "/era/cenozoico/paleogeno/paleoceno": return "Paleoceno";
      case "/login": return "Inicio de Sesion";
      case "/register": return "Inicio de Sesion";
      default: return "Todo sobre el pasado, en tu mano";
    }
  };

  return (
    <>
      <header className="border-b border-white/5 bg-[#0d0a09] sticky top-0 z-50 shadow-2xl w-full h-fit">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-wrap items-center justify-between gap-y-6">
          
          {/* LOGO E IDENTIDAD */}
          <Link
            to="/"
            className="group flex items-center gap-4 md:gap-6 shrink-0 transition-all duration-300"
          >
            <img
              src={paleoLogo}
              alt="Logo"
              className="h-12 md:h-20 w-auto shrink-0 transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase leading-none text-white italic whitespace-nowrap">
                Paleo<span className="text-amber-600">Archivo</span>
              </h1>
              <div className="flex items-center gap-2 mt-1 md:mt-2">
                <div className="h-0.5 w-4 md:w-8 bg-amber-500/40 shrink-0"></div>
                <span className="text-white text-[10px] md:text-sm font-light tracking-[0.2em] uppercase italic whitespace-nowrap">
                  {getSubtitle()}
                </span>
                <div className="h-0.5 w-4 md:w-8 bg-amber-500/40 shrink-0"></div>
              </div>
            </div>
          </Link>

          {/* ACCIONES DERECHA */}
          <div className="flex items-center gap-4 md:gap-8 ml-auto sm:ml-0">
            {!isLoggedIn ? (
              <div className="flex items-center gap-4 md:gap-8">
                <Link
                  to="/login"
                  className="text-stone-400 hover:text-white flex items-center gap-3 text-xs md:text-base font-black tracking-[0.15em] transition-all whitespace-nowrap"
                >
                  <LogIn size={20} className="md:w-5 md:h-5" />
                  <span className="hidden sm:inline">INICIAR SESIÓN</span>
                </Link>

                <Link
                  to="/register"
                  className="bg-amber-600/10 border-2 border-amber-600/60 px-4 py-2 md:px-10 md:py-4 rounded-xl md:rounded-2xl text-amber-500 hover:bg-amber-600 hover:text-black transition-all flex items-center gap-3 text-xs md:text-lg font-black tracking-[0.2em] shadow-lg whitespace-nowrap"
                >
                  <LockOpen size={22} className="md:w-5 md:h-5" />
                  <span className="hidden sm:inline">REGISTRARSE</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 md:gap-10">
                <div className="flex items-center gap-3 md:gap-5 bg-black/80 border-2 border-amber-500/40 px-4 py-2.5 md:px-7 md:py-4 rounded-xl md:rounded-3xl shadow-inner">
                  <User size={20} className="text-amber-500 md:w-8 md:h-8" />
                  <span className="text-[#fef3c7] font-black italic text-xs md:text-xl uppercase leading-none whitespace-nowrap">
                    {username}
                  </span>
                </div>

                <button
                  onClick={() => setShowConfirm(true)}
                  className="flex flex-col items-center gap-1 text-stone-500 hover:text-red-500 transition-all group shrink-0"
                >
                  <LogOut
                    size={28}
                    className="md:w-10 md:h-10 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-[12px] md:text-xs font-black tracking-tighter uppercase">
                    CERRAR SESIÓN
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MODAL DE CONFIRMACIÓN */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowConfirm(false)}
          ></div>

          <div className="relative bg-[#1a1614] border border-white/10 w-full max-w-md overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-red-600/10 border-b border-red-600/20 p-4 flex items-center gap-3">
              <AlertTriangle className="text-red-500" size={18} />
              <span className="text-red-500 font-mono text-[14px] tracking-[0.3em] font-bold uppercase">
                Cierre de Sesion
              </span>
            </div>

            <div className="p-8 text-center">
              <h3 className="text-white text-2xl font-black italic uppercase tracking-tighter mb-4">
                ¿ Seguro que quieres <span className="text-red-600">salir</span> ?
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-8 font-light">
                Estás a punto de finalizar tu sesión de investigación. Perderás el acceso inmediato a esta cuenta así como sus configuraciones
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleLogoutConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest text-xs shadow-lg shadow-red-900/20"
                >
                  Confirmar Cierre
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-stone-800 hover:bg-stone-700 text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest text-xs"
                >
                  Mantener Sesión
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