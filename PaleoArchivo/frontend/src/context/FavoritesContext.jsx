import React, { createContext, useState, useEffect, useContext } from "react";
import apiClient from "../api/apiClient";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Carga inicial al refrescar la página
  useEffect(() => {
    const loadFavorites = async () => {
      const uid = localStorage.getItem("userId");
      if (!uid || uid === "undefined") return;

      try {
        const res = await apiClient.get(`/user/${uid}`);
        const data = res.data.favorites || [];
        setFavorites(data.map(item => String(item.id)));
      } catch (err) {
        console.error("Error cargando favoritos del búnker:", err);
      }
    };
    loadFavorites();
  }, []);

  // Función para saber si un animal específico es favorito
  const isFavorite = (id) => favorites.includes(String(id));

  // Limpiar favoritos al cerrar sesión
  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, isFavorite, clearFavorites }}>
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