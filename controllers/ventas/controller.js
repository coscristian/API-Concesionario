import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllSales = async (callback) => {
    const conexion = getDB();
    await conexion
        .collection("Venta")
        .find() // Filtros ({ marca: "Mazda" }) trae todos
        .limit(50) // Cantidad de datos que quiero traer (Opcional)
        .toArray(callback);
}

const crearVenta = async (datosVenta, callback) => {
    const conexion = getDB();
    await conexion.collection('Venta').insertOne(datosVenta, callback)
}

const consultarVenta = async (id, callback) => {
    const conexion = getDB();
    await conexion
        .collection("Venta")
        .findOne({ _id: new ObjectId(id) }, callback);
}

const editarVenta = async (id, edicion, callback) => {
    const filtroVenta = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,    // Operación atomica
    }
    const conexion = getDB();
    await conexion.collection('Venta').findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback); // upsert: true (actualiza el elemento)
}

const eliminarVenta = async (id, callback) => {
    const filtroVenta = { _id: new ObjectId(id) };
    const conexion = getDB();
    conexion.collection('Venta').deleteOne(filtroVenta, callback);
}

export { queryAllSales, crearVenta, editarVenta, eliminarVenta, consultarVenta };