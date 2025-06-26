import express from 'express';
import {
  crearPedidoProveedor,
  obtenerPedidosProveedores,
  obtenerPedidoProveedor,
  actualizarPedidoProveedor,
  eliminarPedidoProveedor,
} from '../controllers/pedidoProveedorController.js';

const router = express.Router();

router.route('/')
  .post(crearPedidoProveedor)
  .get(obtenerPedidosProveedores);

router.route('/:id')
  .get(obtenerPedidoProveedor)
  .put(actualizarPedidoProveedor)
  .delete(eliminarPedidoProveedor);

  // Rutas de filtros adicionales
router.get('/proveedor/:id', obtenerPedidosPorProveedor);
router.get('/responsable/:id', obtenerPedidosPorResponsable);
router.get('/estado/:estado', obtenerPedidosPorEstado);

export default router;
