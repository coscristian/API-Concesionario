import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import Cors from 'cors';

dotenv.config({path: './.env'});

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let conexion;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get("/vehiculos", (req, res) => {
    console.log("Alguien hizo un get en la ruta /vehiculos\n");
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

app.patch('/vehiculos/editar', (req, res) => {
    const edicion = req.body;
    const filtroVehiculo = { _id: new ObjectId(edicion.id) };
    delete edicion.id; // Siempre se debe eliminar el id enviado por el body para que no se duplique en la BBDD al actualizar el elemento
    const operacion = {
        $set: edicion,    // Operación atomica
    }
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

app.delete('/vehiculos/eliminar', (req, res) => {
    const filtroVehiculo = { _id: new ObjectId(req.body.id) };
    conexion.collection('vehiculo').deleteOne(filtroVehiculo, (err, result) => {
        if(err){
            console.error(err);
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    })
})

app.post("/vehiculos/nuevo", (req, res) => {
    const datosVehiculo = req.body;
    console.log("Llaves: ", Object.keys(datosVehiculo));

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

const main = () => {
    client.connect((err, db) => {
        if (err) {
            console.log("Error conectando a la base de datos");

        }
        conexion = db.db('concesionario');
        console.log("Conexión exitosa");
        return app.listen(process.env.PORT, () => {
            console.log(`Escuchando en el puerto ${process.env.PORT}`);
        });
    })

}

main();

