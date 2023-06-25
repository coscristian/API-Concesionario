import Express from 'express';
import { consultarUsuario, crearUsuario, editarUsuario, eliminarUsuario, queryAllUsers } from '../../controllers/usuarios/controller.js';

const rutasUsuario = Express.Router();

const genericCallback = (res) => {
    return (err, result) => {
        if (err) {
            res.status(400).send('Error consultando los Usuarios'); // Enviando un mensaje
        } else {
            res.json(result);
        }
    }
}
/**
 * Es igual al genericCallback de arriba
 * const genericCallback = (res) => (err, result) => {
        if (err) {
            res.status(400).send('Error consultando los Usuarios'); // Enviando un mensaje
        } else {
            res.json(result);
        }
    }
 */

rutasUsuario.route("/usuarios").get((req, res) => {
    queryAllUsers(genericCallback(res));
});

rutasUsuario.route("/usuarios/:id").get((req, res) => {
    consultarUsuario(req.params.id, genericCallback(res));
});

rutasUsuario.route("/usuarios").post((req, res) => {
    crearUsuario(req.body, genericCallback(res));
});

rutasUsuario.route('/usuarios/:id').patch((req, res) => {
    editarUsuario(req.params.id, req.body, genericCallback(res));
});

rutasUsuario.route('/usuarios/:id').delete((req, res) => {
    eliminarUsuario(req.params.id, genericCallback(res));
})

export default rutasUsuario;