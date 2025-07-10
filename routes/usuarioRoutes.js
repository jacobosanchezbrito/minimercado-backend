import express from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../controllers/usuarioController.js';
import verificarToken from '../middlewares/verificarToken.js';
import autorizarRoles from '../middlewares/autorizarRoles.js';

const router = express.Router();

// Crear un usuario (Registro) — público
router.post('/', crearUsuario);

// Obtener todos los usuarios — solo Admin
router.get('/', verificarToken, autorizarRoles('Administrador'), obtenerUsuarios);

// Obtener un usuario por ID — solo Admin o el propio usuario (esto lo puedes mejorar después)
router.get('/:id', verificarToken, autorizarRoles('Administrador'), obtenerUsuario);

// Actualizar un usuario — solo Admin
router.put('/:id', verificarToken, autorizarRoles('Administrador'), actualizarUsuario);

// Eliminar un usuario — solo Admin
router.delete('/:id', verificarToken, autorizarRoles('Administrador'), eliminarUsuario);

export default router;
