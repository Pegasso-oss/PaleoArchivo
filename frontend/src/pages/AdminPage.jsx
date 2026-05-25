// src/pages/AdminPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser";
import axios from "axios";
import {
  BarChart2, Users, Trophy, Lightbulb,
  Search, Trash2, Plus, X, RefreshCw, LogOut,
  ChevronRight, Star, Calendar, Hash
} from "lucide-react";

const ADMIN_URL = import.meta.env.VITE_API_URL?.replace("/api/auth", "/api/admin") || "http://localhost:5000/api/admin";

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
function StatsTab() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${ADMIN_URL}/stats`, { headers: adminHeaders() })
      .then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="font-mono text-[11px] uppercase tracking-widest text-[#6b5e4e]">Cargando...</p>;
  if (!data)   return <p className="font-mono text-[11px] text-red-400">Error al cargar estadísticas</p>;

  const cards = [
    { label: "Usuarios",    value: data.users,       color: "#f59e0b" },
    { label: "Favoritos",   value: data.favorites,   color: "#6abf6a" },
    { label: "Visitas",     value: data.history,     color: "#6aafc5" },
    { label: "Notas",       value: data.notes,       color: "#b87ad8" },
    { label: "Sugerencias", value: data.suggestions, color: "#f97316" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {cards.map(({ label, value, color }) => (
          <div key={label} className="relative p-5 rounded-xl border border-[#2a2520] bg-[#0f0e0c] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: color }} />
            <p className="font-mono text-[10px] uppercase tracking-widest mt-1 mb-2 text-[#4a3f32]">{label}</p>
            <p className="font-mono text-3xl font-black" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {data.topAnimals?.length > 0 && (
        <div className="rounded-xl border border-[#2a2520] bg-[#0f0e0c] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#1a1816] bg-[#0c0b0a]">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#4a3f32]">Top animales más visitados</p>
          </div>
          {data.topAnimals.map((a, i) => (
            <div key={a._id} className={`flex items-center gap-4 px-5 py-3.5 ${i < data.topAnimals.length - 1 ? "border-b border-[#1a1816]" : ""}`}>
              <span className={`font-mono text-[13px] font-black w-5 ${i === 0 ? "text-amber-500" : "text-[#4a3f32]"}`}>{i + 1}</span>
              <span className="font-mono text-[13px] font-bold flex-1 uppercase text-[#f5e6c8]">{a.nombre}</span>
              <span className="font-mono text-[11px] text-[#4a3f32]">{a.count} visitas</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Users ──────────────────────────────────────────────────────────────────
function UsersTab({ onSelectUser }) {
  const [users, setUsers]     = useState([]);
  const [q, setQ]             = useState("");
  const [loading, setLoading] = useState(false);

  const search = useCallback(async () => {
    setLoading(true);
    try {
      const r = await axios.get(`${ADMIN_URL}/users?q=${q}&limit=50`, { headers: adminHeaders() });
      setUsers(r.data.users);
    } catch {}
    setLoading(false);
  }, [q]);

  useEffect(() => { search(); }, []);

  const deleteUser = async (id, e) => {
    e.stopPropagation();
    if (!confirm("¿Borrar este usuario? Esta acción es irreversible.")) return;
    try {
      await axios.delete(`${ADMIN_URL}/users/${id}`, { headers: adminHeaders() });
      setUsers(u => u.filter(x => x._id !== id));
    } catch {}
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Buscador */}
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[#2a2520] bg-[#0c0b0a]">
        <Search size={14} className="text-[#4a3f32] shrink-0" />
        <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && search()}
          placeholder="Buscar por nombre o email..."
          className="flex-1 bg-transparent font-mono text-[12px] outline-none text-[#f5e6c8] placeholder:text-[#2a2520]" />
        <button onClick={search} className="text-amber-600 hover:text-amber-500 transition-colors">
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Tabla */}
      <div className="rounded-xl border border-[#2a2520] bg-[#0f0e0c] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_40px] gap-4 px-5 py-2.5 border-b border-[#1a1816] bg-[#0c0b0a]">
          {["Usuario", "Email", "ID", "Favs", "Registro", ""].map(h => (
            <p key={h} className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#3a3028]">{h}</p>
          ))}
        </div>

        {/* Filas */}
        {users.length === 0 && !loading && (
          <p className="px-5 py-4 font-mono text-[11px] uppercase text-[#4a3f32]">Sin resultados</p>
        )}
        {users.map((u, i) => (
          <div key={u._id}
            onClick={() => onSelectUser(u)}
            className={`grid grid-cols-[2fr_2fr_1fr_1fr_1fr_40px] gap-4 px-5 py-3.5 items-center cursor-pointer transition-all hover:bg-amber-600/5
              ${i < users.length - 1 ? "border-b border-[#1a1816]" : ""}`}>
            {/* Usuario */}
            <div className="flex items-center gap-2.5 min-w-0">
              <img src={u.avatar || "https://i.ytimg.com/vi/7j8krOd0-KA/maxresdefault.jpg"} alt=""
                className="w-7 h-7 rounded-full object-cover border border-[#2a2520] shrink-0" />
              <span className="font-mono text-[12px] font-bold uppercase truncate text-[#f5e6c8]">{u.username}</span>
            </div>
            {/* Email */}
            <span className="font-mono text-[11px] truncate text-[#6b5e4e]">{u.email}</span>
            {/* ID */}
            <span className="font-mono text-[10px] text-[#3a3028] truncate">{u._id.slice(-6)}</span>
            {/* Favs */}
            <div className="flex items-center gap-1.5">
              <Star size={10} className="text-amber-600 shrink-0" />
              <span className="font-mono text-[12px] font-bold text-amber-600">{u.favorites?.length || 0}</span>
            </div>
            {/* Fecha */}
            <span className="font-mono text-[10px] text-[#4a3f32]">
              {new Date(u.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "2-digit" })}
            </span>
            {/* Borrar */}
            <button onClick={e => deleteUser(u._id, e)}
              className="text-red-400/30 hover:text-red-400 transition-colors flex items-center justify-center">
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── User Detail Drawer ─────────────────────────────────────────────────────
function UserDrawer({ user, onClose }) {
  if (!user) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-sm bg-[#0f0e0c] border-l border-[#2a2520] flex flex-col overflow-y-auto">
        <div className="px-6 py-5 border-b border-[#1a1816] flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-widest text-amber-500 font-black">{user.username}</p>
          <button onClick={onClose} className="text-[#4a3f32] hover:text-[#f5e6c8] transition-colors"><X size={16} /></button>
        </div>
        <div className="p-6 flex flex-col gap-5">
          <img src={user.avatar || "https://i.ytimg.com/vi/7j8krOd0-KA/maxresdefault.jpg"} alt=""
            className="w-20 h-20 rounded-full object-cover border-2 border-amber-600/30" />
          <div className="flex flex-col gap-3">
            {[
              { icon: <Hash size={12} />,      label: "ID completo",    value: user._id },
              { icon: <Star size={12} />,      label: "Favoritos",      value: user.favorites?.length || 0 },
              { icon: <Calendar size={12} />,  label: "Registro",       value: new Date(user.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#4a3f32]">
                  {icon}
                  <p className="font-mono text-[9px] uppercase tracking-widest">{label}</p>
                </div>
                <p className="font-mono text-[12px] text-[#f5e6c8] break-all">{value}</p>
              </div>
            ))}
            {user.bio && (
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#4a3f32]">Biografía</p>
                <p className="font-mono text-[12px] text-[#f5e6c8]">{user.bio}</p>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl border ${user.isAdmin ? "border-amber-600/30 bg-amber-600/10" : "border-[#2a2520]"}`}>
            <p className={`font-mono text-[10px] uppercase tracking-widest ${user.isAdmin ? "text-amber-500" : "text-[#4a3f32]"}`}>
              {user.isAdmin ? "✓ Administrador" : "Usuario estándar"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Achievements ───────────────────────────────────────────────────────────
function AchievementsTab() {
  const [userId, setUserId]     = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState("");

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
          className="flex-1 px-4 py-2.5 rounded-xl border border-[#2a2520] bg-[#0c0b0a] font-mono text-[12px] outline-none text-[#f5e6c8] placeholder:text-[#2a2520]" />
        <button onClick={load}
          className="px-4 py-2.5 rounded-xl bg-amber-600 text-white font-mono text-[11px] uppercase tracking-widest hover:bg-amber-500 transition-all">
          {loading ? <RefreshCw size={13} className="animate-spin" /> : "Buscar"}
        </button>
      </div>

      {msg && <p className="font-mono text-[11px] text-red-400">{msg}</p>}

      {userData && (
        <div className="rounded-xl border border-[#2a2520] bg-[#0f0e0c] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#1a1816] bg-[#0c0b0a]">
            <p className="font-mono text-[11px] font-black uppercase text-amber-500">{userData.username}</p>
            <p className="font-mono text-[10px] text-[#4a3f32]">{unlockedIds.size} / {ACHIEVEMENT_IDS.length} logros</p>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {ACHIEVEMENT_IDS.map(id => {
              const has = unlockedIds.has(id);
              return (
                <div key={id} className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border transition-all
                  ${has ? "border-amber-600/30 bg-amber-600/10" : "border-[#2a2520]"}`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={`/achievements/${id}.png`} alt="" className="w-7 h-7 object-contain shrink-0"
                      onError={e => e.currentTarget.style.display="none"} />
                    <span className={`font-mono text-[11px] uppercase tracking-wide truncate ${has ? "text-amber-500" : "text-[#4a3f32]"}`}>{id}</span>
                  </div>
                  <button onClick={() => has ? remove(id) : add(id)}
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all
                      ${has ? "bg-red-500/20 text-red-400 hover:bg-red-500/40" : "bg-amber-600/20 text-amber-500 hover:bg-amber-600/40"}`}>
                    {has ? <X size={11} /> : <Plus size={11} />}
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
function SuggestionsTab() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${ADMIN_URL}/suggestions`, { headers: adminHeaders() })
      .then(r => setUsers(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="font-mono text-[11px] uppercase text-[#4a3f32]">Cargando...</p>;

  return (
    <div className="rounded-xl border border-[#2a2520] bg-[#0f0e0c] overflow-hidden">
      {users.length === 0 ? (
        <p className="px-5 py-4 font-mono text-[11px] uppercase text-[#4a3f32]">Sin sugerencias aún</p>
      ) : users.map((u, i) => (
        <div key={u._id} className={`flex items-center gap-4 px-5 py-3.5 ${i < users.length - 1 ? "border-b border-[#1a1816]" : ""}`}>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[13px] font-black uppercase text-[#f5e6c8]">{u.username}</p>
            <p className="font-mono text-[10px] text-[#4a3f32]">{u.email}</p>
          </div>
          <span className="font-mono text-[12px] font-black text-amber-500">{u.suggestions} sug.</span>
        </div>
      ))}
    </div>
  );
}

// ── Página principal ───────────────────────────────────────────────────────
export default function AdminPage() {
  const navigate  = useNavigate();
  const { theme } = useUser();
  const isLight   = theme === "light";

  const [tab, setTab]               = useState("stats");
  const [selectedUser, setSelectedUser] = useState(null);
  const [checking, setChecking]     = useState(true);
  const [allowed, setAllowed]       = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass,  setLoginPass]  = useState("");
  const [loginError, setLoginError] = useState("");

  const bg = isLight ? "bg-[#f5f2ed]" : "bg-[#0a0908]";

  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    if (!t) { setChecking(false); return; }
    axios.get(`${ADMIN_URL}/stats`, { headers: { "x-auth-token": t } })
      .then(() => setAllowed(true))
      .catch(() => { localStorage.removeItem("adminToken"); })
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = async () => {
    setLoginError("");
    try {
      const res = await axios.post(`${ADMIN_URL}/login`, { email: loginEmail, password: loginPass });
      localStorage.setItem("adminToken", res.data.token);
      setAllowed(true);
    } catch { setLoginError("Credenciales incorrectas"); }
  };

  const handleLogout = () => { localStorage.removeItem("adminToken"); setAllowed(false); };

  if (checking) return (
    <div className={`min-h-screen flex items-center justify-center ${bg}`}>
      <RefreshCw size={20} className="text-red-500 animate-spin" />
    </div>
  );

  if (!allowed) return (
    <div className="min-h-screen flex items-center justify-center font-mono bg-[#0a0908] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#2a2520] bg-[#0f0e0c] p-8 flex flex-col gap-6">
        <div>
          <div className="w-6 h-[3px] bg-red-500 mb-4" />
          <h1 className="text-2xl font-black uppercase italic tracking-tight text-[#f5e6c8]">
            Panel <span className="text-red-500">Admin</span>
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-widest mt-1 text-[#4a3f32]">Acceso restringido</p>
        </div>
        <div className="flex flex-col gap-3">
          <input value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="Email" type="email"
            className="w-full px-4 py-3 rounded-xl border border-[#2a2520] bg-[#0c0b0a] font-mono text-[13px] outline-none text-[#f5e6c8] placeholder:text-[#2a2520] focus:border-red-500/50 transition-colors" />
          <input value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="Contraseña" type="password"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 rounded-xl border border-[#2a2520] bg-[#0c0b0a] font-mono text-[13px] outline-none text-[#f5e6c8] placeholder:text-[#2a2520] focus:border-red-500/50 transition-colors" />
          {loginError && <p className="font-mono text-[11px] text-red-400">{loginError}</p>}
          <button onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-red-500 text-white font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-red-400 transition-all">
            Entrar
          </button>
        </div>
        <button onClick={() => navigate("/")} className="font-mono text-[10px] uppercase tracking-widest text-center text-[#4a3f32] hover:text-amber-500 transition-colors">
          ← Volver al inicio
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex font-mono bg-[#0a0908]">

      {/* ── Sidebar ── */}
      <aside className="w-56 shrink-0 flex flex-col border-r border-[#1a1816] bg-[#0c0b0a]">
        <div className="px-5 py-6 border-b border-[#1a1816]">
          <div className="w-5 h-[2px] bg-red-500 mb-3" />
          <p className="font-mono text-[13px] font-black uppercase italic text-[#f5e6c8]">
            Paleo<span className="text-red-500">Admin</span>
          </p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#3a3028] mt-0.5">Panel de control</p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setTab(id); setSelectedUser(null); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-[11px] uppercase tracking-widest transition-all text-left
                ${tab === id
                  ? "bg-red-500/15 text-red-400 border border-red-500/20"
                  : "text-[#4a3f32] hover:text-[#f5e6c8] hover:bg-white/[0.03]"}`}>
              <Icon size={13} />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-[#1a1816]">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full font-mono text-[11px] uppercase tracking-widest text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={13} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Contenido ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-8 py-4 border-b border-[#1a1816] bg-[#0c0b0a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#3a3028]">Admin</span>
            <ChevronRight size={11} className="text-[#2a2520]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#6b5e4e]">
              {TABS.find(t => t.id === tab)?.label}
            </span>
          </div>
          <button onClick={() => navigate("/")}
            className="font-mono text-[10px] uppercase tracking-widest text-[#3a3028] hover:text-amber-500 transition-colors">
            Ver sitio →
          </button>
        </header>

        {/* Body */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {tab === "stats"        && <StatsTab />}
          {tab === "users"        && <UsersTab onSelectUser={setSelectedUser} />}
          {tab === "achievements" && <AchievementsTab />}
          {tab === "suggestions"  && <SuggestionsTab />}
        </main>
      </div>

      {/* Drawer usuario */}
      <UserDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}