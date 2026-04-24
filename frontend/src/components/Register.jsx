// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
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
  const [focused, setFocused] = useState(null);
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

  const dark = {
    bg: "#0c0b0a",
    card: "#131211",
    border: "#2a2520",
    borderFocus: "#c2832a",
    text: "#f5e6c8",
    muted: "#6b5e4e",
    accent: "#c2832a",
    input: "#0f0e0d",
    label: "#4a3f32",
  };

  const light = {
    bg: "#f7f3ee",
    card: "#ffffff",
    border: "#e2d9cc",
    borderFocus: "#b5722a",
    text: "#1a1410",
    muted: "#9b8b78",
    accent: "#b5722a",
    input: "#faf8f5",
    label: "#b0a090",
  };

  const c = isLight ? light : dark;

  const fieldStyle = (name) => ({
    width: "100%",
    background: c.input,
    border: `1px solid ${focused === name ? c.borderFocus : c.border}`,
    borderRadius: "10px",
    padding: "15px 48px 15px 16px",
    fontSize: "15px",
    fontFamily: "inherit",
    color: c.text,
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  });

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: c.label,
    marginBottom: "8px",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: c.bg,
      display: "flex",
      fontFamily: "'DM Mono', 'Fira Code', 'Courier New', monospace",
    }}>
      {/* Left decorative panel */}
      <div
        className="hidden-mobile"
        style={{
          width: "40%",
          background: isLight ? "#f0ebe3" : "#0f0e0c",
          borderRight: `1px solid ${c.border}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute",
          bottom: "-40px",
          right: "-40px",
          width: "320px",
          height: "320px",
          opacity: 0.06,
          filter: "grayscale(1)",
        }}>
          <img src={BrachioSkull} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        <div>
          <div style={{ width: "36px", height: "3px", background: c.accent, marginBottom: "32px" }} />
          <p style={{
            fontSize: "11px", letterSpacing: "0.15em",
            color: c.muted, textTransform: "uppercase", margin: 0,
          }}>PaleoArchivo</p>
        </div>

        <div>
          <p style={{
            fontSize: "42px", fontWeight: "700", color: c.text,
            lineHeight: 1.1, margin: "0 0 16px 0", letterSpacing: "-0.02em",
          }}>
            Únete al<br />archivo<br />fósil
          </p>
          <p style={{ fontSize: "13px", color: c.muted, margin: 0, lineHeight: 1.7 }}>
            Crea tu cuenta y comienza<br />tu expedición.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{
              width: i === 1 ? "24px" : "8px",
              height: "3px",
              background: i === 1 ? c.accent : c.border,
              borderRadius: "2px",
            }} />
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 32px",
        overflowY: "auto",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ width: "100%", maxWidth: "380px", paddingBottom: "24px" }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "48px" }}>
            <img src={BrachioSkull} alt="Logo" style={{ width: "28px", height: "28px", objectFit: "contain", opacity: 0.8 }} />
            <span style={{ fontSize: "12px", letterSpacing: "0.1em", color: c.muted, textTransform: "uppercase" }}>
              PaleoArchivo
            </span>
          </div>

          <h1 style={{
            fontSize: "26px", fontWeight: "700", color: c.text,
            margin: "0 0 6px 0", letterSpacing: "-0.01em",
          }}>
            {rg.title || "Crear cuenta"}{" "}
            <span style={{ color: c.accent }}>{rg.titleAccent || ""}</span>
          </h1>
          <p style={{ fontSize: "13px", color: c.muted, margin: "0 0 40px 0" }}>
            Completa los campos para registrarte
          </p>

          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Username */}
            <div>
              <label style={labelStyle}>{rg.username || "Usuario"}</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text" required
                  placeholder={rg.username || "dinosaurio123"}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  onFocus={() => setFocused("username")}
                  onBlur={() => setFocused(null)}
                  style={{ ...fieldStyle("username"), paddingRight: "16px" }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>{rg.email || "Email"}</label>
              <div style={{ position: "relative" }}>
                <input
                  type="email" required
                  placeholder={rg.emailPlaceholder || "tu@email.com"}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={{ ...fieldStyle("email"), paddingRight: "16px" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>{rg.password || "Contraseña"}</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} required
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocused("pw")}
                  onBlur={() => setFocused(null)}
                  style={fieldStyle("pw")}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: "14px", top: "50%",
                  transform: "translateY(-50%)", background: "none", border: "none",
                  cursor: "pointer", color: c.muted, padding: 0, display: "flex", alignItems: "center",
                }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={labelStyle}>{rg.confirmPassword || "Confirmar contraseña"}</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"} required
                  placeholder={rg.confirmPlaceholder || "••••••••"}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  onFocus={() => setFocused("cpw")}
                  onBlur={() => setFocused(null)}
                  style={fieldStyle("cpw")}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{
                  position: "absolute", right: "14px", top: "50%",
                  transform: "translateY(-50%)", background: "none", border: "none",
                  cursor: "pointer", color: c.muted, padding: 0, display: "flex", alignItems: "center",
                }}>
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                marginTop: "8px", width: "100%", padding: "15px",
                background: c.accent, border: "none", borderRadius: "10px",
                color: "#fff", fontSize: "13px", fontFamily: "inherit",
                fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", transition: "opacity 0.2s",
              }}
              onMouseEnter={e => e.target.style.opacity = "0.85"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              {rg.submit || "Registrarse"}
            </button>
          </form>

          <p style={{ marginTop: "32px", fontSize: "12px", color: c.muted, textAlign: "center" }}>
            {rg.hasAccount || "¿Ya tienes cuenta?"}{" "}
            <Link to="/login" style={{ color: c.accent, textDecoration: "none", fontWeight: "700" }}>
              {rg.signIn || "Iniciar sesión"}
            </Link>
          </p>

          <p style={{ marginTop: "12px", textAlign: "center" }}>
            <button
              onClick={() => navigate("/")}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "11px", color: c.label, letterSpacing: "0.08em",
                textTransform: "uppercase", fontFamily: "inherit",
              }}
            >
              ← Volver al inicio
            </button>
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Register;