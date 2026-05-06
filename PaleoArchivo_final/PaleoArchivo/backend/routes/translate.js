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
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|${target}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus !== 200) {
      return res.status(500).json({ msg: data.responseDetails || 'Error de traducción' });
    }

    res.json({ translated: data.responseData.translatedText });
  } catch (err) {
    console.error('Error en /translate:', err.message);
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

module.exports = router;
