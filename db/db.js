import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let conexion;

const conectarBD = (callback) => {
    client.connect((err, db) => {
        if (err) {
            console.log("Error conectando a la base de datos");
            return 'error';
        }
        conexion = db.db('concesionario');
        console.log("Conexión exitosa");
        return callback();
    })
}

const getDB = () => {
    return conexion;
}

export { conectarBD, getDB};