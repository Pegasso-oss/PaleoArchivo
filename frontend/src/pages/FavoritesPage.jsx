import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { allAnimals } from "../data/allData";
import { useFavorites } from "../context/FavoritesContext";
import DinoCard from "../components/DinoCard";
import { FolderHeart, Search } from "lucide-react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  
  // Filtramos los animales que están en la lista de favoritos
  const myFavs = allAnimals.filter((dino) => favorites.includes(dino.id));

  // Lógica de tema
  const [isLight, setIsLight] = useState(document.documentElement.classList.contains('light-theme'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light-theme'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen pt-6 md:pt-12 pb-20 transition-colors duration-500 ${
      isLight ? 'bg-[#f5f2ed]' : 'bg-[#141210]'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera de la página */}
        <div className="mb-12">
          <h1 className={`text-5xl font-black italic uppercase tracking-tighter mb-2 ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            Mi <span className="text-amber-500">Archivo</span> Personal
          </h1>
          <p className="text-stone-500 font-mono text-xs uppercase tracking-widest">
            {myFavs.length} ejemplares en tus favoritos
          </p>
        </div>

        {/* Grid de Favoritos */}
        {myFavs.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
          >
            {myFavs.map((dino) => (
              <DinoCard key={dino.id} dino={dino} />
            ))}
          </motion.div>
        ) : (
          /* Estado Vacío */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex flex-col items-center justify-center py-32 rounded-[3rem] border-2 border-dashed ${
              isLight ? 'border-stone-200 bg-stone-100/50' : 'border-white/5 bg-white/[0.02]'
            }`}
          >
            <FolderHeart size={64} className="text-stone-500/30 mb-6" />
            <h3 className={`text-xl font-bold uppercase italic tracking-tight mb-2 ${
              isLight ? 'text-stone-600' : 'text-stone-400'
            }`}>
              Archivo vacío
            </h3>
            <p className="text-stone-500 text-sm mb-8 text-center max-w-xs font-light px-4">
              Aún no has marcado ningún espécimen como favorito en la base de datos.
            </p>
            <Link 
              to="/" 
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all active:scale-95"
            >
              <Search size={16} />
              Explorar Especies
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;