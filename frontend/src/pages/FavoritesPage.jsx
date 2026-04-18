import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { allAnimals } from "../data/allData";
import { useFavorites } from "../context/FavoritesContext";
import DinoCard from "../components/DinoCard";
import { FolderHeart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";

const FavoritesPage = () => {
  const { favorites, setFavorites } = useFavorites();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const auth = localStorage.getItem("auth");

    // Si no hay sesión activa, redirigir al login
    if (!auth || auth !== "true" || !userId || userId === "undefined") {
      navigate("/login", { replace: true });
      return;
    }

    const fetchFreshFavorites = async () => {
      try {
        const res = await apiClient.get(`/user/${userId}`);
        const data = res.data.favorites || [];
        const onlyIds = data.map(item => String(item.id || item));
        setFavorites(onlyIds);
      } catch (err) {
        console.error("Error al sincronizar:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFreshFavorites();
  }, []);

  // 2. Cruzar IDs de la DB con los objetos de allData.js (La lógica clave)
  // Usamos String() para que la comparación sea infalible.
  const myFavs = allAnimals.filter((animal) =>
    favorites.includes(String(animal.id))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141210] flex items-center justify-center">
        <div className="animate-pulse text-amber-500 font-mono text-sm tracking-widest">
          ACCEDIENDO A TUS FAVORITOS.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141210] pt-12 pb-20 px-4">
      <div className="max-w-[1820px] mx-auto">
        
        <header className="mb-16 max-w-[1720px] mx-auto">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none"
          >
            MIS <span className="text-amber-500">FAVORITOS</span>
          </motion.h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-0.5 w-12 bg-amber-500"></div>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">
              // {myFavs.length} ejemplares registrados en tus favoritos
            </p>
          </div>
        </header>

        <div className="max-w-[1720px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <AnimatePresence mode="popLayout">
            {myFavs.length > 0 ? (
              myFavs.map((animal) => (
                // Usamos motion para animar la entrada/salida de tarjetas
                <motion.div
                  key={animal.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* REUTILIZAMOS TU COMPONENTE DINO CARD AQUÍ */}
                  <DinoCard dino={animal} />
                </motion.div>
              ))
            ) : (
              /* ESTADO VACÍO ESTILIZADO (Si no hay favoritos) */
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.01]"
              >
                <FolderHeart size={90} className="text-stone-800 mb-8" />
                <h3 className="text-stone-500 font-black uppercase tracking-widest text-base mb-10 italic">
                  Base de datos vacía - No hay registros guardados
                </h3>
                <Link
                  to="/"
                  className="bg-amber-500 text-black px-10 py-5 rounded-3xl font-black uppercase text-xs tracking-[0.2em] hover:bg-amber-400 transition-all active:scale-95 flex items-center gap-3 shadow-lg shadow-amber-500/20"
                >
                  <Search size={18} />
                  Iniciar Búsqueda
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;