import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User, LogIn } from "lucide-react";
import BrachioSkull from "../assets/CBrachio.png"; 

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: ""
  });
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Guardamos la sesión
    localStorage.setItem("auth", "true");
    
    // Si es un email, extraemos la parte anterior al @. Si es un user, lo pasamos tal cual.
    const displayName = formData.identifier.includes("@") 
      ? formData.identifier.split("@")[0] 
      : formData.identifier;
      
    localStorage.setItem("username", displayName.toUpperCase());
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0a0908] flex items-center justify-center p-6 font-mono relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#1a1816] border-2 border-[#3f3833] p-12 rounded-[3rem] relative z-20 flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-amber-500/5 border-2 border-amber-500/20 rounded-full flex items-center justify-center mb-8 overflow-hidden">
          <img src={BrachioSkull} alt="ADN" className="w-[80%] h-[80%] object-contain opacity-80 brightness-110 sepia-[0.5]" />
        </div>

        <div className="text-center mb-10 flex flex-col items-center gap-2.5">
          <h1 className="text-3xl font-black text-[#fef3c7] italic tracking-tighter uppercase leading-none">Protocolo de Acceso</h1>
          <p className="text-[#935f07] text-[10px] tracking-[0.35em] uppercase font-light">Base de Datos Paleontológica</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 w-full">
          <div className="space-y-2">
            <label className="text-[12px] text-stone-500 uppercase tracking-widest ml-5 font-bold">Nombre de Usuario</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-600" size={20} />
              <input 
                type="text" 
                required 
                onChange={(e) => setFormData({...formData, identifier: e.target.value})} 
                className="w-full bg-black/40 border-2 border-[#3f3833] rounded-3xl py-5 pl-14 pr-5 text-[#fef3c7] text-lg focus:outline-none focus:border-amber-500/60 font-bold uppercase" 
                placeholder="Nombre de Usuario" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] text-stone-500 uppercase tracking-widest ml-5 font-bold">Clave de Encriptación</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-600" size={20} />
              <input 
                type="password" 
                required 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                className="w-full bg-black/40 border-2 border-[#3f3833] rounded-3xl py-5 pl-14 pr-5 text-[#fef3c7] text-lg focus:outline-none focus:border-amber-500/60 font-bold" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-amber-600/10 hover:bg-amber-600/25 border-2 border-amber-600/60 text-amber-500 py-5 rounded-3xl font-black italic uppercase tracking-[0.2em] text-lg transition-all mt-4 group flex items-center justify-center gap-3.5">
            <LogIn size={22} className="group-hover:scale-110 transition-transform" />
            <span>INICIAR SESIÓN</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-[#3f3833]/70 w-full text-center">
          <p className="text-[14px] text-stone-600 uppercase tracking-widest font-light">
            ¿No tiene identificador? <Link to="/register" className="text-amber-500/60 font-bold">REGISTRARSE</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;