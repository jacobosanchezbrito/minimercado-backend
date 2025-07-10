const notFound = (req, res, next) => {
  res.status(404).json({
    mensaje: `No se encontró la ruta: ${req.originalUrl}`,
  });
};

export default notFound;
