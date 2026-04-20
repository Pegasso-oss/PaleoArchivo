import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/useUser";
import { useFavorites } from "../context/FavoritesContext";
import { allAnimals } from "../data/allData";
import apiClient from "../api/apiClient";
import DinoCard from "../components/DinoCard";
import Toast from "../components/Toast";
import {
  User, Mail, Lock, Trash2, Save, ChevronLeft,
  Star, Eye, EyeOff, AlertTriangle, Pencil, Check, X, Languages,
} from "lucide-react";

// ── Avatares predefinidos ──────────────────────────────────────────────────
// Añade aquí las URLs que encuentres del Campamento Cretácico u otros
const AVATARS = [
  { id: "av1", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eoraptor_BW.jpg/1200px-Eoraptor_BW.jpg", label: "Eoraptor" },
  { id: "av2", url: "https://images.dinosaurpictures.org/Allosaurus/Allosaurus_f614bc6d.jpg", label: "Allosaurus" },
  { id: "av3", url: "https://www.mundoprehistorico.com/wp-content/uploads/Archaeopteryx-01.jpg", label: "Archaeopteryx" },
  { id: "av4", url: "https://www.mundoprehistorico.com/wp-content/uploads/Stegosaurus-01.jpg", label: "Estegosaurus" },
  { id: "av5", url: "https://www.mundoprehistorico.com/wp-content/uploads/Diplodocus-01.jpg", label: "Diplodocus" },
  { id: "av6", url: "https://images.newscientist.com/wp-content/uploads/2023/09/27132703/SEI_173479939.jpg", label: "Trilobite" },
  { id: "av7", url: "https://static.wikia.nocookie.net/life-on-our-planet/images/a/a0/Cameroceras.jpg", label: "Cameroceras" },
  { id: "av8", url: "https://www.mundoprehistorico.com/wp-content/uploads/Compsognathus-01.jpg", label: "Compsognathus" },
];

// ── Sección colapsable ─────────────────────────────────────────────────────
const Section = ({ title, icon, children, isLight }) => (
  <div className={`rounded-xl border overflow-hidden ${isLight ? "bg-white border-stone-100" : "bg-white/[0.03] border-white/[0.06]"}`}>
    <div className={`px-5 py-4 flex items-center gap-2 border-b ${isLight ? "border-stone-100 bg-stone-50" : "border-white/[0.06] bg-white/[0.02]"}`}>
      <span className="text-amber-500">{icon}</span>
      <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.25em] text-stone-500">{title}</h2>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

// ── Input reutilizable ─────────────────────────────────────────────────────
const Field = ({ label, value, onChange, type = "text", placeholder, isLight, maxLength }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="flex flex-col gap-1.5">
      <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${isLight ? "text-stone-400" : "text-stone-600"}`}>{label}</label>
      <div className="relative">
        <input
          type={isPassword && !show ? "password" : "text"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full font-mono text-sm px-4 py-3 rounded-lg border outline-none transition-all focus:border-amber-500/60 ${isLight ? "bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300" : "bg-black/20 border-white/[0.08] text-white placeholder:text-stone-700"}`}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-500 transition-colors">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {maxLength && <p className={`text-[9px] text-right font-mono ${isLight ? "text-stone-300" : "text-stone-700"}`}>{value.length}/{maxLength}</p>}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════
const ProfilePage = () => {
  const navigate = useNavigate();
  const { theme: colorTheme, language, setLanguage } = useUser();
  const { favorites, setFavorites, clearFavorites } = useFavorites();
  const isLight = colorTheme === "light";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  // Campos editables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Contraseña
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Borrar cuenta
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePass, setDeletePass] = useState("");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || localStorage.getItem("auth") !== "true") {
      navigate("/login", { replace: true });
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await apiClient.get(`/user/${userId}`);
        setUser(res.data);
        setUsername(res.data.username || "");
        setEmail(res.data.email || "");
        setBio(res.data.bio || "");
        setSelectedAvatar(res.data.avatar || "");
        // Sincronizar avatar en localStorage para que el Header lo muestre
        localStorage.setItem("avatar", res.data.avatar || "");
      } catch {
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const showToast = (msg, type = "success") => setToast({ show: true, msg, type });

  // Favoritos cruzados con allData
  const myFavAnimals = allAnimals.filter(a => favorites.includes(String(a.id)));

  // ── Guardar perfil ──────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    try {
      const res = await apiClient.put(`/user/${userId}`, { username, email, bio, avatar: selectedAvatar });
      setUser(res.data);
      localStorage.setItem("username", res.data.username.toUpperCase());
      localStorage.setItem("avatar", res.data.avatar || "");
      showToast("PERFIL ACTUALIZADO");
    } catch (err) {
      showToast(err.response?.data?.msg || "ERROR AL GUARDAR", "error");
    }
  };

  // ── Cambiar contraseña ──────────────────────────────────────────────────
  const handleChangePassword = async () => {
    if (newPass !== confirmPass) return showToast("LAS CONTRASEÑAS NO COINCIDEN", "error");
    if (newPass.length < 6) return showToast("MÍNIMO 6 CARACTERES", "error");
    try {
      await apiClient.put(`/user/${userId}/password`, { currentPassword: currentPass, newPassword: newPass });
      setCurrentPass(""); setNewPass(""); setConfirmPass("");
      showToast("CONTRASEÑA ACTUALIZADA");
    } catch (err) {
      showToast(err.response?.data?.msg || "ERROR AL CAMBIAR", "error");
    }
  };

  // ── Borrar cuenta ───────────────────────────────────────────────────────
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== user?.username) return showToast("EL NOMBRE NO COINCIDE", "error");
    try {
      await apiClient.delete(`/user/${userId}`, { data: { password: deletePass } });
      clearFavorites();
      localStorage.clear();
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      showToast(err.response?.data?.msg || "ERROR AL BORRAR", "error");
    }
  };

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center font-mono text-sm italic tracking-[0.4em] ${isLight ? "bg-[#f5f2ed] text-stone-400" : "bg-[#1d1914] text-amber-600"}`}>
      CARGANDO PERFIL...
    </div>
  );

  const avatarSrc = selectedAvatar || AVATARS[0].url;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className={`min-h-screen transition-colors duration-500 ${isLight ? "bg-[#f5f2ed] text-stone-900" : "bg-[#1d1914] text-white"}`}
    >
      <Toast isVisible={toast.show} message={toast.msg} type={toast.type}
        onClose={() => setToast(t => ({ ...t, show: false }))} />

      <div className="max-w-[1000px] mx-auto px-4 lg:px-8 py-6 pb-28">

        {/* Top bar */}
        <div className="flex items-center mb-8">
          <button onClick={() => navigate(-1)}
            className="text-amber-500/80 hover:text-amber-500 font-mono text-xs uppercase tracking-[0.3em] transition-colors flex items-center gap-2 group">
            <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Volver
          </button>
        </div>

        {/* ── CABECERA DE PERFIL ─────────────────────────────────────────── */}
        <div className={`rounded-xl border overflow-hidden mb-6 ${isLight ? "bg-white border-stone-100" : "bg-white/[0.03] border-white/[0.06]"}`}>
          <div className="px-6 py-6">
            {/* Avatar + info en la misma fila */}
            <div className="flex items-center gap-5">
              {/* Avatar grande */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-full border-2 border-amber-500/40 overflow-hidden bg-stone-800 cursor-pointer"
                  onClick={() => setShowAvatarPicker(true)}>
                  <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <button onClick={() => setShowAvatarPicker(true)}
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                  <Pencil size={12} className="text-black" />
                </button>
              </div>

              {/* Info — min-w-0 para que el texto no empuje */}
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-tight truncate">
                  {user?.username}
                </h1>
                <p className={`text-xs font-mono mt-0.5 truncate ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                  {user?.email}
                </p>
                {user?.bio && (
                  <p className={`text-sm font-light leading-relaxed mt-2 line-clamp-2 ${isLight ? "text-stone-600" : "text-stone-400"}`}>
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-5 pt-5 border-t ${isLight ? 'border-stone-100' : 'border-white/[0.06]'}">
              <div>
                <p className="font-mono text-xl font-black text-amber-500">{myFavAnimals.length}</p>
                <p className={`text-[9px] font-mono uppercase tracking-widest ${isLight ? "text-stone-400" : "text-stone-600"}`}>Favoritos</p>
              </div>
              <div className={`w-px h-8 ${isLight ? "bg-stone-200" : "bg-white/[0.06]"}`} />
              <p className={`font-mono text-xs ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                Miembro desde {new Date(user?.createdAt).toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>

        {/* ── SELECTOR DE AVATAR (modal) ────────────────────────────────── */}
        <AnimatePresence>
          {showAvatarPicker && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowAvatarPicker(false)}
            >
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className={`w-full max-w-lg rounded-2xl border overflow-hidden ${isLight ? "bg-white border-stone-200" : "bg-[#1a1614] border-white/10"}`}
              >
                <div className={`px-5 py-4 flex items-center justify-between border-b ${isLight ? "border-stone-100" : "border-white/[0.06]"}`}>
                  <span className="font-mono text-[11px] font-black uppercase tracking-[0.25em] text-amber-500">Elegir avatar</span>
                  <button onClick={() => setShowAvatarPicker(false)} className="text-stone-500 hover:text-white transition-colors">
                    <X size={16} />
                  </button>
                </div>
                <div className="p-5 grid grid-cols-4 gap-3">
                  {AVATARS.map(av => (
                    <button key={av.id} onClick={() => { setSelectedAvatar(av.url); setShowAvatarPicker(false); }}
                      className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${selectedAvatar === av.url ? "border-amber-500 scale-95" : "border-transparent hover:border-amber-500/40"}`}
                    >
                      <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                      {selectedAvatar === av.url && (
                        <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                          <Check size={20} className="text-amber-500" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5">
                        <p className="text-[8px] font-mono text-white text-center truncate">{av.label}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-5">

          {/* ── EDITAR INFORMACIÓN ─────────────────────────────────────── */}
          <Section title="Información del perfil" icon={<User size={13} />} isLight={isLight}>
            <div className="flex flex-col gap-4">
              <Field label="Nombre de usuario" value={username} onChange={setUsername} placeholder="Tu nombre" isLight={isLight} />
              <Field label="Email" value={email} onChange={setEmail} placeholder="tu@email.com" isLight={isLight} />
              <Field label="Biografía" value={bio} onChange={setBio} placeholder="Cuéntanos algo sobre ti..." isLight={isLight} maxLength={300} />
              <button onClick={handleSaveProfile}
                className="flex items-center justify-center gap-2 bg-amber-600/10 hover:bg-amber-600/20 border-2 border-amber-600/50 text-amber-500 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all mt-1">
                <Save size={14} /> Guardar cambios
              </button>
            </div>
          </Section>

          {/* ── FAVORITOS ─────────────────────────────────────────────── */}
          <Section title={`Mis favoritos · ${myFavAnimals.length} ejemplares`} icon={<Star size={13} />} isLight={isLight}>
            {myFavAnimals.length === 0 ? (
              <p className={`text-sm font-mono text-center py-6 ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                Aún no has añadido ningún favorito
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {myFavAnimals.slice(0, 4).map(animal => (
                    <DinoCard key={animal.id} dino={animal} />
                  ))}
                </div>
                {myFavAnimals.length > 4 && (
                  <Link to="/favorites"
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border font-mono text-xs uppercase tracking-widest transition-all ${isLight ? "border-stone-200 text-stone-500 hover:border-stone-400" : "border-white/[0.08] text-stone-500 hover:border-white/20"}`}>
                    Ver los {myFavAnimals.length} favoritos →
                  </Link>
                )}
              </>
            )}
          </Section>

          {/* ── IDIOMA ────────────────────────────────────────────────── */}
          <Section title="Idioma" icon={<Languages size={13} />} isLight={isLight}>
            <div className="flex gap-2">
              {[
                { code: "es", label: "Español",  activeBg: "bg-red-600",     activeText: "text-white",  activeBorder: "border-red-600"     },
                { code: "en", label: "English",  activeBg: "bg-white",       activeText: "text-black",  activeBorder: "border-stone-300"   },
                { code: "fr", label: "Français", activeBg: "bg-blue-700",    activeText: "text-white",  activeBorder: "border-blue-700"    },
                { code: "it", label: "Italiano", activeBg: "bg-emerald-600", activeText: "text-white",  activeBorder: "border-emerald-600" },
              ].map(({ code, label, activeBg, activeText, activeBorder }) => (
                <button key={code} onClick={() => setLanguage(code)}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2
                    ${language === code
                      ? `${activeBg} ${activeText} ${activeBorder}`
                      : isLight
                        ? "bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-400"
                        : "bg-white/[0.03] border-white/[0.08] text-stone-500 hover:border-white/20"
                    }`}>
                  {label}
                </button>
              ))}
            </div>
          </Section>

          {/* ── CAMBIAR CONTRASEÑA ─────────────────────────────────────── */}
          <Section title="Cambiar contraseña" icon={<Lock size={13} />} isLight={isLight}>
            <div className="flex flex-col gap-4">
              <Field label="Contraseña actual" value={currentPass} onChange={setCurrentPass} type="password" placeholder="••••••••" isLight={isLight} />
              <Field label="Nueva contraseña" value={newPass} onChange={setNewPass} type="password" placeholder="••••••••" isLight={isLight} />
              <Field label="Confirmar nueva contraseña" value={confirmPass} onChange={setConfirmPass} type="password" placeholder="••••••••" isLight={isLight} />
              <button onClick={handleChangePassword}
                className="flex items-center justify-center gap-2 bg-amber-600/10 hover:bg-amber-600/20 border-2 border-amber-600/50 text-amber-500 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all mt-1">
                <Lock size={14} /> Actualizar contraseña
              </button>
            </div>
          </Section>

          {/* ── ZONA DE PELIGRO ────────────────────────────────────────── */}
          <div className={`rounded-xl border overflow-hidden border-red-500/20 ${isLight ? "bg-red-50" : "bg-red-950/10"}`}>
            <div className={`px-5 py-4 flex items-center gap-2 border-b border-red-500/20`}>
              <AlertTriangle size={13} className="text-red-500" />
              <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.25em] text-red-500">Zona de peligro</h2>
            </div>
            <div className="p-5">
              <p className={`text-sm mb-4 ${isLight ? "text-stone-600" : "text-stone-400"}`}>
                Borrar tu cuenta es una acción permanente. Perderás todos tus favoritos y datos de perfil.
              </p>
              <button onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 border-2 border-red-600/40 text-red-500 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                <Trash2 size={14} /> Borrar mi cuenta
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── MODAL BORRAR CUENTA ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-2xl border overflow-hidden ${isLight ? "bg-white border-stone-200" : "bg-[#1a1614] border-white/10"}`}
            >
              <div className="px-5 py-4 bg-red-600/10 border-b border-red-600/20 flex items-center gap-2">
                <AlertTriangle size={15} className="text-red-500" />
                <span className="font-mono text-[11px] font-black uppercase tracking-[0.25em] text-red-500">Confirmar eliminación</span>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <p className={`text-sm ${isLight ? "text-stone-600" : "text-stone-400"}`}>
                  Esta acción no se puede deshacer. Escribe tu nombre de usuario <span className="font-mono font-bold text-red-500">{user?.username}</span> para confirmar.
                </p>
                <Field label="Escribe tu nombre de usuario" value={deleteConfirmText}
                  onChange={setDeleteConfirmText} placeholder={user?.username} isLight={isLight} />
                <Field label="Tu contraseña" value={deletePass}
                  onChange={setDeletePass} type="password" placeholder="••••••••" isLight={isLight} />
                <div className="flex gap-3 mt-1">
                  <button onClick={handleDeleteAccount}
                    disabled={deleteConfirmText !== user?.username}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                    Borrar para siempre
                  </button>
                  <button onClick={() => { setShowDeleteModal(false); setDeletePass(""); setDeleteConfirmText(""); }}
                    className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isLight ? "bg-stone-100 text-stone-600" : "bg-white/5 text-stone-400"}`}>
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfilePage;