const manejoErrores = (err, req, res, next) => {
  console.error('💥 Error:', err.stack);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    mensaje: err.message || 'Error interno del servidor',
    // En producción no se debería mostrar el stack por seguridad
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default manejoErrores;
