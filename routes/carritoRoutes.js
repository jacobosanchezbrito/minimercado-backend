import express from 'express';
import {
  crearCarrito,
  obtenerCarritos,
  obtenerCarritoPorCliente,
  eliminarCarrito,
  agregarProductoAlCarrito,
  quitarProductoDelCarrito
} from '../controllers/carritoController.js';
import verificarToken from '../middlewares/verificarToken.js';
import autorizarRoles from '../middlewares/autorizarRoles.js';

const router = express.Router();

// Crear carrito → Solo Cliente logueado
router.post('/', verificarToken, autorizarRoles('Cliente'), crearCarrito);

// Ver todos los carritos → Solo Admin (control total)
router.get('/', verificarToken, autorizarRoles('Administrador'), obtenerCarritos);

// Ver carrito por ID → Cliente o Admin
router.get('/:id', verificarToken, autorizarRoles('Cliente', 'Administrador'), obtenerCarritoPorCliente);

// Ver carrito por Cliente ID → Cliente o Admin
router.get('/cliente/:clienteId', verificarToken, autorizarRoles('Cliente', 'Administrador'), obtenerCarritoPorCliente);

// Eliminar carrito → Cliente o Admin
router.delete('/:id', verificarToken, autorizarRoles('Cliente', 'Administrador'), eliminarCarrito);

// Agregar producto al carrito → Solo Cliente logueado
router.post('/agregar', verificarToken, autorizarRoles('Cliente'), agregarProductoAlCarrito);

// Quitar producto del carrito → Solo Cliente logueado
router.delete('/:carritoId/producto/:productoId', verificarToken, autorizarRoles('Cliente'), quitarProductoDelCarrito);

export default router;
