import { useContext } from 'react';
import { UserContext } from './UserContext'; // Verifica que la ruta sea correcta

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};