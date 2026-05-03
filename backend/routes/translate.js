// backend/routes/translate.js
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { text, target } = req.body;

  if (!text || !target) {
    return res.status(400).json({ msg: 'Faltan campos: text y target son requeridos' });
  }

  if (!['en', 'fr', 'it'].includes(target)) {
    return res.status(400).json({ msg: 'Idioma no soportado. Usa: en, fr, it' });
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source: 'es', target, format: 'text' }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Error de Google Translate:', data.error.message);
      return res.status(500).json({ msg: data.error.message });
    }

    res.json({ translated: data.data.translations[0].translatedText });
  } catch (err) {
    console.error('Error en /translate:', err.message);
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

module.exports = router;