import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema(
  {
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 75,
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: 250,
    },
    precio: {
        type: Number,
        required: true,
        min: 0.0,
        default: 77,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
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
            enum: [
                'Bebidas', 'Licor', 'Cigarrillos', 
                'Dulces', 'Farmacia', 'Carnes frias', 
                'Lacteos', 'Alimentos refrigerados', 
                'Aseo', 'Basica canasta familiar', 
                'Mascostas', 'Varios/Otros', 'Por definir'],
            default: 'Por definir',
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
