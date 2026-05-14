// src/pages/SugerirPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle, AlertCircle, Lock } from "lucide-react";
import { useUser } from "../context/useUser";
import apiClient from "../api/apiClient";

const PERIODOS = [
  { era: "Paleozoico", periodos: ["Cámbrico","Ordovícico","Silúrico","Devónico","Carbonífero","Pérmico"] },
  { era: "Mesozoico",  periodos: ["Triásico","Jurásico","Cretácico"] },
  { era: "Cenozoico",  periodos: ["Paleoceno","Eoceno","Oligoceno","Mioceno","Plioceno","Pleistoceno","Holoceno"] },
];

const ERA_COLOR = { Paleozoico: "#6aafc5", Mesozoico: "#6abf6a", Cenozoico: "#cf9a5a" };

export default function SugerirPage() {
  const navigate = useNavigate();
  const { theme } = useUser();
  const isLight = theme === "light";
  const token    = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "";

  const [nombre,  setNombre]  = useState("");
  const [periodo, setPeriodo] = useState("");
  const [fuente,  setFuente]  = useState("");
  const [status,  setStatus]  = useState(null); // null | "loading" | "ok" | "error"
  const [msg,     setMsg]     = useState("");

  const bg          = isLight ? "bg-[#f5f2ed]"   : "bg-[#0c0b0a]";
  const bgCard      = isLight ? "bg-white"        : "bg-[#0f0e0c]";
  const border      = isLight ? "border-stone-200": "border-[#2a2520]";
  const textPrimary = isLight ? "text-stone-900"  : "text-[#f5e6c8]";
  const textMuted   = isLight ? "text-stone-400"  : "text-[#6b5e4e]";
  const inputBg     = isLight ? "bg-stone-50"     : "bg-[#0c0b0a]";
  const inputFocus  = "focus:border-amber-600 focus:outline-none";

  const handleSubmit = async () => {
    if (!nombre.trim() || !periodo) {
      setStatus("error");
      setMsg("El nombre y el periodo son obligatorios.");
      return;
    }
    setStatus("loading");
    try {
      const res = await apiClient.post("/suggestions", { nombre, periodo, fuente });
      setStatus("ok");
      setMsg(res.data.msg);
      setNombre(""); setPeriodo(""); setFuente("");
    } catch (err) {
      setStatus("error");
      setMsg(err.response?.data?.msg || "Error al enviar. Inténtalo de nuevo.");
    }
  };

  // Sin sesión — mostrar bloqueo
  if (!token) {
    return (
      <div className={`min-h-screen flex items-center justify-center font-mono px-4 ${bg}`}>
        <div className={`rounded-2xl border p-8 max-w-sm w-full text-center ${bgCard} ${border}`}>
          <Lock size={32} className="text-amber-600 mx-auto mb-4" />
          <h2 className={`text-lg font-black uppercase tracking-tight mb-2 ${textPrimary}`}>
            Acceso restringido
          </h2>
          <p className={`text-[11px] leading-relaxed mb-6 ${textMuted}`}>
            Necesitas una cuenta para sugerir especies al archivo.
          </p>
          <div className="flex flex-col gap-2">
            <Link to="/login"
              className="w-full flex items-center justify-center py-2.5 rounded-xl bg-amber-600 text-white font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-amber-500 transition-all">
              Iniciar sesión
            </Link>
            <Link to="/register"
              className={`w-full flex items-center justify-center py-2.5 rounded-xl border font-mono text-[10px] uppercase tracking-widest font-bold transition-all ${border} ${textMuted} hover:border-amber-600 hover:text-amber-600`}>
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-mono transition-colors duration-500 ${bg}`}>
      <div className="max-w-2xl mx-auto px-4 py-8 pb-20">

        {/* Back */}
        <button onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-[11px] uppercase tracking-widest mb-8 transition-colors ${isLight ? "text-stone-400 hover:text-stone-700" : "text-stone-600 hover:text-stone-300"}`}>
          <ArrowLeft size={13} /> Volver
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-[3px] bg-amber-600" />
            <span className={`text-[10px] uppercase tracking-[0.2em] ${textMuted}`}>
              PaleoArchivo · Sugerir especie
            </span>
          </div>
          <h1 className={`text-4xl sm:text-5xl font-black tracking-tighter uppercase italic leading-none mb-3 ${textPrimary}`}>
            Sugerir una <span className="text-amber-600">especie</span>
          </h1>
          <p className={`text-[11px] leading-relaxed max-w-lg ${textMuted}`}>
            ¿Echas en falta una especie en el archivo? Envíanos tu sugerencia con una fuente científica y la revisaremos para añadirla en futuras actualizaciones.
          </p>
        </div>

        {/* Formulario */}
        <div className={`rounded-2xl border overflow-hidden ${bgCard} ${border}`}>

          {/* Badge usuario */}
          <div className={`px-5 py-3 border-b flex items-center gap-2 ${isLight ? "border-stone-100 bg-stone-50" : "border-[#1a1816] bg-[#0c0b0a]"}`}>
            <div className="w-2 h-2 rounded-full bg-amber-600" />
            <span className={`text-[9px] uppercase tracking-[0.2em] ${textMuted}`}>
              Enviando como <span className="text-amber-600 font-bold">{username}</span>
            </span>
          </div>

          <div className="p-6 flex flex-col gap-6">

            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <label className={`text-[9px] uppercase tracking-[0.2em] font-bold ${textMuted}`}>
                Nombre de la especie *
              </label>
              <input
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Ej: Therizinosaurus cheloniformis"
                maxLength={100}
                className={`w-full px-4 py-3.5 rounded-xl border font-mono text-[13px] transition-all ${inputBg} ${border} ${textPrimary} ${inputFocus} placeholder:${textMuted}`}
              />
              <span className={`text-[9px] ${textMuted}`}>{nombre.length}/100</span>
            </div>

            {/* Periodo */}
            <div className="flex flex-col gap-2">
              <label className={`text-[9px] uppercase tracking-[0.2em] font-bold ${textMuted}`}>
                Periodo geológico *
              </label>
              <div className="flex flex-col gap-3">
                {PERIODOS.map(({ era, periodos }) => (
                  <div key={era}>
                    <p style={{ color: ERA_COLOR[era] }}
                      className="font-mono text-[9px] uppercase tracking-widest mb-1.5">
                      {era}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {periodos.map(p => (
                        <button
                          key={p}
                          onClick={() => setPeriodo(p)}
                          style={periodo === p ? {
                            borderColor: ERA_COLOR[era],
                            color: ERA_COLOR[era],
                            background: `${ERA_COLOR[era]}18`,
                          } : {}}
                          className={`px-3 py-2 rounded-lg border font-mono text-[11px] uppercase tracking-wide transition-all
                            ${periodo === p ? "font-bold" : isLight ? "border-stone-200 text-stone-400 hover:border-stone-400" : "border-[#2a2520] text-[#4a3f32] hover:border-[#3a3028]"}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fuente */}
            <div className="flex flex-col gap-2">
              <label className={`text-[9px] uppercase tracking-[0.2em] font-bold ${textMuted}`}>
                Fuente científica <span style={{fontWeight:"normal",opacity:0.5}}>(opcional)</span>
              </label>
              <textarea
                value={fuente}
                onChange={e => setFuente(e.target.value)}
                placeholder="Ej: Wikipedia, paper DOI, libro de referencia..."
                maxLength={400}
                rows={3}
                className={`w-full px-4 py-3.5 rounded-xl border font-mono text-[13px] transition-all resize-none ${inputBg} ${border} ${textPrimary} ${inputFocus}`}
              />
              <span className={`text-[9px] ${textMuted}`}>{fuente.length}/400 · Paper, libro, Wikipedia con referencias, o enlace a fuente primaria</span>
            </div>

            {/* Feedback */}
            {status === "ok" && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30">
                <CheckCircle size={16} className="text-green-500 shrink-0" />
                <p className="font-mono text-[11px] text-green-500">{msg}</p>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30">
                <AlertCircle size={16} className="text-red-400 shrink-0" />
                <p className="font-mono text-[11px] text-red-400">{msg}</p>
              </div>
            )}

            {/* Botón */}
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-600 text-white font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={14} /> Enviar sugerencia
                </>
              )}
            </button>

          </div>
        </div>

        {/* Nota */}
        <p className={`text-center text-[10px] mt-4 leading-relaxed ${textMuted}`}>
          Las sugerencias son revisadas manualmente. No todas pueden añadirse, pero todas se valoran.
        </p>

      </div>
    </div>
  );
}