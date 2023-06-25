import Express from 'express';
import {getDB } from '../../db/db.js';

const rutasVehiculo = Express.Router();

rutasVehiculo.route("/vehiculos").get((req, res) => {
    console.log("Alguien hizo un get en la ruta /vehiculos\n");
    const conexion = getDB();
    conexion
        .collection("vehiculo")
        .find() // Filtros ({ marca: "Mazda" }) trae todos
        .limit(50) // Cantidad de datos que quiero traer (Opcional)
        .toArray((err, result) => {
            if (err) {
                res.status(400).send('Error consultando los vehiculos'); // Enviando un mensaje
            } else {
                res.json(result);
            }
        });
});

rutasVehiculo.route("/vehiculos/nuevo").post((req, res) => {
    const datosVehiculo = req.body;
    console.log("Llaves: ", Object.keys(datosVehiculo));
    const conexion = getDB();
    try {
        if (Object.keys(datosVehiculo).includes("nombre") &&
            Object.keys(datosVehiculo).includes("marca") &&
            Object.keys(datosVehiculo).includes("modelo")) {
            // Crear vehiculo den la BD
            conexion.collection('vehiculo').insertOne(datosVehiculo, (err, result) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            })

        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

rutasVehiculo.route('/vehiculos/editar').patch((req, res) => {
    const edicion = req.body;
    const filtroVehiculo = { _id: new ObjectId(edicion.id) };
    delete edicion.id; // Siempre se debe eliminar el id enviado por el body para que no se duplique en la BBDD al actualizar el elemento
    const operacion = {
        $set: edicion,    // Operación atomica
    }
    const conexion = getDB();
    conexion.collection('vehiculo').findOneAndUpdate(filtroVehiculo, operacion, { upsert: true, returnOriginal: true }, (err, result) => {
        if (err) {
            console.error("Error actualizando el vehiculo: ", err);
            res.sendStatus(500);
        } else {
            console.log("Actualizado con exito");
            res.sendStatus(200);
        }
    }); // upsert: true (actualiza el elemento)
});

rutasVehiculo.route('/vehiculos/eliminar').delete((req, res) => {
    const filtroVehiculo = { _id: new ObjectId(req.body.id) };
    const conexion = getDB();
    conexion.collection('vehiculo').deleteOne(filtroVehiculo, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    })
})

export default rutasVehiculo;