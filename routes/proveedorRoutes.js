import express from 'express';
import {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedor,
  actualizarProveedor,
  eliminarProveedor,
} from '../controllers/proveedorController.js';

const router = express.Router();

router.route('/')
  .post(crearProveedor)
  .get(obtenerProveedores);

router.route('/:id')
  .get(obtenerProducto)
  .put(actualizarProveedor)
  .delete(eliminarProveedor);

export default router;
