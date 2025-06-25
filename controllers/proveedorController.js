import Proveedor from '../models/Proveedor.js'

const crearProveedor = async (req, res) => {
    try {
        const nuevoProveedor = new Proveedor(req.body);
        const proveedorGuardado = await nuevoProveedor.save();
        res.status(201).json(proveedorGuardado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el proveedor', error});
    }
};

//Obtener todos los proveedores.
const obtenerProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los proveedores', error})
    }
};

//Obtener un proveedor por su ID
const obtenerProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const proveedor = await Proveedor.findById(id);
        const productosDelProveedor = await Producto.find({ proveedor: id });
        if (!proveedor) return res.status(404).json({ mensaje: 'Proveedor no encontrado' })
        res.json({
            proveedor,
            productos: productosDelProveedor,
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el proveedor especificado', error})
    }
};

const actualizarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const proveedorActualizado = await Proveedor.findByIdAndUpdate(id, req.body, {
            new:true,
        });
        if (!proveedorActualizado) return req.status(400).json({ mensaje: 'Proveedor a actualizar no encontrado', error });
        res.json(proveedorActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el proveedor', error})
    }
};

const eliminarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const proveedorEliminado = await Proveedor.findByIdAndDelete(id);
        if (!proveedorEliminado) return res.status(404).json({ mensaje: 'Proveedor a eliminar no encontrado', error });
        res.json({ mensaje: 'Proveedor eliminado satisfactoriamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el proveedor', error});
    }
};

export {
    crearProveedor,
    obtenerProveedores,
    obtenerProveedor,
    actualizarProveedor,
    eliminarProveedor,
};