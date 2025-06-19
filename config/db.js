/*
    Conexion a la base de datos en MongoDB mediante Mongoose.
    biblioteca de modelado de datos de objetos (ODM) para MongoDB y Node.js
*/

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;

