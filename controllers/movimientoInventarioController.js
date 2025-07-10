import MovimientoInventario from '../models/MovimientoInventario.js';

// Crear un movimiento de inventario
const crearMovimientoInventario = async (req, res) => {
  try {
    const nuevoMovimiento = new MovimientoInventario(req.body);
    const movimientoGuardado = await nuevoMovimiento.save();
    res.status(201).json(movimientoGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el movimiento', error });
  }
};

// Obtener todos los movimientos (por ahora sin filtros)
const obtenerMovimientosInventario = async (req, res) => {
  try {
    const movimientos = await MovimientoInventario.find()
      .populate('producto', 'nombre')
      .populate('responsable', 'nombre');
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los movimientos', error });
  }
};

// Obtener un movimiento específico por ID
const obtenerMovimientoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const movimiento = await MovimientoInventario.findById(id)
      .populate('producto', 'nombre')
      .populate('responsable', 'nombre');
    if (!movimiento) return res.status(404).json({ mensaje: 'Movimiento no encontrado' });

    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el movimiento', error });
  }
};

export {
  crearMovimientoInventario,
  obtenerMovimientosInventario,
  obtenerMovimientoPorId
};
