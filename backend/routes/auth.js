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

// --- OBTENER DATOS DE USUARIO ---
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

// --- ACTUALIZAR PERFIL (bio, avatar, username, email) ---
router.put('/user/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ msg: 'No tienes permiso para editar este perfil' });
    }

    const { username, email, bio, avatar } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    // Verificar que username/email no estén en uso por otro usuario
    if (username && username !== user.username) {
      const exists = await User.findOne({ username });
      if (exists) return res.status(400).json({ msg: 'Ese nombre de usuario ya está en uso' });
      user.username = username;
    }

    if (email && email !== user.email) {
      const exists = await User.findOne({ email: email.toLowerCase() });
      if (exists) return res.status(400).json({ msg: 'Ese email ya está registrado' });
      user.email = email.toLowerCase();
    }

    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();
    const updated = user.toObject();
    delete updated.password;
    res.json(updated);
  } catch (err) {
    console.error('Error en PUT /user/:id -', err.message);
    res.status(500).send('Error de servidor');
  }
});

// --- CAMBIAR CONTRASEÑA ---
router.put('/user/:id/password', authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ msg: 'No tienes permiso' });
    }

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ msg: 'Faltan campos requeridos' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ msg: 'La nueva contraseña debe tener al menos 6 caracteres' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'La contraseña actual es incorrecta' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ msg: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error('Error en PUT /user/:id/password -', err.message);
    res.status(500).send('Error de servidor');
  }
});

// --- BORRAR CUENTA ---
router.delete('/user/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ msg: 'No tienes permiso para borrar esta cuenta' });
    }

    const { password } = req.body;
    if (!password) return res.status(400).json({ msg: 'Se requiere la contraseña para confirmar' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Cuenta eliminada correctamente' });
  } catch (err) {
    console.error('Error en DELETE /user/:id -', err.message);
    res.status(500).send('Error de servidor');
  }
});

// --- TOGGLE FAVORITOS ---
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