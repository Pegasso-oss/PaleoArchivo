// backend/routes/suggestions.js
const express = require('express');
const router  = express.Router();
const { Resend } = require('resend');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

const resend   = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.SUGGESTION_EMAIL || 'paleoarchivo@gmail.com';

const PERIODOS_VALIDOS = [
  'Cámbrico','Ordovícico','Silúrico','Devónico','Carbonífero','Pérmico',
  'Triásico','Jurásico','Cretácico',
  'Paleoceno','Eoceno','Oligoceno','Mioceno','Plioceno','Pleistoceno','Holoceno',
];

router.post('/', authMiddleware, async (req, res) => {
  const { nombre, periodo, fuente } = req.body;

  if (!nombre || !nombre.trim())
    return res.status(400).json({ msg: 'El nombre es obligatorio.' });
  if (!periodo || !PERIODOS_VALIDOS.includes(periodo))
    return res.status(400).json({ msg: 'Periodo geológico no válido.' });

  // Buscar username real en la BD
  let usuario = 'Desconocido';
  try {
    const user = await User.findById(req.user.id).select('username email');
    if (user) usuario = user.username || user.email || 'Desconocido';
  } catch (_) {}

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: TO_EMAIL,
      subject: `[PaleoArchivo] Nueva sugerencia: ${nombre.trim()}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f0e0c; color: #f5e6c8; border-radius: 12px;">
          <h2 style="color: #d97706; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0;">
            🦕 Nueva sugerencia de especie
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b5e4e; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; width: 130px;">Nombre</td>
              <td style="padding: 8px 0; font-weight: bold; color: #f5e6c8;">${nombre.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b5e4e; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Periodo</td>
              <td style="padding: 8px 0; color: #d97706; font-weight: bold;">${periodo}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b5e4e; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Fuente</td>
              <td style="padding: 8px 0; color: #f5e6c8;">${fuente?.trim() || 'No especificada'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b5e4e; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Usuario</td>
              <td style="padding: 8px 0; color: #f5e6c8;">${usuario}</td>
            </tr>
          </table>
        </div>
      `,
    });

    res.json({ msg: 'Sugerencia enviada correctamente. ¡Gracias!' });
  } catch (err) {
    console.error('Error Resend:', err);
    res.status(500).json({ msg: 'Error al enviar la sugerencia. Inténtalo de nuevo.' });
  }
});

module.exports = router;