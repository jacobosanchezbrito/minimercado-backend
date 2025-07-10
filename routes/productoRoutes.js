import express from 'express';
import {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productoController.js';
import verificarToken from '../middlewares/verificarToken.js';
import autorizarRoles from '../middlewares/autorizarRoles.js';

const router = express.Router();

// GET productos → cualquier usuario logueado puede ver productos
router.get('/', verificarToken, obtenerProductos);

// POST crear producto → solo Admin o Empleado
router.post('/', verificarToken, autorizarRoles('Administrador', 'Empleado'), crearProducto);

// GET producto por ID → usuarios logueados
router.get('/:id', verificarToken, obtenerProducto);

// PUT actualizar producto → solo Admin o Empleado
router.put('/:id', verificarToken, autorizarRoles('Administrador', 'Empleado'), actualizarProducto);

// DELETE eliminar producto → solo Admin o Empleado
router.delete('/:id', verificarToken, autorizarRoles('Administrador', 'Empleado'), eliminarProducto);

export default router;
