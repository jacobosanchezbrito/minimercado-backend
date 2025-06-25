import Producto from '../models/Producto.js';

const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el producto', error });
  }
};

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find().populate('proveedor', 'nombre');
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los productos', error });
  }
};

// Obtener un solo producto por ID
const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('proveedor', 'nombre');
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el producto', error });
  }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!productoActualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el producto', error });
  }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if (!productoEliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto', error });
  }
};

export {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
};
