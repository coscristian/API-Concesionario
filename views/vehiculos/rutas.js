import Express from 'express';
import { consultarVehiculo, crearVehiculo, editarVehiculo, eliminarVehiculo, queryAllVehicles } from '../../controllers/vehiculos/controller.js';

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
    queryAllVehicles(genericCallback(res));
});

rutasVehiculo.route("/vehiculos/:id").get((req, res) => {
    consultarVehiculo(req.params.id, genericCallback(res));
});

rutasVehiculo.route("/vehiculos").post((req, res) => {
    crearVehiculo(req.body, genericCallback(res));
});

rutasVehiculo.route('/vehiculos/:id').patch((req, res) => {
    editarVehiculo(req.params.id, req.body, genericCallback(res));
});

rutasVehiculo.route('/vehiculos/:id').delete((req, res) => {
    eliminarVehiculo(req.params.id, genericCallback(res));
})

export default rutasVehiculo;