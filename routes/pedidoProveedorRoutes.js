import express from 'express';
import {
  crearPedidoProveedor,
  obtenerPedidosProveedores,
  obtenerPedidoProveedor,
  actualizarPedidoProveedor,
  eliminarPedidoProveedor,
  obtenerPedidosPorProveedor,
  obtenerPedidosPorResponsable,
  obtenerPedidosPorEstado,
} from '../controllers/pedidoProveedorController.js';

import verificarToken from '../middlewares/verificarToken.js';
import autorizarRoles from '../middlewares/autorizarRoles.js';

const router = express.Router();

// Crear y obtener todos los pedidos → Admin o Empleado autorizado
router.route('/')
  .post(verificarToken, autorizarRoles('Administrador', 'Empleado'), crearPedidoProveedor)
  .get(verificarToken, autorizarRoles('Administrador', 'Empleado'), obtenerPedidosProveedores);

// Obtener, actualizar o eliminar un pedido por ID → Admin o Empleado autorizado
router.route('/:id')
  .get(verificarToken, autorizarRoles('Administrador', 'Empleado'), obtenerPedidoProveedor)
  .put(verificarToken, autorizarRoles('Administrador', 'Empleado'), actualizarPedidoProveedor)
  .delete(verificarToken, autorizarRoles('Administrador'), eliminarPedidoProveedor);

// Filtros adicionales → Admin o Empleado autorizado
router.get('/proveedor/:id', verificarToken, autorizarRoles('Administrador', 'Empleado'), obtenerPedidosPorProveedor);
router.get('/responsable/:id', verificarToken, autorizarRoles('Administrador', 'Empleado'), obtenerPedidosPorResponsable);
router.get('/estado/:estado', verificarToken, autorizarRoles('Administrador', 'Empleado'), obtenerPedidosPorEstado);

export default router;
