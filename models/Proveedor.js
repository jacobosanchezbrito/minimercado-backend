import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        correo: {
            type: String,
            trim: true,
        },
        telefono: {
            type: Number,
            required: true,
            match: [/^\d{10}$/, 'Número de teléfono no válido'],
        },
        categoria: {
            type: String,
            enum: [
                'Bebidas', 'Licor', 'Cigarrillos', 
                'Dulces', 'Farmacia', 'Carnes frias', 
                'Lacteos', 'Alimentos refrigerados', 
                'Aseo', 'Basica canasta familiar', 
                'Mascostas', 'Varios/Otros', 'Por definir'],
            default: 'Varios/Otros',
        },
    },
    {
        timestamps: true,
    }
);

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

export default Proveedor;
