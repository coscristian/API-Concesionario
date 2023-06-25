import { getDB } from '../../db/db.js';

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
        conexion.collection('vehiculo').insertOne(datosVehiculo, callback)
    } else {
        //res.sendStatus(500);
        return 'error';
    }
}

export { queryAllVehicles, crearVehiculo };