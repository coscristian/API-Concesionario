import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllVehicles = async (callback) => {
    const conexion = getDB();
    await conexion
        .collection("vehiculo")
        .find() // Filtros ({ marca: "Mazda" }) trae todos
        .limit(50) // Cantidad de datos que quiero traer (Opcional)
        .toArray(callback);
}

const crearVehiculo = async (datosVehiculo, callback) => {
    //console.log("Llaves: ", Object.keys(datosVehiculo));
    const conexion = getDB();
    
    if (Object.keys(datosVehiculo).includes("nombre") &&
        Object.keys(datosVehiculo).includes("marca") &&
        Object.keys(datosVehiculo).includes("modelo")) {
        // Crear vehiculo den la BD
        await conexion.collection('vehiculo').insertOne(datosVehiculo, callback)
    } else {
        //res.sendStatus(500);
        return 'error';
    }
}

const editarVehiculo = async (id, edicion, callback) => {
    const filtroVehiculo = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,    // Operación atomica
    }
    const conexion = getDB();
    await conexion.collection('vehiculo').findOneAndUpdate(filtroVehiculo, operacion, { upsert: true, returnOriginal: true }, callback); // upsert: true (actualiza el elemento)
}

const eliminarVehiculo = async (id, callback) => {
    const filtroVehiculo = { _id: new ObjectId(id) };
    const conexion = getDB();
    conexion.collection('vehiculo').deleteOne(filtroVehiculo, callback);
}

export { queryAllVehicles, crearVehiculo, editarVehiculo, eliminarVehiculo };