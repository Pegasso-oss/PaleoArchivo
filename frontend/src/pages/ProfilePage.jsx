// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/useUser";
import { useFavorites } from "../context/FavoritesContext";
import { useTranslation } from "../hooks/useTranslation";
import { allAnimals } from "../data/allData";
import apiClient from "../api/apiClient";
import Toast from "../components/Toast";
import {
  Lock, Trash2, Eye, EyeOff, AlertTriangle, Pencil, Check, X,
} from "lucide-react";

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

const Divider = ({ label, isLight }) => (
  <div className="flex items-center gap-3 my-6">
    <div className={`flex-1 h-px ${isLight ? "bg-stone-100" : "bg-white/5"}`} />
    <span className={`text-[10px] tracking-[0.2em] uppercase ${isLight ? "text-stone-400" : "text-stone-600"}`}>{label}</span>
    <div className={`flex-1 h-px ${isLight ? "bg-stone-100" : "bg-white/5"}`} />
  </div>
);

const Field = ({ label, value, onChange, type = "text", placeholder, isLight, maxLength }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div>
      <label className={`block text-[10px] tracking-[0.16em] uppercase mb-2 ${isLight ? "text-stone-400" : "text-stone-600"}`}>{label}</label>
      <div className="relative">
        <input
          type={isPassword && !show ? "password" : "text"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full font-mono text-base px-4 py-3 outline-none transition-all border focus:border-amber-500/60
            ${isLight ? "bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300" : "bg-black/20 border-white/[0.08] text-white placeholder:text-stone-700"}`}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-500 transition-colors">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {maxLength && <p className={`text-[9px] text-right font-mono mt-1 ${isLight ? "text-stone-300" : "text-stone-700"}`}>{value.length}/{maxLength}</p>}
    </div>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { theme: colorTheme, language, setLanguage } = useUser();
  const { favorites, clearFavorites } = useFavorites();
  const { tSection, t } = useTranslation();
  const pr = tSection("profile");
  const isLight = colorTheme === "light";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePass, setDeletePass] = useState("");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || localStorage.getItem("auth") !== "true") {
      navigate("/login", { replace: true }); return;
    }
    const fetchUser = async () => {
      try {
        const res = await apiClient.get(`/user/${userId}`);
        setUser(res.data);
        setUsername(res.data.username || "");
        setEmail(res.data.email || "");
        setBio(res.data.bio || "");
        setSelectedAvatar(res.data.avatar || "");
        localStorage.setItem("avatar", res.data.avatar || "");
      } catch { navigate("/login", { replace: true }); }
      finally { setLoading(false); }
    };
    fetchUser();
  }, []);

  const showToast = (msg, type = "success") => setToast({ show: true, msg, type });
  const myFavAnimals = allAnimals.filter(a => favorites.includes(String(a.id)));

  const handleSaveProfile = async () => {
    try {
      const res = await apiClient.put(`/user/${userId}`, { username, email, bio, avatar: selectedAvatar });
      setUser(res.data);
      localStorage.setItem("username", res.data.username.toUpperCase());
      localStorage.setItem("avatar", res.data.avatar || "");
      showToast(pr.toast?.profileUpdated);
    } catch (err) { showToast(err.response?.data?.msg || pr.toast?.saveError, "error"); }
  };

  const handleChangePassword = async () => {
    if (newPass !== confirmPass) return showToast(pr.toast?.passwordMismatch, "error");
    if (newPass.length < 6) return showToast(pr.toast?.passwordTooShort, "error");
    try {
      await apiClient.put(`/user/${userId}/password`, { currentPassword: currentPass, newPassword: newPass });
      setCurrentPass(""); setNewPass(""); setConfirmPass("");
      showToast(pr.toast?.passwordUpdated);
    } catch (err) { showToast(err.response?.data?.msg || pr.toast?.passwordError, "error"); }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== user?.username) return showToast(pr.toast?.nameMismatch, "error");
    try {
      await apiClient.delete(`/user/${userId}`, { data: { password: deletePass } });
      clearFavorites(); localStorage.clear();
      navigate("/", { replace: true }); window.location.reload();
    } catch (err) { showToast(err.response?.data?.msg || pr.toast?.deleteError, "error"); }
  };

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center font-mono text-sm italic tracking-[0.4em] ${isLight ? "bg-[#f7f3ee] text-stone-400" : "bg-[#0c0b0a] text-amber-600"}`}>
      {pr.loading}
    </div>
  );

  const avatarSrc = selectedAvatar || AVATARS[0].url;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className={`min-h-screen font-mono transition-colors duration-500 ${isLight ? "bg-[#f7f3ee]" : "bg-[#0c0b0a]"}`}
    >
      <Toast isVisible={toast.show} message={toast.msg} type={toast.type}
        onClose={() => setToast(t => ({ ...t, show: false }))} />

      <div className="max-w-6xl mx-auto px-4 py-10 pb-24">

        <button onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-[11px] uppercase tracking-widest mb-10 transition-colors ${isLight ? "text-stone-400 hover:text-stone-700" : "text-stone-600 hover:text-stone-300"}`}>
          ← {pr.back}
        </button>

        {/* En móvil: columna. En desktop: split */}
        <div className={`flex flex-col md:flex-row border ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>

          {/* Panel izquierdo */}
          <div className={`md:w-64 shrink-0 flex flex-col border-b md:border-b-0 md:border-r p-8
            ${isLight ? "bg-[#f0ebe3] border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>

            <div className="w-9 h-[3px] bg-amber-600 mb-8" />

            {/* Avatar */}
            <div className="relative w-20 h-20 mb-5 cursor-pointer" onClick={() => setShowAvatarPicker(true)}>
              <img src={avatarSrc} alt="avatar" className="w-full h-full rounded-full object-cover border border-amber-600/30" />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                <Pencil size={11} className="text-black" />
              </div>
            </div>

            <p className={`text-2xl font-black italic uppercase tracking-tight leading-tight mb-1 ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
              {user?.username}
            </p>
            <p className={`text-xs mb-8 break-all ${isLight ? "text-stone-400" : "text-stone-600"}`}>{user?.email}</p>

            {/* Stats */}
            <div className="flex md:flex-col flex-row gap-6 md:gap-5 mt-auto">
              <div>
                <p className="text-3xl font-black text-amber-600 leading-none">{myFavAnimals.length}</p>
                <p className={`text-[10px] tracking-[0.16em] uppercase mt-1 ${isLight ? "text-stone-400" : "text-stone-600"}`}>{pr.section?.favorites}</p>
              </div>
              <div className={`hidden md:block h-px w-full ${isLight ? "bg-stone-200" : "bg-[#2a2520]"}`} />
              <div>
                <p className={`text-[10px] tracking-[0.1em] uppercase ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                  {pr.memberSince}
                </p>
                <p className={`text-sm font-black mt-0.5 ${isLight ? "text-stone-700" : "text-stone-300"}`}>
                  {new Date(user?.createdAt).toLocaleDateString(
                    language === "en" ? "en-US" : language === "fr" ? "fr-FR" : language === "it" ? "it-IT" : "es-ES",
                    { month: "long", year: "numeric" }
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Panel derecho */}
          <div className={`flex-1 p-8 ${isLight ? "bg-white" : "bg-[#131211]"}`}>

            <Divider label={pr.section?.profileInfo} isLight={isLight} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Field label={pr.field?.username} value={username} onChange={setUsername} placeholder={pr.field?.usernamePlaceholder} isLight={isLight} />
              <Field label={pr.field?.email} value={email} onChange={setEmail} placeholder="tu@email.com" isLight={isLight} />
            </div>
            <div className="mb-4">
              <Field label={pr.field?.bio} value={bio} onChange={setBio} placeholder={pr.field?.bioPlaceholder} isLight={isLight} maxLength={300} />
            </div>
            <button onClick={handleSaveProfile}
              className="w-full py-3.5 bg-amber-600 text-white text-[11px] tracking-[0.16em] uppercase font-black transition-opacity hover:opacity-90">
              {pr.saveChanges}
            </button>

            <Divider label={pr.section?.changePassword} isLight={isLight} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Field label={pr.field?.currentPassword} value={currentPass} onChange={setCurrentPass} type="password" placeholder={pr.field?.passwordPlaceholder} isLight={isLight} />
              <Field label={pr.field?.newPassword} value={newPass} onChange={setNewPass} type="password" placeholder={pr.field?.passwordPlaceholder} isLight={isLight} />
            </div>
            <button onClick={handleChangePassword}
              className={`w-full py-3.5 text-[11px] tracking-[0.16em] uppercase font-black transition-all border
                ${isLight ? "border-stone-200 text-stone-600 hover:border-amber-500 hover:text-amber-600" : "border-[#2a2520] text-stone-400 hover:border-amber-600 hover:text-amber-500"}`}>
              {pr.updatePassword}
            </button>

            <Divider label={pr.section?.language} isLight={isLight} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { code: "es", label: "Español",  active: "bg-red-600 text-white border-red-600"            },
                { code: "en", label: "English",  active: "bg-stone-100 text-stone-900 border-stone-300"    },
                { code: "fr", label: "Français", active: "bg-blue-700 text-white border-blue-700"          },
                { code: "it", label: "Italiano", active: "bg-emerald-600 text-white border-emerald-600"    },
              ].map(({ code, label, active }) => (
                <button key={code} onClick={() => setLanguage(code)}
                  className={`py-3 text-[10px] tracking-[0.1em] uppercase font-black border transition-all
                    ${language === code ? active : isLight ? "border-stone-200 text-stone-500 hover:border-stone-400" : "border-[#2a2520] text-stone-600 hover:border-stone-500"}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Zona de peligro */}
            <div className={`flex flex-col md:flex-row md:items-center justify-between mt-8 p-5 border-l-2 border-red-500 gap-4 ${isLight ? "bg-red-50" : "bg-red-950/10"}`}>
              <p className={`text-sm leading-relaxed ${isLight ? "text-stone-600" : "text-stone-400"}`}>{pr.dangerDesc}</p>
              <button onClick={() => setShowDeleteModal(true)}
                className="shrink-0 flex items-center gap-2 px-4 py-3 border border-red-500/40 text-red-500 text-[10px] tracking-[0.14em] uppercase font-black bg-red-500/10 hover:bg-red-500/20 transition-all">
                <Trash2 size={13} />{pr.deleteAccount}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal avatar */}
      <AnimatePresence>
        {showAvatarPicker && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowAvatarPicker(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className={`w-full max-w-lg border overflow-hidden ${isLight ? "bg-white border-stone-200" : "bg-[#131211] border-[#2a2520]"}`}>
              <div className={`px-6 py-4 flex items-center justify-between border-b ${isLight ? "border-stone-100" : "border-[#2a2520]"}`}>
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-500">{pr.chooseAvatar}</span>
                <button onClick={() => setShowAvatarPicker(false)} className="text-stone-500 hover:text-white transition-colors"><X size={16} /></button>
              </div>
              <div className="p-5 grid grid-cols-4 gap-3">
                {AVATARS.map(av => (
                  <button key={av.id} onClick={() => { setSelectedAvatar(av.url); setShowAvatarPicker(false); }}
                    className={`relative overflow-hidden aspect-square border-2 transition-all ${selectedAvatar === av.url ? "border-amber-500 scale-95" : "border-transparent hover:border-amber-500/40"}`}>
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

      {/* Modal borrar cuenta */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md border overflow-hidden ${isLight ? "bg-white border-stone-200" : "bg-[#131211] border-[#2a2520]"}`}>
              <div className="px-6 py-4 bg-red-600/10 border-b border-red-600/20 flex items-center gap-3">
                <AlertTriangle size={15} className="text-red-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-red-500">{pr.deleteModal?.title}</span>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <p className={`text-sm ${isLight ? "text-stone-600" : "text-stone-400"}`}>
                  {pr.deleteModal?.warning} <span className="font-mono font-bold text-red-500">{user?.username}</span> {pr.deleteModal?.warningEnd}
                </p>
                <Field label={pr.deleteModal?.writeUsername} value={deleteConfirmText} onChange={setDeleteConfirmText} placeholder={user?.username} isLight={isLight} />
                <Field label={pr.deleteModal?.writePassword} value={deletePass} onChange={setDeletePass} type="password" placeholder={pr.field?.passwordPlaceholder} isLight={isLight} />
                <div className="flex gap-3 mt-1">
                  <button onClick={handleDeleteAccount} disabled={deleteConfirmText !== user?.username}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed text-white py-3.5 font-black text-[10px] uppercase tracking-widest transition-all">
                    {pr.deleteModal?.confirm}
                  </button>
                  <button onClick={() => { setShowDeleteModal(false); setDeletePass(""); setDeleteConfirmText(""); }}
                    className={`flex-1 py-3.5 font-black text-[10px] uppercase tracking-widest transition-all border ${isLight ? "border-stone-200 text-stone-600" : "border-[#2a2520] text-stone-400"}`}>
                    {pr.deleteModal?.cancel}
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