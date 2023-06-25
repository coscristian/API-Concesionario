import Express from 'express';
import { crearVehiculo, editarVehiculo, eliminarVehiculo, queryAllVehicles } from '../../controllers/vehiculos/controller.js';

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
    editarVehiculo(req.body, genericCallback(res));
});

rutasVehiculo.route('/vehiculos/eliminar').delete((req, res) => {
    eliminarVehiculo(req.body.id, genericCallback(res));
})

export default rutasVehiculo;