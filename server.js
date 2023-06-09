import Express from 'express';
import Cors from 'cors';
import { conectarBD} from './db/db.js';
import rutasVehiculo from './views/vehiculos/rutas.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasVenta from './views/ventas/rutas.js';

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVehiculo);
app.use(rutasUsuario);
app.use(rutasVenta);


const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`Escuchando en el puerto ${process.env.PORT}`);
    });
}

conectarBD(main);

