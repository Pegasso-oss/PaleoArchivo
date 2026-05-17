// src/components/AnimalNotes.jsx
import React, { useState, useEffect, useCallback } from "react";
import { StickyNote, Save, Trash2, Lock, Loader } from "lucide-react";
import { useUser } from "../context/useUser";
import apiClient from "../api/apiClient";

export default function AnimalNotes({ animalId, animalNombre, hex }) {
  const { theme } = useUser();
  const isLight = theme === "light";
  const token = localStorage.getItem("token");

  const [text, setText]         = useState("");
  const [savedText, setSavedText] = useState("");
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [status, setStatus]     = useState(null); // null | "saved" | "deleted" | "error"
  const [lastSaved, setLastSaved] = useState(null);

  const hasChanges = text !== savedText;

  // Cargar nota al montar
  useEffect(() => {
    if (!token || !animalId) { setLoading(false); return; }
    apiClient.get(`/notes/${animalId}`)
      .then(res => {
        setText(res.data.text || "");
        setSavedText(res.data.text || "");
        setLastSaved(res.data.updatedAt);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [animalId, token]);

  // Guardar
  const save = useCallback(async () => {
    if (!hasChanges) return;
    setSaving(true);
    setStatus(null);
    try {
      const res = await apiClient.put(`/notes/${animalId}`, { text, animalNombre });
      setSavedText(text);
      setLastSaved(res.data.updatedAt);
      setStatus(text.trim() ? "saved" : "deleted");
      setTimeout(() => setStatus(null), 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
    } finally {
      setSaving(false);
    }
  }, [text, animalId, hasChanges]);

  // Borrar
  const remove = async () => {
    setText("");
    setSaving(true);
    try {
      await apiClient.put(`/notes/${animalId}`, { text: "", animalNombre });
      setSavedText("");
      setLastSaved(null);
      setStatus("deleted");
      setTimeout(() => setStatus(null), 2500);
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  // Auto-save con debounce de 2 segundos
  useEffect(() => {
    if (!hasChanges || !token) return;
    const timer = setTimeout(() => { save(); }, 2000);
    return () => clearTimeout(timer);
  }, [text]);

  const bg     = isLight ? "bg-stone-50"     : "bg-[#0c0b0a]";
  const border = isLight ? "border-stone-200" : "border-white/[0.07]";
  const muted  = isLight ? "text-stone-400"   : "text-[#4a3f32]";

  // Sin sesión
  if (!token) {
    return (
      <div className={`rounded-xl border-2 border-dashed flex items-center gap-3 px-4 py-3.5 ${isLight ? "border-stone-200" : "border-white/[0.07]"}`}>
        <Lock size={14} className={muted} />
        <p className={`font-mono text-[10px] uppercase tracking-widest ${muted}`}>
          Inicia sesión para añadir notas privadas
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border overflow-hidden ${border}`}>

      {/* Cabecera */}
      <div
        className={`flex items-center justify-between px-4 py-2.5 border-b ${isLight ? "border-stone-100 bg-stone-50" : "border-white/[0.06]"}`}
        style={{ background: isLight ? undefined : `linear-gradient(90deg, ${hex}08 0%, transparent 70%)` }}
      >
        <div className="flex items-center gap-2">
          <StickyNote size={12} style={{ color: hex }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: hex }}>
            Nota privada
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Indicador de estado */}
          {saving && <Loader size={11} className="animate-spin" style={{ color: hex }} />}
          {status === "saved" && (
            <span className="font-mono text-[9px] text-green-500 uppercase tracking-widest">Guardada ✓</span>
          )}
          {status === "deleted" && (
            <span className="font-mono text-[9px] text-amber-500 uppercase tracking-widest">Borrada</span>
          )}
          {status === "error" && (
            <span className="font-mono text-[9px] text-red-400 uppercase tracking-widest">Error</span>
          )}
          {hasChanges && !saving && (
            <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: `${hex}80` }}>
              Sin guardar
            </span>
          )}
        </div>
      </div>

      {/* Área de texto */}
      <div className={`px-4 py-3 ${bg}`}>
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader size={16} className="animate-spin" style={{ color: hex }} />
          </div>
        ) : (
          <>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={1000}
              rows={3}
              placeholder="Escribe tus notas sobre este animal..."
              className={`w-full bg-transparent font-mono text-[12px] resize-none outline-none transition-colors
                ${isLight ? "text-stone-700 placeholder:text-stone-300" : "text-[#f5e6c8] placeholder:text-[#3a3028]"}`}
            />

            {/* Footer */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t" style={{ borderColor: isLight ? "#e5e0d8" : "#1a1816" }}>
              <span className={`font-mono text-[9px] ${muted}`}>
                {text.length}/1000
                {lastSaved && !hasChanges && (
                  <> · guardada {new Date(lastSaved).toLocaleDateString()}</>
                )}
              </span>
              <div className="flex items-center gap-2">
                {savedText && (
                  <button onClick={remove} disabled={saving}
                    className={`flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-lg transition-all
                      ${isLight ? "text-red-400 hover:bg-red-50" : "text-red-400/60 hover:bg-red-400/10"}`}>
                    <Trash2 size={10} /> Borrar
                  </button>
                )}
                <button onClick={save} disabled={saving || !hasChanges}
                  style={{ borderColor: hasChanges ? `${hex}50` : "transparent", color: hasChanges ? hex : `${hex}40` }}
                  className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-lg border transition-all disabled:opacity-40">
                  <Save size={10} /> Guardar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}