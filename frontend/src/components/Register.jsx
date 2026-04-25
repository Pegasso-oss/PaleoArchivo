// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, CheckCircle2, Eye, EyeOff } from "lucide-react";
import BrachioSkull from "../assets/CBrachio.png";
import { useUser } from "../context/useUser";
import { useTranslation } from "../hooks/useTranslation";
import apiClient from "../api/apiClient";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "", email: "", password: "", confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useUser();
  const { tSection } = useTranslation();
  const rg = tSection('register');
  const isLight = theme === "light";

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("ERROR: Las contraseñas no coinciden.");
      return;
    }
    try {
      const response = await apiClient.post("/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("auth", "true");
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userId", response.data.userId);
      alert("ACCESO CONCEDIDO: Investigador registrado.");
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.msg || "Error en el registro.");
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

  const iconStyles = `absolute left-4 top-1/2 -translate-y-1/2 ${isLight ? "text-stone-300" : "text-[#4a3f32]"}`;

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
          <p className={`text-[11px] tracking-[0.15em] uppercase ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
            PaleoArchivo
          </p>
        </div>

        {/* Centro */}
        <div>
          <p className={`text-5xl font-black leading-[1.1] tracking-tight mb-4 ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
            Únete al<br />archivo<br />fósil
          </p>
          <p className={`text-sm leading-relaxed ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>
            Crea tu cuenta y comienza<br />tu expedición.
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
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-sm py-6"
        >
          {/* Logo pequeño */}
          <div className="flex items-center gap-3 mb-12">
            <img src={BrachioSkull} alt="Logo" className="w-10 h-10 object-contain opacity-80" />
            <span className={`text-[18px] tracking-[0.12em] uppercase ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
              PaleoArchivo
            </span>
          </div>

          {/* Título */}
          <h1 className={`text-3xl font-black tracking-tight mb-1 ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
            {rg.title || "Crear cuenta"}{" "}
            <span className="text-amber-600">{rg.titleAccent || ""}</span>
          </h1>
          <p className={`text-sm mb-10 ${isLight ? "text-stone-400" : "text-[#6b5e4e]"}`}>
            Completa los campos para registrarte
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Username */}
            <div>
              <label className={labelStyles}>{rg.username || "Usuario"}</label>
              <div className="relative">
                <User className={iconStyles} size={18} />
                <input
                  type="text" required
                  placeholder={rg.username || "dinosaurio123"}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={`w-full border rounded-xl py-4 pl-12 pr-5 text-lg focus:outline-none font-mono transition-all ${
                    isLight
                      ? "bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300 focus:border-amber-500"
                      : "bg-[#0f0e0d] border-[#2a2520] text-[#f5e6c8] placeholder:text-[#2a2520] focus:border-amber-600"
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={labelStyles}>{rg.email || "Email"}</label>
              <div className="relative">
                <Mail className={iconStyles} size={18} />
                <input
                  type="email" required
                  placeholder={rg.emailPlaceholder || "tu@email.com"}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full border rounded-xl py-4 pl-12 pr-5 text-lg focus:outline-none font-mono transition-all ${
                    isLight
                      ? "bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300 focus:border-amber-500"
                      : "bg-[#0f0e0d] border-[#2a2520] text-[#f5e6c8] placeholder:text-[#2a2520] focus:border-amber-600"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className={labelStyles}>{rg.password || "Contraseña"}</label>
              <div className="relative">
                <Lock className={iconStyles} size={18} />
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

            {/* Confirm Password */}
            <div>
              <label className={labelStyles}>{rg.confirmPassword || "Confirmar contraseña"}</label>
              <div className="relative">
                <Lock className={iconStyles} size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"} required
                  placeholder={rg.confirmPlaceholder || "••••••••"}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={inputStyles}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={eyeStyles}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black uppercase tracking-[0.15em] text-sm transition-all flex items-center justify-center gap-3 group"
            >
              <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
              <span>{rg.submit || "Registrarse"}</span>
            </button>
          </form>

          {/* Footer */}
          <p className={`mt-8 text-xs text-center uppercase tracking-widest ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
            {rg.hasAccount || "¿Ya tienes cuenta?"}{" "}
            <Link to="/login" className="text-amber-600 font-bold hover:underline">
              {rg.signIn || "Iniciar sesión"}
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

export default Register;