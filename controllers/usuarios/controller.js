import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllUsers = async (callback) => {
    const conexion = getDB();
    await conexion
        .collection("Usuario")
        .find() // Filtros ({ marca: "Mazda" }) trae todos
        .limit(50) // Cantidad de datos que quiero traer (Opcional)
        .toArray(callback);
}

const crearUsuario = async (datosUsuario, callback) => {
    const conexion = getDB();
    await conexion.collection('Usuario').insertOne(datosUsuario, callback)
}

const consultarUsuario = async (id, callback) => {
    const conexion = getDB();
    await conexion
        .collection("Usuario")
        .findOne({ _id: new ObjectId(id) }, callback);
}

const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,    // Operación atomica
    }
    const conexion = getDB();
    await conexion.collection('Usuario').findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback); // upsert: true (actualiza el elemento)
}

const eliminarUsuario = async (id, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const conexion = getDB();
    conexion.collection('Usuario').deleteOne(filtroUsuario, callback);
}

export { queryAllUsers, crearUsuario, editarUsuario, eliminarUsuario, consultarUsuario };