import Express from 'express';
import { consultarVenta, crearVenta, editarVenta, eliminarVenta, queryAllSales } from '../../controllers/ventas/controller.js';

const rutasVenta = Express.Router();

const genericCallback = (res) => {
    return (err, result) => {
        if (err) {
            res.status(400).send('Error consultando los Ventas'); // Enviando un mensaje
        } else {
            res.json(result);
        }
    }
}
/**
 * Es igual al genericCallback de arriba
 * const genericCallback = (res) => (err, result) => {
        if (err) {
            res.status(400).send('Error consultando los Ventas'); // Enviando un mensaje
        } else {
            res.json(result);
        }
    }
 */

rutasVenta.route("/ventas").get((req, res) => {
    queryAllSales(genericCallback(res));
});

rutasVenta.route("/ventas/:id").get((req, res) => {
    consultarVenta(req.params.id, genericCallback(res));
});

rutasVenta.route("/ventas").post((req, res) => {
    crearVenta(req.body, genericCallback(res));
});

rutasVenta.route('/ventas/:id').patch((req, res) => {
    editarVenta(req.params.id, req.body, genericCallback(res));
});

rutasVenta.route('/ventas/:id').delete((req, res) => {
    eliminarVenta(req.params.id, genericCallback(res));
})

export default rutasVenta;