const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// --- REGISTRO ---
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'El email ya está registrado' });

    let userByName = await User.findOne({ username });
    if (userByName) return res.status(400).json({ msg: 'El nombre de usuario ya está en uso' });

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
      $or: [{ email: identifier.toLowerCase() }, { username: identifier }]
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

// --- OBTENER DATOS DE USUARIO (protegida) ---
// Solo el propio usuario puede consultar sus datos
router.get('/user/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ msg: 'No tienes permiso para ver estos datos' });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    res.json(user);
  } catch (err) {
    console.error('Error en GET /user/:id -', err.message);
    res.status(500).send('Error de servidor');
  }
});

// --- TOGGLE FAVORITOS (protegida) ---
// Solo el propio usuario puede modificar sus favoritos
router.post('/favorites/add', authMiddleware, async (req, res) => {
  const { userId, dinoId, nombre } = req.body;

  if (req.user.id !== userId) {
    return res.status(403).json({ msg: 'No tienes permiso para modificar estos favoritos' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const dinoIdStr = String(dinoId);
    const existe = user.favorites.some(fav => fav.id === dinoIdStr);

    if (existe) {
      user.favorites = user.favorites.filter(fav => fav.id !== dinoIdStr);
    } else {
      user.favorites.push({ id: dinoIdStr, nombre });
    }

    await user.save();
    res.json(user.favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

module.exports = router;