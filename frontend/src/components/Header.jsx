import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, User, LogOut } from "lucide-react";
import paleoLogo from "../assets/logo.png"; 

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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

  // FUNCIÓN PARA CERRAR SESIÓN
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/"); // Te manda a la home al salir
  };

  const getSubtitle = () => {
    switch (location.pathname) {
      case "/era/paleozoico": return "Paleozoico";
      case "/era/mesozoico": return "Mesozoico";
      case "/era/cenozoico": return "Cenozoico";
      default: return "Todo sobre el pasado, en tu mano";
    }
  };

  return (
    <header className="border-b border-slate-800 bg-[#1a1614] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO IZQUIERDA */}
        <Link to="/" className="flex items-center gap-4 group">
          <img src={paleoLogo} alt="Logo" className="h-10 md:h-12 w-auto shrink-0 transition-all group-hover:scale-105" />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none text-white italic">
              Paleo <span className="text-amber-600">Archivo</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-px w-3 bg-amber-500/40"></div>
              <span className="text-white text-[8px] font-light tracking-[0.2em] uppercase opacity-70">
                {getSubtitle()}
              </span>
            </div>
          </div>
        </Link>

        {/* ACCIONES DERECHA */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-stone-400 hover:text-white flex items-center gap-2 text-[10px] font-bold tracking-widest">
                <LogIn size={16} /> <span>ACCEDER</span>
              </Link>
              <Link to="/register" className="bg-amber-600/10 border border-amber-600/30 px-3 py-1.5 rounded-lg text-amber-500 hover:bg-amber-600 hover:text-black transition-all text-[10px] font-bold tracking-widest">
                REGISTRO
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Etiqueta de Usuario */}
              <div className="flex items-center gap-2 bg-amber-600/5 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                <User size={28} className="text-amber-500" />
                <span className="text-[#fef3c7] font-bold text-[10px] md:text-xs uppercase">
                  {username}
                </span>
              </div>

              {/* BOTÓN DE CERRAR SESIÓN */}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-stone-500 hover:text-red-500 transition-colors group"
                title="Cerrar Sesión"
              >
                <LogOut size={28} className="group-hover:translate-x-0.5 transition-transform" />
                <span className="hidden md:inline text-[14px] font-bold tracking-widest uppercase">Salir</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;