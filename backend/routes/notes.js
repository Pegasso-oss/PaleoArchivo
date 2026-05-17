// backend/routes/notes.js
const express = require('express');
const router  = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// GET /api/auth/notes/:animalId — obtener nota de un animal
router.get('/:animalId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const note = (user.notes || []).find(n => n.animalId === req.params.animalId);
    res.json({ text: note?.text || "", updatedAt: note?.updatedAt || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

// PUT /api/auth/notes/:animalId — guardar o actualizar nota
router.put('/:animalId', authMiddleware, async (req, res) => {
  const { text, animalNombre } = req.body;
  if (text === undefined) return res.status(400).json({ msg: 'Texto requerido' });
  if (text.length > 1000) return res.status(400).json({ msg: 'Máximo 1000 caracteres' });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    if (!user.notes) user.notes = [];

    const idx = user.notes.findIndex(n => n.animalId === req.params.animalId);
    const now = new Date();

    if (text.trim() === "") {
      if (idx !== -1) user.notes.splice(idx, 1);
    } else if (idx !== -1) {
      user.notes[idx].text = text;
      user.notes[idx].animalNombre = animalNombre || user.notes[idx].animalNombre || "";
      user.notes[idx].updatedAt = now;
    } else {
      user.notes.push({ animalId: req.params.animalId, animalNombre: animalNombre || "", text, updatedAt: now });
    }

    await user.save();
    res.json({ msg: 'Nota guardada', text, updatedAt: now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

module.exports = router;