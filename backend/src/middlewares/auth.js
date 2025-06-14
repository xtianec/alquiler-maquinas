const jwt = require('jsonwebtoken');

// Middleware de autenticación y autorización
// Permite definir qué roles pueden acceder a una ruta
exports.auth = (roles = []) => {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'No autenticado' });

    const token = header.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(decoded.rol)) {
        return res.status(403).json({ error: 'Acceso denegado' });
      }

      req.user = decoded; // Adjuntamos el usuario a la solicitud
      next();
    } catch {
      res.status(401).json({ error: 'Token inválido' });
    }
  };
};
