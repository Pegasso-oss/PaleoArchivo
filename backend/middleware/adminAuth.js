const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No autorizado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ msg: 'Acceso denegado' });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: 'Token inválido' });
  }
};