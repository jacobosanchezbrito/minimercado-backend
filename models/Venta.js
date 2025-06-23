import mongoose from "mongoose";

const detalleProductoSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },
    precio_unitario: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false } // No genera un _id para cada detalle, ya que no es necesario
);

const ventaSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    productos: [detalleProductoSchema], // Embebido aquí como subdocumento

    metodo_pago: {
      type: String,
      enum: ['MercadoPago', 'Upay', 'Otro'],
      required: true,
    },
    estado: {
      type: String,
      enum: ['Pendiente', 'Pagado', 'Rechazado'],
      default: 'Pendiente',
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    responsable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario', // Por si un empleado revisa, procesa o valida
    },
  },
  {
    timestamps: true, 
  }
);

const Venta = mongoose.model('Venta', ventaSchema);

export default Venta;
