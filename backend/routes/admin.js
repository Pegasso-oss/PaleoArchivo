const express  = require('express');
const router   = express.Router();
const adminAuth = require('../middleware/adminAuth');
const User     = require('../models/User');
const jwt = require('jsonwebtoken');

// ── Login admin ───────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (
    email    !== process.env.ADMIN_EMAIL    ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ msg: 'Credenciales incorrectas' });
  }
  const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});



// ── Estadísticas globales ─────────────────────────────────────────────────
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const users      = await User.countDocuments();
    const totalFavs  = await User.aggregate([{ $group: { _id: null, total: { $sum: { $size: "$favorites" } } } }]);
    const totalHist  = await User.aggregate([{ $group: { _id: null, total: { $sum: { $size: { $ifNull: ["$history", []] } } } } }]);
    const totalNotes = await User.aggregate([{ $group: { _id: null, total: { $sum: { $size: { $ifNull: ["$notes", []] } } } } }]);
    const totalSugg  = await User.aggregate([
      { $addFields: { suggestionsArr: { $cond: { if: { $isArray: "$suggestions" }, then: "$suggestions", else: [] } } } },
      { $group: { _id: null, total: { $sum: { $size: "$suggestionsArr" } } } }
    ]);

    // Animal más visitado
    const topAnimal = await User.aggregate([
      { $unwind: { path: "$history", preserveNullAndEmptyArrays: false } },
      { $group: { _id: "$history.animalId", nombre: { $first: "$history.animalNombre" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      users,
      favorites:   totalFavs[0]?.total  || 0,
      history:     totalHist[0]?.total   || 0,
      notes:       totalNotes[0]?.total  || 0,
      suggestions: totalSugg[0]?.total   || 0,
      topAnimals:  topAnimal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

// ── Lista de usuarios ─────────────────────────────────────────────────────
router.get('/users', adminAuth, async (req, res) => {
  try {
    const { q = '', page = 1, limit = 20 } = req.query;
    const filter = q ? { $or: [{ username: new RegExp(q, 'i') }, { email: new RegExp(q, 'i') }] } : {};
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await User.countDocuments(filter);
    res.json({ users, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

// ── Un usuario ────────────────────────────────────────────────────────────
router.get('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'No encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

// ── Editar isAdmin ────────────────────────────────────────────────────────
router.put('/users/:id/admin', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: req.body.isAdmin }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

// ── Logros de un usuario ──────────────────────────────────────────────────
router.get('/users/:id/achievements', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('achievements username');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

// ── Añadir logro manualmente ──────────────────────────────────────────────
router.post('/users/:id/achievements', adminAuth, async (req, res) => {
  try {
    const { achievementId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'No encontrado' });
    if (!user.achievements) user.achievements = [];
    if (user.achievements.some(a => a.id === achievementId))
      return res.status(400).json({ msg: 'Ya tiene ese logro' });
    user.achievements.push({ id: achievementId, unlockedAt: new Date() });
    await user.save();
    res.json(user.achievements);
  } catch (err) {
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

// ── Quitar logro ──────────────────────────────────────────────────────────
router.delete('/users/:id/achievements/:achievementId', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'No encontrado' });
    user.achievements = (user.achievements || []).filter(a => a.id !== req.params.achievementId);
    await user.save();
    res.json(user.achievements);
  } catch (err) {
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

// ── Sugerencias ───────────────────────────────────────────────────────────
router.get('/suggestions', adminAuth, async (req, res) => {
  try {
    const users = await User.find({
      $or: [
        { suggestions: { $type: 'array', $ne: [] } },
        { suggestions: { $type: 'number', $gt: 0 } },
      ]
    }).select('username email suggestions createdAt');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

// ── Borrar usuario ────────────────────────────────────────────────────────
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    if (req.params.id === req.user.id) return res.status(400).json({ msg: 'No puedes borrarte a ti mismo' });
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

module.exports = router;