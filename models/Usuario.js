import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    correo: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Correo no válido'],
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        enum: ['Empleado', 'Administrador', 'Cliente'],
    },
    cargo: {
        type: String,
        enum: ['Gerente', 'Jefe de bodega', 'Auxiliar de bodega', 'Domiciliario'],
    },
    direccion: {
        type: String,
        trim: true,
        maxlength: 200,
    },
    telefono: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Número de teléfono no válido'],
    },
  },
  {
      timestamps: true, 
  }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
