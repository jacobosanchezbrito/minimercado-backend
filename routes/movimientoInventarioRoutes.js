import express from 'express';
import { crearMovimientoInventario, obtenerMovimientosInventario, obtenerMovimientoPorId } from '../controllers/movimientoInventarioController.js';

const router = express.Router();

router.post('/', crearMovimientoInventario);
router.get('/', obtenerMovimientosInventario);
router.get('/:id', obtenerMovimientoPorId);

export default router;
