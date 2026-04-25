// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User, LogIn, Eye, EyeOff } from "lucide-react";
import BrachioSkull from "../assets/CBrachio.png";
import { useUser } from "../context/useUser";
import { useTranslation } from "../hooks/useTranslation";
import apiClient from "../api/apiClient";

const Login = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useUser();
  const { tSection } = useTranslation();
  const lg = tSection('login');
  const isLight = theme === "light";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      const response = await apiClient.post("/login", {
        identifier: formData.identifier,
        password: formData.password,
      });
      if (response.data.userId || response.data.user?._id) {
        const idFinal = response.data.userId || response.data.user._id;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("auth", "true");
        localStorage.setItem("username", response.data.username.toUpperCase());
        localStorage.setItem("userId", idFinal);
        window.location.href = "/";
      } else {
        alert("Error: El servidor no envió el ID de usuario.");
      }
    } catch (err) {
      console.error("Error en login:", err);
      alert(err.response?.data?.msg || "Error de conexión");
    }
  };

  const inputStyles = `w-full border rounded-xl py-4 pl-12 pr-12 text-lg focus:outline-none font-mono transition-all ${
    isLight
      ? "bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300 focus:border-amber-500"
      : "bg-[#0f0e0d] border-[#2a2520] text-[#f5e6c8] placeholder:text-[#2a2520] focus:border-amber-600"
  }`;

  const labelStyles = "block text-[11px] tracking-[0.12em] font-bold uppercase mb-2 " + (isLight ? "text-stone-400" : "text-[#4a3f32]");

  const eyeStyles = `absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:scale-110 active:scale-95 ${
    isLight ? "text-stone-300 hover:text-amber-600" : "text-[#4a3f32] hover:text-amber-500"
  }`;

  return (
    <div className={`min-h-screen flex font-mono transition-colors duration-500 ${isLight ? "bg-[#f7f3ee]" : "bg-[#0c0b0a]"}`}>

      {/* Panel izquierdo decorativo */}
      <div className={`hidden lg:flex w-[40%] flex-col justify-between p-12 border-r relative overflow-hidden ${
        isLight ? "bg-[#f0ebe3] border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"
      }`}>
        {/* Cráneo marca de agua */}
        <div className="absolute -bottom-10 -right-10 w-72 h-72 opacity-[0.06] grayscale pointer-events-none">
          <img src={BrachioSkull} alt="" className="w-full h-full object-contain" />
        </div>

        {/* Top */}
        <div>
          <div className="w-9 h-[3px] bg-amber-600 mb-8" />
          <p className={`text-[18px] tracking-[0.15em] uppercase ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
            PaleoArchivo
          </p>
        </div>

        {/* Centro */}
        <div>
          <p className={`text-5xl font-black leading-[1.1] tracking-tight mb-4 ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
            250M<br />años<br />de historia
          </p>
          <p className={`text-sm leading-relaxed ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>
            Accede a tu archivo<br />de investigación.
          </p>
        </div>

        {/* Dots */}
        <div className="flex gap-2 items-center">
          <div className="w-6 h-[3px] bg-amber-600 rounded-full" />
          {[1,2,3,4].map(i => (
            <div key={i} className={`w-2 h-[3px] rounded-full ${isLight ? "bg-stone-200" : "bg-[#2a2520]"}`} />
          ))}
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Logo pequeño */}
          <div className="flex items-center gap-3 mb-12">
            <img src={BrachioSkull} alt="Logo" className="w-7 h-7 object-contain opacity-80" />
            <span className={`text-[11px] tracking-[0.12em] uppercase ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
              PaleoArchivo
            </span>
          </div>

          {/* Título */}
          <h1 className={`text-3xl font-black tracking-tight mb-1 ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
            {lg.title || "Bienvenido"}
          </h1>
          <p className={`text-sm mb-10 ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>
            Introduce tus credenciales para continuar
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Identifier */}
            <div>
              <label className={labelStyles}>{lg.userOrEmail || "Usuario o email"}</label>
              <div className="relative">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${isLight ? "text-stone-300" : "text-[#4a3f32]"}`} size={18} />
                <input
                  type="text" required
                  placeholder={lg.userPlaceholder || "tu@email.com"}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                  className={inputStyles}
                  style={{ paddingRight: "1.25rem" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className={labelStyles}>{lg.password || "Contraseña"}</label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${isLight ? "text-stone-300" : "text-[#4a3f32]"}`} size={18} />
                <input
                  type={showPassword ? "text" : "password"} required
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={inputStyles}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={eyeStyles}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black uppercase tracking-[0.15em] text-sm transition-all flex items-center justify-center gap-3 group"
            >
              <LogIn size={18} className="group-hover:scale-110 transition-transform" />
              <span>{lg.submit || "Acceder"}</span>
            </button>
          </form>

          {/* Footer */}
          <p className={`mt-8 text-xs text-center uppercase tracking-widest ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
            {lg.noAccount || "¿No tienes cuenta?"}{" "}
            <Link to="/register" className="text-amber-600 font-bold hover:underline">
              {lg.signUp || "Registrarse"}
            </Link>
          </p>

          <p className="mt-3 text-center">
            <button
              onClick={() => navigate("/")}
              className={`text-[11px] uppercase tracking-widest transition-colors ${isLight ? "text-stone-300 hover:text-stone-500" : "text-[#2a2520] hover:text-[#4a3f32]"}`}
            >
              ← Volver al inicio
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;