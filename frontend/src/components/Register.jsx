import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, CheckCircle2, ArrowLeft } from "lucide-react"; 
import BrachioSkull from "../assets/CBrachio.png"; 
import { useUser } from "../context/useUser";
import axios from "axios"; // Asegúrate de haber hecho npm install axios

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const navigate = useNavigate();
  const { theme } = useUser();
  const isLight = theme === "light";

const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("ERROR: Los códigos de encriptación no coinciden.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("auth", "true");
      localStorage.setItem("username", response.data.username.toUpperCase());
      localStorage.setItem("userId", response.data.userId); // <--- IMPORTANTE

      alert("ACCESO CONCEDIDO: Investigador registrado.");
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.msg || "Error en el registro.");
    }
  };

  const inputStyles = `w-full border-2 rounded-3xl py-5 pl-14 pr-5 text-lg focus:outline-none focus:border-amber-500/60 font-bold uppercase transition-all ${
    isLight ? "bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300" : "bg-black/40 border-[#3f3833] text-[#fef3c7] placeholder:text-stone-800"
  }`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 font-mono relative overflow-hidden transition-colors duration-500 ${isLight ? "bg-stone-100" : "bg-[#0a0908]"}`}>
      {!isLight && (
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
      )}

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-lg border-2 p-12 rounded-[3rem] relative z-20 flex flex-col items-center shadow-2xl transition-all duration-500 ${
          isLight ? "bg-white border-stone-200 shadow-stone-300" : "bg-[#1a1816] border-[#3f3833] shadow-black"
        }`}
      >
        <button onClick={() => navigate("/")} className={`absolute top-8 left-8 p-2 rounded-full transition-all group ${isLight ? "text-stone-400 hover:text-amber-600 hover:bg-stone-100" : "text-stone-600 hover:text-amber-500 hover:bg-amber-500/10"}`}>
          <ArrowLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <div className={`w-24 h-24 border-2 rounded-full flex items-center justify-center mb-8 overflow-hidden ${isLight ? "bg-stone-50 border-stone-100" : "bg-amber-500/5 border-amber-500/20"}`}>
          <img src={BrachioSkull} alt="ADN" className="w-[80%] h-[80%] object-contain" />
        </div>

        <h1 className={`text-3xl font-black italic tracking-tighter uppercase mb-10 ${isLight ? "text-stone-900" : "text-[#fef3c7]"}`}>
          REGISTRO DE <span className="text-amber-600">NUEVO USUARIO</span>
        </h1>

        <form onSubmit={handleRegister} className="space-y-6 w-full">
          <div className="space-y-2">
            <label className="text-[12px] tracking-widest ml-5 font-bold uppercase text-stone-500">Nombre de Usuario</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
              <input type="text" required onChange={(e) => setFormData({...formData, username: e.target.value})} className={inputStyles} placeholder="INVESTIGADOR_01" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] tracking-widest ml-5 font-bold uppercase text-stone-500">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
              <input type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} className={inputStyles} placeholder="CORREO@PALEOMAIL.COM" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] tracking-widest ml-5 font-bold uppercase text-stone-500">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
              <input type="password" required onChange={(e) => setFormData({...formData, password: e.target.value})} className={inputStyles} placeholder="••••••••••••" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] tracking-widest ml-5 font-bold uppercase text-stone-500">Confirmar Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
              <input type="password" required onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className={inputStyles} placeholder="REPETIR CONTRASEÑA" />
            </div>
          </div>

          <button type="submit" className="w-full bg-amber-600/10 hover:bg-amber-600/25 border-2 border-amber-600/60 text-amber-600 py-5 rounded-3xl font-black italic uppercase tracking-[0.2em] text-lg transition-all group flex items-center justify-center gap-3.5 shadow-lg shadow-amber-900/10">
            <CheckCircle2 size={22} className="group-hover:scale-110 transition-transform" />
            <span>REGISTRARSE</span>
          </button>
        </form>

        <div className={`mt-8 pt-6 border-t-2 w-full text-center ${isLight ? "border-stone-100" : "border-[#3f3833]/70"}`}>
          <p className="text-[14px] text-stone-500 uppercase tracking-widest font-light">
            ¿Ya tiene una cuenta? <Link to="/login" className="text-amber-600 font-bold hover:underline">INICIAR SESIÓN</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;