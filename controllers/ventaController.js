import Venta from '../models/Venta.js';

// Crear una nueva venta
const crearVenta = async (req, res) => {
  try {
    const nuevaVenta = new Venta(req.body);
    const ventaGuardada = await nuevaVenta.save();
    res.status(201).json(ventaGuardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la venta', error });
  }
};

// Obtener todas las ventas (Admin o empleado)
const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate('cliente', 'nombre correo')
      .populate('productos.producto', 'nombre precio')
      .populate('responsable', 'nombre correo');
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las ventas', error });
  }
};

// Obtener una venta específica por ID
const obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const venta = await Venta.findById(id)
      .populate('cliente', 'nombre correo')
      .populate('productos.producto', 'nombre precio')
      .populate('responsable', 'nombre correo');
    if (!venta) return res.status(404).json({ mensaje: 'Venta no encontrada' });

    res.json(venta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la venta', error });
  }
};

// Actualizar el estado de una venta (Por ejemplo: de 'Pendiente' a 'Pagado')
const actualizarEstadoVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const ventaActualizada = await Venta.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    )
      .populate('cliente', 'nombre correo')
      .populate('productos.producto', 'nombre precio')
      .populate('responsable', 'nombre correo');

    if (!ventaActualizada) return res.status(404).json({ mensaje: 'Venta no encontrada' });

    res.json(ventaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la venta', error });
  }
};

// Eliminar una venta (opcional, depende de la lógica del negocio)
const eliminarVenta = async (req, res) => {
  try {
    const { id } = req.params;

    const ventaEliminada = await Venta.findByIdAndDelete(id);

    if (!ventaEliminada) return res.status(404).json({ mensaje: 'Venta no encontrada' });

    res.json({ mensaje: 'Venta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la venta', error });
  }
};

export {
  crearVenta,
  obtenerVentas,
  obtenerVentaPorId,
  actualizarEstadoVenta,
  eliminarVenta
};
