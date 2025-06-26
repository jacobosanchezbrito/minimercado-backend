import PedidoProveedor from '../models/PedidoProveedor.js';

const crearPedidoProveedor = async (req, res) => {
  try {
    const nuevoPedidoProveedor = new PedidoProveedor(req.body);
    const pedidoProveedorGuardado = await nuevoPedidoProveedor.save();
    res.status(201).json(pedidoProveedorGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el nuevo pedido al proveedor', error });
  }
};

// Obtener todos los pedidos
const obtenerPedidosProveedores = async (req, res) => {
  try {
    const pedidos = await PedidoProveedor.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener todos los pedidos', error });
  }
};

// Obtener un solo pedido por su ID
const obtenerPedidoProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await PedidoProveedor.findById(id);
    if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el pedido por su ID', error });
  }
};

const obtenerPedidosPorProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidos = await PedidoProveedor.find({ proveedor: id })
      .populate('proveedor', 'nombre categoria') 
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los pedidos del PROVEEDOR',
      error,
    });
  }
};

const obtenerPedidosPorResponsable = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidos = await PedidoProveedor.find({ responsable: id })
      .populate('responsable', 'nombre correo'); 
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los pedidos del proveedor por RESPONSABLE',
      error,
    });
  }
};

const obtenerPedidosPorEstado = async (req, res) => {
  try {
    const { estado } = req.params;
    const pedidos = await PedidoProveedor.find({ estado: estado })
      .populate('proveedor', 'nombre categoria') 
      .populate('responsable', 'nombre correo'); 
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los pedidos del proveedor por ESTADO',
      error,
    });
  }
};

const actualizarPedidoProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoProveedorActualizado = await PedidoProveedor.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (!pedidoProveedorActualizado) return res.status(404).json({ mensaje: 'Pedido al proveedor no encontrado' });
    res.json(pedidoProveedorActualizado);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el pedido del proveedor', error });
  }
};

const eliminarPedidoProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoPEliminado = await PedidoProveedor.findByIdAndDelete(id);
    if (!pedidoPEliminado) return res.status(404).json({ mensaje: 'Pedido del proveedor no encontrado' });
    res.json({ mensaje: 'Pedido del proveedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el pedido del proveedor', error });
  }
};

export {
  crearPedidoProveedor,
  obtenerPedidosProveedores,
  obtenerPedidoProveedor,
  actualizarPedidoProveedor,
  eliminarPedidoProveedor,
};
