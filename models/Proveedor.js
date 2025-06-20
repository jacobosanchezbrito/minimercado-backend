import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        correo: {
            type: String,
            trim: true,
        },
        telefono: {
            type: Number,
            required: true,
        },
        categoria: {
            type: String,
            enum: [
                'Bebidas', 'Licor', 'Cigarrillos', 
                'Dulces', 'Farmacia', 'Carnes frias', 
                'Lacteos', 'Alimentos refrigerados', 
                'Aseo', 'Basica canasta familiar', 
                'Mascostas', 'Varios/Otros'],
            default: 'Varios/Otros',
        },
        productos: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Producto',
            }
        ],
    },
    {
        timestamps: true,
    }
);

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

export default Proveedor;
