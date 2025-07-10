import express from 'express';
import { crearVenta, obtenerVentas, obtenerVentaPorId } from '../controllers/ventaController.js';
import verificarToken from '../middlewares/verificarToken.js';
import autorizarRoles from '../middlewares/autorizarRoles.js';

const router = express.Router();

// Crear venta → Admin o Empleado
router.post('/', verificarToken, autorizarRoles('Administrador', 'Empleado'), crearVenta);

// Obtener todas las ventas → Solo Admin
router.get('/', verificarToken, autorizarRoles('Administrador'), obtenerVentas);

// Obtener venta por ID → Admin o Empleado
router.get('/:id', verificarToken, autorizarRoles('Administrador', 'Empleado'), obtenerVentaPorId);

export default router;
