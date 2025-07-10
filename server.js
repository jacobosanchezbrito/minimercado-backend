/*
    Aqui se crea el servidor web
    Carga las rutas
    Conexion a la base de datos en Mongo
    Arrancer del servidor en un puerto.
*/

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productoRoutes from './routes/productoRoutes.js';
import proveedorRoutes from './routes/proveedorRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import pedidoProveedorRoutes from './routes/pedidoProveedorRoutes.js';
import carritoRoutes from './routes/carritoRoutes.js';
import ventaRoutes from './routes/ventaRoutes.js';
import movimientoInventarioRoutes from './routes/movimientoInventarioRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Crear la app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // para recibir JSON

// Rutas (más adelante las cargamos aquí)
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pedidoProveedor', pedidoProveedorRoutes);
app.use('/api/carritos', carritoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/movimientos', movimientoInventarioRoutes);

// Ruta simple de prueba
app.get("/", (req, res) => {
  res.send("API funcionando...");
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend funcionando en puerto ${PORT}`);
});
