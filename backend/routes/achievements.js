const express = require('express');
const router  = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

const ERA_MAP = {
  "Cámbrico": "Paleozoico", "Ordovícico": "Paleozoico", "Silúrico": "Paleozoico",
  "Devónico": "Paleozoico", "Carbonífero": "Paleozoico", "Pérmico": "Paleozoico",
  "Triásico": "Mesozoico",  "Jurásico": "Mesozoico",    "Cretácico": "Mesozoico",
  "Paleoceno": "Cenozoico", "Eoceno": "Cenozoico",      "Oligoceno": "Cenozoico",
  "Mioceno": "Cenozoico",   "Plioceno": "Cenozoico",    "Pleistoceno": "Cenozoico",
  "Holoceno": "Cenozoico",
};

// ── Definición de logros ───────────────────────────────────────────────────
// Los lineales tienen prerequisite: el tier anterior debe estar desbloqueado
const ACHIEVEMENTS = [
  // Únicos
  { id: "first_visit",     check: (u) => u.history.length >= 1 },
  { id: "first_fav",       check: (u) => u.favorites.length >= 1 },
  { id: "first_note",      check: (u) => u.notes.length >= 1 },
  { id: "contributor",     check: (u) => (Array.isArray(u.suggestions) ? u.suggestions.length : (u.suggestions || 0)) >= 1 },
  { id: "time_traveler",   check: (u) => {
    const eras = new Set(u.history.map(h => ERA_MAP[h.animalEra]).filter(Boolean));
    return eras.size >= 3;
  }},
  { id: "carnivore_fan",   check: (u) => (u.favDietas?.["Carnívoro"] || 0) >= 5 },
  { id: "herbivore_fan",   check: (u) => (u.favDietas?.["Herbívoro"] || 0) >= 5 },

  // Exploración lineal
  { id: "explorer_bronze", check: (u) => u.history.length >= 10 },
  { id: "explorer_silver", prerequisite: "explorer_bronze", check: (u) => u.history.length >= 25 },
  { id: "explorer_gold",   prerequisite: "explorer_silver", check: (u) => u.history.length >= 50 },

  // Favoritos lineal
  { id: "collector_bronze", check: (u) => u.favorites.length >= 10 },
  { id: "collector_silver", prerequisite: "collector_bronze", check: (u) => u.favorites.length >= 25 },
  { id: "collector_gold",   prerequisite: "collector_silver", check: (u) => u.favorites.length >= 50 },

  // Notas lineal
  { id: "notes_bronze", check: (u) => u.notes.length >= 3 },
  { id: "notes_silver", prerequisite: "notes_bronze", check: (u) => u.notes.length >= 10 },
  { id: "notes_gold",   prerequisite: "notes_silver", check: (u) => u.notes.length >= 25 },
];

// ── Función principal ──────────────────────────────────────────────────────
async function checkAchievements(user, extraData = {}) {
  if (!user.history)      user.history      = [];
  if (!user.favorites)    user.favorites    = [];
  if (!user.notes)        user.notes        = [];
  if (!user.achievements) user.achievements = [];

  const unlocked = new Set(user.achievements.map(a => a.id));
  const newOnes  = [];

  const enriched = {
    ...user.toObject(),
    history:     user.history     || [],
    favorites:   user.favorites   || [],
    notes:       user.notes       || [],
    achievements:user.achievements|| [],
    favDietas:   extraData.favDietas   || {},
    suggestions: extraData.suggestions || 0,
  };

  for (const achievement of ACHIEVEMENTS) {
    if (unlocked.has(achievement.id)) continue;
    if (achievement.prerequisite && !unlocked.has(achievement.prerequisite)) continue;
    try {
      if (achievement.check(enriched)) {
        user.achievements.push({ id: achievement.id, unlockedAt: new Date() });
        unlocked.add(achievement.id); // para que el siguiente tier pueda desbloquearse en la misma llamada
        newOnes.push(achievement.id);
      }
    } catch (_) {}
  }

  if (newOnes.length > 0) await user.save();
  return newOnes;
}

// ── GET /achievements ──────────────────────────────────────────────────────
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('achievements');
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
    res.json(user.achievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

module.exports = { router, checkAchievements };