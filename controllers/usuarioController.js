import Usuario from '../models/Usuario.js';

const crearUsuario = async (req, res) => {
  try {
    const existe = await Usuario.findOne({ correo: req.body.correo });
    if (existe) {
        return res.status(400).json({ mensaje: 'El correo se encuentra actualmente en uso.' });
    }
    const nuevoUsuario = new Usuario(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el nuevo usuario :(', error });
  }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener todos los usuarios', error });
  }
};

// Obtener un solo usuario por ID
const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el usuario por su ID', error });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const existe = await Usuario.findOne({ correo: req.body.correo });
    if (existe && existe._id.toString() !== id) {
        return res.status(400).json({ mensaje: 'El nuevo correo se encuentra actualmente en uso.' });
    }
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (!usuarioActualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuarioActualizado);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario', error });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario', error });
  }
};

export {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
