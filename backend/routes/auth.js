const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- REGISTRO ---
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'El email ya está registrado' });

    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, username: user.username, userId: user.id });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// --- LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    let user = await User.findOne({
      $or: [ { email: identifier.toLowerCase() }, { username: identifier } ]
    });

    if (!user) return res.status(400).json({ msg: 'Usuario o email no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, username: user.username, userId: user.id });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// --- OBTENER DATOS USUARIO (UNIFICADA) ---
// Esta es la ruta que llama el FavoritesContext y la FavoritesPage
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    
    // Devolvemos el objeto completo. 
    // El frontend usará user.favorites (que es el array de strings ["1", "8"...])
    res.json(user);
  } catch (err) {
    console.error("Error en GET /user/:id -", err.message);
    res.status(500).send('Error de servidor');
  }
});

// --- TOGGLE FAVORITOS (Añadir o Quitar) ---
// routes/auth.js
router.post('/favorites/add', async (req, res) => {
  const { userId, dinoId, nombre } = req.body;
  
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const dinoIdStr = String(dinoId);

    // Buscamos si ya existe el ID
    const existe = user.favorites.some(fav => fav.id === dinoIdStr);

    if (existe) {
      user.favorites = user.favorites.filter(fav => fav.id !== dinoIdStr);
    } else {
      // EMPUJAMOS EL OBJETO CLARO
      user.favorites.push({ id: dinoIdStr, nombre: nombre });
    }

    await user.save();
    res.json(user.favorites); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error de servidor" });
  }
});

module.exports = router;