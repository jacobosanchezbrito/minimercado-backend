import mongoose from "mongoose";

const movimientoInventarioSchema = new mongoose.Schema(
    {
        producto:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Producto',
        },
        tipo: {
            type: String,
            enum: ['Entrada', 'Salida'],
        },
        subtipo: {
            type: String,
            enum: [
                'CambioCliente', 'CambioProveedor', 
                'PedidoRecibido', 'Perdida', 'Venta'
            ],
        },
        cantidad: {
            type: Number,
            required: true,
            min: 0,
        },
        detalle: {
            type: String,
            maxlength: 100,
            trim: true,
        },
        responsable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
        },
    },

    {
        timestamps: true,
    }
);

const MovimientoInventario = mongoose.model('MovimientoInventario', movimientoInventarioSchema);

export default MovimientoInventario;
