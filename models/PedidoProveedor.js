import mongoose from "mongoose";

const pedidoProveedorSchema = new mongoose.Schema(
  {
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proveedor",
        required: true,
    },
    responsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    listaProductos: [
      {
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Producto",
            required: true,
        },
        cantidadSolicitada: {
            type: Number,
            required: true,
            min: 1,
        },
      },
    ],
    estado: {
        type: String,
        enum: ["Pendiente", "Recibido", "Cancelado", "Rechazado"],
        default: "Pendiente",
    },
    observaciones: {
        type: String,
        trim: true,
        maxlength: 200,
    },
  },
  {
        timestamps: true,
  }
);

const PedidoProveedor = mongoose.model("PedidoProveedor", pedidoProveedorSchema);

export default PedidoProveedor;
