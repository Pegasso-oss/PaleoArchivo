// backend/routes/translate.js
const express = require('express');
const router = express.Router();

const LIBRE_TRANSLATE_URL = process.env.LIBRE_TRANSLATE_URL || 'https://paleoarchivo-translate.onrender.com';

const waitForLibreTranslate = async (fetch, maxWait = 60000) => {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    try {
      const res = await fetch(`${LIBRE_TRANSLATE_URL}/languages`, { method: 'GET' });
      if (res.ok) return true;
    } catch {}
    await new Promise(r => setTimeout(r, 3000));
  }
  return false;
};

router.post('/', async (req, res) => {
  const { text, target } = req.body;

  if (!text || !target) {
    return res.status(400).json({ msg: 'Faltan campos: text y target son requeridos' });
  }

  if (!['en', 'fr', 'it'].includes(target)) {
    return res.status(400).json({ msg: 'Idioma no soportado. Usa: en, fr, it' });
  }

  try {
    const fetch = (await import('node-fetch')).default;

    // Esperar a que LibreTranslate esté despierto
    const ready = await waitForLibreTranslate(fetch);
    if (!ready) {
      return res.status(503).json({ msg: 'Servicio de traducción no disponible' });
    }

    const response = await fetch(`${LIBRE_TRANSLATE_URL}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: 'es',
        target,
        format: 'text',
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Error de LibreTranslate:', data.error);
      return res.status(500).json({ msg: data.error });
    }

    res.json({ translated: data.translatedText });
  } catch (err) {
    console.error('Error en /translate:', err.message);
    res.status(500).json({ msg: 'Error de servidor' });
  }
});

module.exports = router;