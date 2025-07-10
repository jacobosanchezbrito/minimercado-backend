import Carrito from '../models/Carrito.js';

const crearCarrito = async (req, res) => {
  try {
    const nuevoCarrito = new Carrito(req.body);
    const carritoGuardado = await nuevoCarrito.save();
    res.status(201).json(carritoGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el carrito', error });
  }
};

// Obtener todos los carritos (ADMIN)
const obtenerCarritos = async (req, res) => {
  try {
    const carritos = await Carrito.find()
      .populate('cliente', 'nombre correo') 
      .populate('items.producto', 'nombre precio'); 
    res.json(carritos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los carritos', error });
  }
};

// Obtener un carrito específico por ID
const obtenerCarritoPorCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await Carrito.findById(id)
      .populate('cliente', 'nombre correo')
      .populate('items.producto', 'nombre precio');
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el carrito', error });
  }
};

// Eliminar un carrito
const eliminarCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const carritoEliminado = await Carrito.findByIdAndDelete(id);
    if (!carritoEliminado) return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    res.json({ mensaje: 'Carrito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el carrito', error });
  }
};

const agregarProductoAlCarrito = async (req, res) => {
  try {
    const { clienteId, productoId, cantidad } = req.body;

    let carrito = await Carrito.findOne({ cliente: clienteId });

    if (!carrito) {
      carrito = new Carrito({
        cliente: clienteId,
        items: [{ producto: productoId, cantidad }],
        total: 0,
      });
    } else {
      const itemExistente = carrito.items.find(item => item.producto.toString() === productoId);
      if (itemExistente) {
        itemExistente.cantidad += cantidad;
      } else {
        carrito.items.push({ producto: productoId, cantidad });
      }
    }

    await carrito.populate('items.producto', 'precio');
    recalcularTotales(carrito);

    const carritoActualizado = await carrito.save();
    res.json(carritoActualizado);

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar producto al carrito', error });
  }
};

const quitarProductoDelCarrito = async (req, res) => {
  try {
    const { carritoId, productoId } = req.params;

    const carrito = await Carrito.findById(carritoId).populate('items.producto', 'precio');
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

    carrito.items = carrito.items.filter(item => item.producto._id.toString() !== productoId);

    recalcularTotales(carrito);

    const carritoActualizado = await carrito.save();
    res.json(carritoActualizado);

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al quitar producto del carrito', error });
  }
};

const recalcularTotales = (carrito) => {
  const subtotal = carrito.items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  carrito.total = subtotal;
};

export {
  crearCarrito,
  obtenerCarritos,
  obtenerCarritoPorCliente,
  eliminarCarrito,
  agregarProductoAlCarrito,
  quitarProductoDelCarrito
};
