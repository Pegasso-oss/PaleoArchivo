const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './backend/.env' });
const authRoutes = require('./routes/auth');

const app = express();

// CORS: en producción, cambia esto al dominio real de tu frontend
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000' ];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origin (ej: Postman, apps móviles)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origen no permitido por CORS: ${origin}`));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('El servidor de la Reserva Dino está ONLINE 🦖');
});

// Conexión a la Base de Datos
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conexión exitosa a MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
  })
  .catch(err => console.error('❌ Error de conexión:', err));

  const allowedOrigins = [
  'https://paleoarchivo.vercel.app',
  'http://localhost:5173',
  'https://localhost',        // ← añade esto para Capacitor/Android
  'capacitor://localhost',    // ← y esto por si acaso
];