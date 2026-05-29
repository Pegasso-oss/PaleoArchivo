// src/pages/AdminPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser";
import axios from "axios";
import {
  BarChart2, Users, Trophy, Lightbulb,
  Search, Trash2, Plus, X, RefreshCw, LogOut,
  ChevronRight, Award
} from "lucide-react";

const ADMIN_URL = import.meta.env.DEV ? "http://localhost:5000/api/admin" : "https://paleoarchivo.onrender.com/api/admin";

const ACHIEVEMENT_IDS = [
  "first_visit","first_fav","first_note","time_traveler","carnivore_fan",
  "herbivore_fan","contributor","explorer_bronze","explorer_silver","explorer_gold",
  "collector_bronze","collector_silver","collector_gold",
  "notes_bronze","notes_silver","notes_gold",
];

const TABS = [
  { id: "stats",        label: "Estadísticas", icon: BarChart2  },
  { id: "users",        label: "Usuarios",     icon: Users      },
  { id: "achievements", label: "Logros",       icon: Trophy     },
  { id: "suggestions",  label: "Sugerencias",  icon: Lightbulb  },
];

const adminHeaders = () => ({ "x-auth-token": localStorage.getItem("adminToken") });

// ── Stats ──────────────────────────────────────────────────────────────────
function StatsTab({ isLight }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const muted = isLight ? "text-stone-400" : "text-[#6b5e4e]";

  useEffect(() => {
    axios.get(`${ADMIN_URL}/stats`, { headers: adminHeaders() })
      .then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={`font-mono text-[11px] uppercase tracking-widest ${muted}`}>Cargando...</p>;
  if (!data)   return <p className="font-mono text-[11px] text-red-400">Error al cargar</p>;

  const cards = [
    { label: "Usuarios",    value: data.users,       color: "#f59e0b" },
    { label: "Favoritos",   value: data.favorites,   color: "#6abf6a" },
    { label: "Visitas",     value: data.history,     color: "#6aafc5" },
    { label: "Notas",       value: data.notes,       color: "#b87ad8" },
    { label: "Sugerencias", value: data.suggestions, color: "#f97316" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map(({ label, value, color }) => (
          <div key={label} className={`relative p-5 rounded-2xl border overflow-hidden
            ${isLight ? "bg-white border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
            <div className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: color }} />
            <p className={`font-mono text-[12px] uppercase tracking-widest mt-1 mb-3 ${muted}`}>{label}</p>
            <p className="font-mono text-4xl font-black" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {data.topAnimals?.length > 0 && (
        <div className={`rounded-2xl border overflow-hidden ${isLight ? "bg-white border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
          <div className={`px-6 py-4 border-b ${isLight ? "border-stone-100" : "border-[#1a1816]"}`}>
            <p className={`font-mono text-[13px] uppercase tracking-widest font-bold ${muted}`}>Top animales más visitados</p>
          </div>
          {data.topAnimals.map((a, i) => (
            <div key={a._id} className={`flex items-center gap-5 px-6 py-4 ${i < data.topAnimals.length - 1 ? isLight ? "border-b border-stone-100" : "border-b border-[#1a1816]" : ""}`}>
              <span className={`font-mono text-[13px] font-black w-6 text-center ${i === 0 ? "text-amber-500" : muted}`}>{i + 1}</span>
              <span className={`font-mono text-[13px] font-bold flex-1 uppercase ${isLight ? "text-stone-800" : "text-[#f5e6c8]"}`}>{a.nombre}</span>
              <span className={`font-mono text-[12px] px-3 py-1 rounded-lg ${isLight ? "bg-stone-100 text-stone-500" : "bg-white/5 text-[#6b5e4e]"}`}>{a.count} visitas</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Users ──────────────────────────────────────────────────────────────────
function UsersTab({ isLight, onSelectUser }) {
  const [users, setUsers]     = useState([]);
  const [q, setQ]             = useState("");
  const [loading, setLoading] = useState(false);
  const muted = isLight ? "text-stone-400" : "text-[#6b5e4e]";

  const search = useCallback(async () => {
    setLoading(true);
    try {
      const r = await axios.get(`${ADMIN_URL}/users?q=${q}&limit=50`, { headers: adminHeaders() });
      setUsers(r.data.users);
    } catch {}
    setLoading(false);
  }, [q]);

  useEffect(() => { search(); }, []);

  const deleteUser = async (e, id) => {
    e.stopPropagation();
    if (!confirm("¿Borrar este usuario? Esta acción no se puede deshacer.")) return;
    try {
      await axios.delete(`${ADMIN_URL}/users/${id}`, { headers: adminHeaders() });
      setUsers(u => u.filter(x => x._id !== id));
    } catch {}
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Buscador */}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${isLight ? "bg-white border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
        <Search size={14} className={muted} />
        <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && search()}
          placeholder="Buscar por nombre o email..."
          className={`flex-1 bg-transparent font-mono text-[14px] outline-none ${isLight ? "text-stone-800 placeholder:text-stone-300" : "text-[#f5e6c8] placeholder:text-[#3a3028]"}`} />
        <button onClick={search} className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all
          ${isLight ? "bg-stone-100 text-stone-500 hover:bg-stone-200" : "bg-white/5 text-[#6b5e4e] hover:bg-white/10"}`}>
          {loading ? <RefreshCw size={12} className="animate-spin" /> : "Buscar"}
        </button>
      </div>

      {/* Tabla */}
      <div className={`rounded-2xl border overflow-hidden ${isLight ? "bg-white border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
        {/* Header tabla */}
        <div className={`grid grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b text-[12px] font-mono uppercase tracking-widest
          ${isLight ? "border-stone-100 bg-stone-50 text-stone-400" : "border-[#1a1816] bg-[#0c0b0a] text-[#4a3f32]"}`}>
          <span>Usuario</span>
          <span>ID</span>
          <span>Favs</span>
          <span>Miembro desde</span>
          <span>Logros</span>
          <span></span>
        </div>

        {users.map((u, i) => (
          <div key={u._id}
            onClick={() => onSelectUser(u)}
            className={`grid grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4 cursor-pointer transition-all
              ${i < users.length - 1 ? isLight ? "border-b border-stone-100" : "border-b border-[#1a1816]" : ""}
              ${isLight ? "hover:bg-amber-50" : "hover:bg-amber-600/5"}`}>

            {/* Usuario */}
            <div className="flex items-center gap-3 min-w-0">
              <img src={u.avatar || "https://i.ytimg.com/vi/7j8krOd0-KA/maxresdefault.jpg"} alt=""
                className={`w-8 h-8 rounded-full object-cover border shrink-0 ${isLight ? "border-stone-200" : "border-[#2a2520]"}`} />
              <div className="min-w-0">
                <p className={`font-mono text-[14px] font-black uppercase truncate ${isLight ? "text-stone-800" : "text-[#f5e6c8]"}`}>{u.username}</p>
                <p className={`font-mono text-[12px] truncate ${muted}`}>{u.email}</p>
              </div>
            </div>

            {/* ID */}
            <p className={`font-mono text-[12px] truncate ${muted}`}>{u._id}</p>

            {/* Favs */}
            <p className={`font-mono text-[14px] font-bold text-amber-500`}>{u.favorites?.length || 0}</p>

            {/* Fecha */}
            <p className={`font-mono text-[13px] ${muted}`}>
              {new Date(u.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "2-digit" })}
            </p>

            {/* Logros */}
            <div className="flex items-center gap-1">
              <Award size={12} className="text-amber-500 shrink-0" />
              <p className={`font-mono text-[11px] font-bold ${isLight ? "text-stone-600" : "text-[#f5e6c8]"}`}>
                {u.achievements?.length || 0}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2">
              <button onClick={e => deleteUser(e, u._id)}
                className="p-1.5 rounded-lg text-red-400/40 hover:text-red-400 hover:bg-red-400/10 transition-all">
                <Trash2 size={13} />
              </button>
              <ChevronRight size={13} className={muted} />
            </div>
          </div>
        ))}

        {users.length === 0 && !loading && (
          <p className={`px-6 py-8 font-mono text-[11px] uppercase tracking-widest text-center ${muted}`}>Sin resultados</p>
        )}
      </div>
    </div>
  );
}

// ── User detail drawer ─────────────────────────────────────────────────────
function UserDrawer({ user, isLight, onClose }) {
  const muted  = isLight ? "text-stone-400"   : "text-[#6b5e4e]";
  const border = isLight ? "border-stone-200" : "border-[#2a2520]";

  if (!user) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className={`w-full max-w-md h-full overflow-y-auto border-l shadow-2xl p-6 flex flex-col gap-5
        ${isLight ? "bg-white border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <p className={`font-mono text-[12px] uppercase tracking-widest ${muted}`}>Detalle de usuario</p>
          <button onClick={onClose} className={`p-1.5 rounded-lg transition-all ${isLight ? "hover:bg-stone-100" : "hover:bg-white/5"}`}>
            <X size={14} className={muted} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <img src={user.avatar || "https://i.ytimg.com/vi/7j8krOd0-KA/maxresdefault.jpg"} alt=""
            className={`w-16 h-16 rounded-full object-cover border-2 border-amber-600/30`} />
          <div>
            <p className={`font-mono text-lg font-black uppercase italic ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>{user.username}</p>
            <p className={`font-mono text-[13px] ${muted}`}>{user.email}</p>
          </div>
        </div>

        <div className={`rounded-xl border divide-y ${border} ${isLight ? "divide-stone-100" : "divide-[#1a1816]"}`}>
          {[
            { label: "ID MongoDB",     value: user._id },
            { label: "Favoritos",      value: user.favorites?.length || 0 },
            { label: "Visitadas",      value: user.history?.length || 0 },
            { label: "Notas",          value: user.notes?.length || 0 },
            { label: "Logros",         value: `${user.achievements?.length || 0} / 16` },
            { label: "Sugerencias",    value: user.suggestions || 0 },
            { label: "Miembro desde",  value: new Date(user.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-4 py-3 gap-4">
              <span className={`font-mono text-[12px] uppercase tracking-widest ${muted}`}>{label}</span>
              <span className={`font-mono text-[13px] font-bold text-right break-all ${isLight ? "text-stone-700" : "text-[#f5e6c8]"}`}>{value}</span>
            </div>
          ))}
        </div>

        {user.bio && (
          <div className={`rounded-xl border p-4 ${border}`}>
            <p className={`font-mono text-[10px] uppercase tracking-widest mb-2 ${muted}`}>Biografía</p>
            <p className={`font-mono text-[12px] leading-relaxed ${isLight ? "text-stone-600" : "text-[#a89880]"}`}>{user.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Achievements ───────────────────────────────────────────────────────────
function AchievementsTab({ isLight }) {
  const [userId, setUserId]     = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState("");
  const muted  = isLight ? "text-stone-400"   : "text-[#6b5e4e]";
  const border = isLight ? "border-stone-200" : "border-[#2a2520]";

  const load = async () => {
    if (!userId.trim()) return;
    setLoading(true); setMsg("");
    try {
      const r = await axios.get(`${ADMIN_URL}/users/${userId}/achievements`, { headers: adminHeaders() });
      setUserData(r.data);
    } catch { setMsg("Usuario no encontrado"); }
    setLoading(false);
  };

  const add = async (id) => {
    try {
      const r = await axios.post(`${ADMIN_URL}/users/${userId}/achievements`, { achievementId: id }, { headers: adminHeaders() });
      setUserData(d => ({ ...d, achievements: r.data }));
    } catch (err) { setMsg(err.response?.data?.msg || "Error"); }
  };

  const remove = async (id) => {
    try {
      const r = await axios.delete(`${ADMIN_URL}/users/${userId}/achievements/${id}`, { headers: adminHeaders() });
      setUserData(d => ({ ...d, achievements: r.data }));
    } catch { setMsg("Error al quitar logro"); }
  };

  const unlockedIds = new Set((userData?.achievements || []).map(a => a.id));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <input value={userId} onChange={e => setUserId(e.target.value)} onKeyDown={e => e.key === "Enter" && load()}
          placeholder="ID de MongoDB del usuario..."
          className={`flex-1 px-4 py-3 rounded-xl border font-mono text-[14px] outline-none transition-all
            ${isLight ? "bg-white border-stone-200 text-stone-800 placeholder:text-stone-300" : "bg-[#0f0e0c] border-[#2a2520] text-[#f5e6c8] placeholder:text-[#3a3028]"}`} />
        <button onClick={load}
          className="px-5 py-3 rounded-xl bg-red-500 text-white font-mono text-[11px] uppercase tracking-widest hover:bg-red-400 transition-all">
          {loading ? <RefreshCw size={13} className="animate-spin" /> : "Buscar"}
        </button>
      </div>

      {msg && <p className="font-mono text-[11px] text-red-400">{msg}</p>}

      {userData && (
        <div className={`rounded-2xl border overflow-hidden ${isLight ? "bg-white border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
          <div className={`px-6 py-4 border-b flex items-center justify-between ${isLight ? "border-stone-100 bg-stone-50" : "border-[#1a1816] bg-[#0c0b0a]"}`}>
            <p className="font-mono text-[12px] font-black uppercase text-amber-500">{userData.username}</p>
            <p className={`font-mono text-[10px] ${muted}`}>{unlockedIds.size} / {ACHIEVEMENT_IDS.length} logros</p>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {ACHIEVEMENT_IDS.map(id => {
              const has = unlockedIds.has(id);
              return (
                <div key={id} className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all
                  ${has
                    ? isLight ? "border-amber-200 bg-amber-50" : "border-amber-600/30 bg-amber-600/10"
                    : isLight ? "border-stone-100 opacity-60" : "border-[#2a2520] opacity-50"}`}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={`/achievements/${id}.png`} alt="" className="w-8 h-8 object-contain shrink-0"
                      onError={e => e.currentTarget.style.display = "none"} />
                    <span className={`font-mono text-[13px] uppercase tracking-wide truncate font-bold
                      ${has ? "text-amber-500" : muted}`}>{id}</span>
                  </div>
                  <button onClick={() => has ? remove(id) : add(id)}
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all
                      ${has
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/40"
                        : "bg-amber-600/20 text-amber-500 hover:bg-amber-600/40"}`}>
                    {has ? <X size={12} /> : <Plus size={12} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Suggestions ────────────────────────────────────────────────────────────
function SuggestionsTab({ isLight }) {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const muted  = isLight ? "text-stone-400"   : "text-[#6b5e4e]";
  const border = isLight ? "border-stone-200" : "border-[#2a2520]";

  useEffect(() => {
    axios.get(`${ADMIN_URL}/suggestions`, { headers: adminHeaders() })
      .then(r => setUsers(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={`font-mono text-[13px] uppercase ${muted}`}>Cargando...</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className={`rounded-2xl border overflow-hidden ${isLight ? "bg-white border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
        <div className={`grid grid-cols-[2fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b text-[12px] font-mono uppercase tracking-widest
          ${isLight ? "border-stone-100 bg-stone-50 text-stone-400" : "border-[#1a1816] bg-[#0c0b0a] text-[#4a3f32]"}`}>
          <span>Usuario</span>
          <span>Sugerencias</span>
          <span>Miembro desde</span>
          <span></span>
        </div>
        {users.length === 0 ? (
          <p className={`px-6 py-8 font-mono text-[13px] uppercase tracking-widest text-center ${muted}`}>Sin sugerencias aún</p>
        ) : users.map((u, i) => (
          <div key={u._id}
            onClick={() => setSelected(selected?._id === u._id ? null : u)}
            className={`grid grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center px-6 py-4 cursor-pointer transition-all
              ${i < users.length - 1 ? isLight ? "border-b border-stone-100" : "border-b border-[#1a1816]" : ""}
              ${selected?._id === u._id ? isLight ? "bg-amber-50" : "bg-amber-600/5" : isLight ? "hover:bg-stone-50" : "hover:bg-white/[0.02]"}`}>
            <div>
              <p className={`font-mono text-[14px] font-black uppercase ${isLight ? "text-stone-800" : "text-[#f5e6c8]"}`}>{u.username}</p>
              <p className={`font-mono text-[12px] ${muted}`}>{u.email}</p>
            </div>
            <span className="font-mono text-[14px] font-black text-amber-500">{u.suggestions?.length || 0}</span>
            <span className={`font-mono text-[13px] ${muted}`}>{new Date(u.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "2-digit" })}</span>
            <ChevronRight size={14} className={`transition-transform duration-200 ${selected?._id === u._id ? "rotate-90" : ""} ${muted}`} />
          </div>
        ))}
      </div>

      {/* Detalle con lista de sugerencias */}
      {selected && (
        <div className={`rounded-2xl border overflow-hidden ${isLight ? "bg-white border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
          <div className={`px-6 py-4 border-b flex items-center justify-between ${isLight ? "border-stone-100 bg-stone-50" : "border-[#1a1816] bg-[#0c0b0a]"}`}>
            <div>
              <p className={`font-mono text-[15px] font-black uppercase italic ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>{selected.username}</p>
              <p className={`font-mono text-[12px] ${muted}`}>{selected.email} · {selected._id}</p>
            </div>
            <button onClick={() => setSelected(null)} className={`p-2 rounded-lg ${isLight ? "hover:bg-stone-100" : "hover:bg-white/5"}`}>
              <X size={14} className={muted} />
            </button>
          </div>

          {(selected.suggestions || []).length === 0 ? (
            <p className={`px-6 py-6 font-mono text-[13px] uppercase ${muted}`}>Sin sugerencias guardadas</p>
          ) : (selected.suggestions || []).map((s, i) => (
            <div key={i} className={`px-6 py-5 flex flex-col gap-3 ${i < selected.suggestions.length - 1 ? isLight ? "border-b border-stone-100" : "border-b border-[#1a1816]" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <p className={`font-mono text-[15px] font-black uppercase ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>{s.nombre}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`font-mono text-[11px] uppercase tracking-widest px-2 py-0.5 rounded-md font-bold
                      ${isLight ? "bg-amber-100 text-amber-700" : "bg-amber-600/20 text-amber-400"}`}>{s.periodo}</span>
                    {s.fuente && <span className={`font-mono text-[12px] ${muted}`}>{s.fuente}</span>}
                    <span className={`font-mono text-[11px] ${muted}`}>{new Date(s.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                </div>
                {s.foto && (
                  <img src={s.foto} alt="foto" className="w-20 h-20 rounded-xl object-cover shrink-0 border"
                    style={{ borderColor: isLight ? "#e7e5e4" : "#2a2520" }} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



// ── Página principal ───────────────────────────────────────────────────────
export default function AdminPage() {
  const navigate = useNavigate();
  const { theme } = useUser();
  const isLight = theme === "light";

  const [tab, setTab]           = useState("stats");
  const [selectedUser, setSelectedUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed]   = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass,  setLoginPass]  = useState("");
  const [loginError, setLoginError] = useState("");

  const bg     = isLight ? "bg-[#f5f2ed]" : "bg-[#0a0908]";
  const bgCard = isLight ? "bg-white"      : "bg-[#0f0e0c]";
  const border = isLight ? "border-stone-200" : "border-[#2a2520]";
  const muted  = isLight ? "text-stone-400"   : "text-[#6b5e4e]";

  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    if (!t) { setChecking(false); return; }
    axios.get(`${ADMIN_URL}/stats`, { headers: { "x-auth-token": t } })
      .then(() => setAllowed(true))
      .catch(() => { localStorage.removeItem("adminToken"); setAllowed(false); })
      .finally(() => setChecking(false));
  }, []);

  const handleAdminLogin = async () => {
    setLoginError("");
    try {
      const res = await axios.post(`${ADMIN_URL}/login`, { email: loginEmail, password: loginPass });
      localStorage.setItem("adminToken", res.data.token);
      setAllowed(true);
    } catch { setLoginError("Credenciales incorrectas"); }
  };

  const logout = () => { localStorage.removeItem("adminToken"); setAllowed(false); };

  if (checking) return (
    <div className={`min-h-screen flex items-center justify-center ${bg}`}>
      <RefreshCw size={20} className="text-red-500 animate-spin" />
    </div>
  );

  // ── Login ──
  if (!allowed) return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${bg}`}>
      <div className={`w-full max-w-sm rounded-2xl border p-8 flex flex-col gap-6 ${bgCard} ${border}`}>
        <div>
          <div className="w-8 h-[3px] bg-red-500 mb-4" />
          <h1 className={`font-mono text-2xl font-black uppercase italic tracking-tight ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
            Panel <span className="text-red-500">Admin</span>
          </h1>
          <p className={`font-mono text-[10px] uppercase tracking-widest mt-1 ${muted}`}>Acceso restringido</p>
        </div>
        <div className="flex flex-col gap-3">
          <input value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
            placeholder="Email" type="email" autoComplete="email"
            className={`w-full px-4 py-3 rounded-xl border font-mono text-[13px] outline-none transition-all
              focus:border-red-500/50 ${isLight ? "bg-stone-50 border-stone-200 text-stone-900" : "bg-[#0c0b0a] border-[#2a2520] text-[#f5e6c8]"}`} />
          <input value={loginPass} onChange={e => setLoginPass(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
            placeholder="Contraseña" type="password" autoComplete="current-password"
            className={`w-full px-4 py-3 rounded-xl border font-mono text-[13px] outline-none transition-all
              focus:border-red-500/50 ${isLight ? "bg-stone-50 border-stone-200 text-stone-900" : "bg-[#0c0b0a] border-[#2a2520] text-[#f5e6c8]"}`} />
          {loginError && <p className="font-mono text-[11px] text-red-400">{loginError}</p>}
          <button onClick={handleAdminLogin}
            className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-400 text-white font-mono text-[11px] uppercase tracking-widest font-black transition-all">
            Entrar
          </button>
        </div>
        <button onClick={() => navigate("/")} className={`font-mono text-[10px] uppercase tracking-widest text-center transition-colors hover:text-amber-500 ${muted}`}>
          ← Volver al inicio
        </button>
      </div>
    </div>
  );

  // ── Panel ──
  return (
    <div className={`min-h-screen flex ${bg}`}>

      {/* Sidebar */}
      <aside className={`hidden md:flex w-56 shrink-0 flex-col border-r ${isLight ? "bg-white border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
        <div className="p-6">
          <div className="w-6 h-[3px] bg-red-500 mb-4" />
          <p className={`font-mono text-[10px] uppercase tracking-widest ${muted}`}>PaleoArchivo</p>
          <p className={`font-mono text-lg font-black uppercase italic mt-0.5 ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
            Panel <span className="text-red-500">Admin</span>
          </p>
        </div>

        <nav className="flex-1 px-3 flex flex-col gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setTab(id); setSelectedUser(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-[13px] uppercase tracking-widest transition-all text-left
                ${tab === id
                  ? "bg-red-500 text-white"
                  : isLight ? "text-stone-500 hover:bg-stone-100 hover:text-stone-700" : "text-[#6b5e4e] hover:bg-white/5 hover:text-[#f5e6c8]"}`}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: isLight ? "#e7e5e4" : "#2a2520" }}>
          <button onClick={logout}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-mono text-[13px] uppercase tracking-widest transition-all
              text-red-400 hover:bg-red-500/10`}>
            <LogOut size={13} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 overflow-y-auto">
        {/* Header móvil */}
        <div className={`md:hidden flex items-center justify-between px-4 py-3 border-b ${isLight ? "bg-white border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
          <p className={`font-mono text-[12px] font-black uppercase italic ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
            Panel <span className="text-red-500">Admin</span>
          </p>
          <button onClick={logout} className="text-red-400"><LogOut size={15} /></button>
        </div>

        {/* Tabs móvil */}
        <div className={`md:hidden flex gap-1 p-2 border-b overflow-x-auto ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setTab(id); setSelectedUser(null); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest whitespace-nowrap transition-all
                ${tab === id ? "bg-red-500 text-white" : isLight ? "text-stone-500" : "text-[#6b5e4e]"}`}>
              <Icon size={12} /> {label}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          {tab === "stats"        && <StatsTab isLight={isLight} />}
          {tab === "users"        && <UsersTab isLight={isLight} onSelectUser={setSelectedUser} />}
          {tab === "achievements" && <AchievementsTab isLight={isLight} />}
          {tab === "suggestions"  && <SuggestionsTab isLight={isLight} />}
        </div>
      </main>

      {/* Drawer usuario */}
      {selectedUser && tab === "users" && (
        <UserDrawer user={selectedUser} isLight={isLight} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}