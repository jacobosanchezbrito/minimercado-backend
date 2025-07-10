import express from 'express';
import {
  crearCarrito,
  obtenerCarritos,
  obtenerCarritoPorCliente,
  eliminarCarrito,
  agregarProductoAlCarrito,
  quitarProductoDelCarrito
} from '../controllers/carritoController.js';

const router = express.Router();

router.post('/', crearCarrito);
router.get('/', obtenerCarritos);
router.get('/:id', obtenerCarritoPorCliente);
router.get('/cliente/:clienteId', obtenerCarritoPorCliente);
router.delete('/:id', eliminarCarrito);
router.post('/agregar', agregarProductoAlCarrito);
router.delete('/:carritoId/producto/:productoId', quitarProductoDelCarrito);

export default router;
