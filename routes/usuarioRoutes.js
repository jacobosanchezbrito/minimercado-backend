import express from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../controllers/usuarioController.js';

const router = express.Router();

router.route('/')
  .post(crearUsuario)
  .get(obtenerUsuarios);

router.route('/:id')
  .get(obtenerUsuario)
  .put(actualizarUsuario)
  .delete(eliminarUsuario);

export default router;