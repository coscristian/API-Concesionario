import Express from 'express';
import { getDB } from '../../db/db.js';
import { crearVehiculo, queryAllVehicles } from '../../controllers/vehiculos/controller.js';

const rutasVehiculo = Express.Router();

const genericCallback = (res)  => {
    return (err, result) => {
        if (err) {
            res.status(400).send('Error consultando los vehiculos'); // Enviando un mensaje
        } else {
            res.json(result);
        }
    }
}
/**
 * Es igual al genericCallback de arriba
 * const genericCallback = (res) => (err, result) => {
        if (err) {
            res.status(400).send('Error consultando los vehiculos'); // Enviando un mensaje
        } else {
            res.json(result);
        }
    }
 */


rutasVehiculo.route("/vehiculos").get((req, res) => {
    console.log("Alguien hizo un get en la ruta /vehiculos\n");

    queryAllVehicles(genericCallback(res));
});

rutasVehiculo.route("/vehiculos/nuevo").post((req, res) => {
    crearVehiculo(req.body, genericCallback(res));
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