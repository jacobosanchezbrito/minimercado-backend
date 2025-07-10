import express from 'express';
import { 
  crearMovimientoInventario, 
  obtenerMovimientosInventario, 
  obtenerMovimientoPorId 
} from '../controllers/movimientoInventarioController.js';
import verificarToken from '../middlewares/verificarToken.js';
import autorizarRoles from '../middlewares/autorizarRoles.js';

const router = express.Router();

// Crear movimiento → Solo Administrador o Empleado autorizado
router.post('/', verificarToken, autorizarRoles('Administrador', 'Empleado'), crearMovimientoInventario);

// Obtener todos los movimientos → Solo Administrador o Empleado autorizado
router.get('/', verificarToken, autorizarRoles('Administrador', 'Empleado'), obtenerMovimientosInventario);

// Obtener un movimiento específico por ID → Solo Administrador o Empleado autorizado
router.get('/:id', verificarToken, autorizarRoles('Administrador', 'Empleado'), obtenerMovimientoPorId);

export default router;
