import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Carga inicial al refrescar la página
  useEffect(() => {
    const loadFavorites = async () => {
      const uid = localStorage.getItem("userId");
      if (!uid || uid === "undefined") return;

      try {
        const res = await axios.get(`http://localhost:5000/api/auth/user/${uid}`);
        // IMPORTANTE: Extraemos solo los IDs de los objetos recibidos
        const data = res.data.favorites || [];
        // Si data es [{id: "1", nombre: "..."}, ...], guardamos ["1", ...]
        setFavorites(data.map(item => String(item.id)));
      } catch (err) {
        console.error("Error cargando favoritos del búnker:", err);
      }
    };
    loadFavorites();
  }, []);

  // Función para saber si un animal específico es favorito
  const isFavorite = (id) => favorites.includes(String(id));

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  }
  return context;
};