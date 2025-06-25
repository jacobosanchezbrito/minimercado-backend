import express from 'express';
import {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productoController.js';

const router = express.Router();

router.route('/')
  .post(crearProducto)
  .get(obtenerProductos);

router.route('/:id')
  .get(obtenerProducto)
  .put(actualizarProducto)
  .delete(eliminarProducto);

export default router;
