import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Producto",
            required: true,
    },
    cantidad: {
            type: Number,
            required: true,
            min: 1,
    },
});

const carritoSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    items: [itemSchema],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, 
  }
);

const Carrito = mongoose.model("Carrito", carritoSchema);

export default Carrito;
