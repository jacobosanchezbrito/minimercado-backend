import express from 'express';
import { crearVenta, obtenerVentas, obtenerVentaPorId } from '../controllers/ventaController.js';

const router = express.Router();

router.post('/', crearVenta);
router.get('/', obtenerVentas);
router.get('/:id', obtenerVentaPorId);

export default router;
