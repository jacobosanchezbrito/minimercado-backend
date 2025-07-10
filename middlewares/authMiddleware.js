import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

// Middleware para proteger rutas (solo usuarios autenticados)
const protegerRuta = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id).select('-password');

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Token inválido: usuario no encontrado.' });
    }

    req.usuario = usuario; // Guardamos el usuario en la request para usarlo después
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

// Middleware para roles específicos (Autorización)
const autorizarRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol insuficiente.' });
    }
    next();
  };
};

export { protegerRuta, autorizarRoles };
