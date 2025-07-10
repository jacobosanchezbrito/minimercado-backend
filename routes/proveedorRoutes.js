import express from 'express';
import {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedor,
  actualizarProveedor,
  eliminarProveedor,
} from '../controllers/proveedorController.js';
import verificarToken from '../middlewares/verificarToken.js';
import autorizarRoles from '../middlewares/autorizarRoles.js';

const router = express.Router();

// Obtener todos los proveedores → solo Admin o Empleado
router.get('/', verificarToken, autorizarRoles('Administrador', 'Empleado'), obtenerProveedores);

// Crear proveedor → solo Admin o Empleado
router.post('/', verificarToken, autorizarRoles('Administrador', 'Empleado'), crearProveedor);

// Obtener proveedor por ID → solo Admin o Empleado
router.get('/:id', verificarToken, autorizarRoles('Administrador', 'Empleado'), obtenerProveedor);

// Actualizar proveedor → solo Admin o Empleado
router.put('/:id', verificarToken, autorizarRoles('Administrador', 'Empleado'), actualizarProveedor);

// Eliminar proveedor → solo Admin o Empleado
router.delete('/:id', verificarToken, autorizarRoles('Administrador', 'Empleado'), eliminarProveedor);

export default router;
