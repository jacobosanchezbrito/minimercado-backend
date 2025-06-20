import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    estado: {
      type: String,
      enum: ['Exhibido', 'Bodega', 'Cambio'],
      default: 'Exhibido',
    },
    fecha_vencimiento: {
      type: Date,
    },
    ubicacion: {
      type: String,
      enum: ['Estantería', 'Nevera', 'Bodega'],
    },
    categoria: {
      type: String,
      required: true,
    },
    proveedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proveedor',
      required: true,
    },
    imagen: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;
