import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// 1. Creamos el contexto
const FavoritesContext = createContext();

// 2. Exportamos el Provider
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Carga inicial de favoritos desde la DB
  useEffect(() => {
    const loadFavorites = async () => {
      const uid = localStorage.getItem("userId");
      // Si no hay ID o es "undefined" (común en errores de login), paramos
      if (!uid || uid === "undefined") return;

      try {
        // IMPORTANTE: Verifica que la URL sea exactamente esta
        const res = await axios.get(`http://localhost:5000/api/auth/user/${uid}`);
        setFavorites(res.data.favorites || []);
      } catch (err) {
        console.error("Error cargando favoritos:", err);
      }
    };
    loadFavorites();
  }, []);

  // Función de utilidad para comprobar si un ID es favorito
  const isFavorite = (id) => favorites.includes(String(id));

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// 3. Export NOMBRADO del hook (Esto es lo que te fallaba)
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  }
  return context;
};