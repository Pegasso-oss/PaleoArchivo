import axios from 'axios';

// La URL base se lee de la variable de entorno de Vite.
// En desarrollo crea un archivo frontend/.env.local con:
//   VITE_API_URL=http://localhost:5000
// En producción configura esta variable en tu plataforma de despliegue.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api/auth`,
});

// Interceptor: añade automáticamente el token JWT a cada petición
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const baseClient = axios.create({
  baseURL: BASE_URL,
});

export default apiClient;