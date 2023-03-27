//Hacer el import de express
// Forma tradicional
//const express = require('express');
// Forma nueva
import Express from "express";

/* Notas
    Instalar nodemon-> yarn add -D nodemon para actualización automatica del servidor
    * Todas las peticiones que se hacen a traves de un navegador son de tipo get
*/

const app = Express();
// Cuando llegue una solicitud debe pasar por los 'use'
// Cuando llega una solicitud de tipo JSON convierte el body del request en un objeto utilizable
app.use(Express.json());

/* Si el console.log se muestra en navegador
    Es un codigo cliente
   Si lo muestra la terminal
    Es un codigo servidor
*/
/* 
    Creación de ruta de tipo lectura
    Parametros: 
    Primer parametro: Ruta a la que se hace la petición
    Segundo parametro: Funcion que se ejecuta cuando se hace una petición a esa ruta
        Cuando se realiza una petición a la ruta se reciben varios parametros en el callback
        Parametros de la callback:
            req: Request (Quien está haciendo la solicitud) 
            res: Respuesta
*/
app.get("/vehiculos", (req, res) => {
  console.log("Alguien hizo petición a /vehiculos... Consultado vehiculos");
  const vehiculos = [
    { nombre: "Corolla", marca: "Toyota", modelo: "2014" },
    { nombre: "Yaris", marca: "Toyota", modelo: "2020" },
    { nombre: "Fiesta", marca: "Ford", modelo: "2013" },
    { nombre: "Corolla", marca: "Toyota", modelo: "2014" },
  ];
  res.send(vehiculos);
});

// Petición de Tipo POST
app.post("/vehiculos/nuevo", (req, res) => {
  // Implementar codigo para crear vehiculo en la BD
  const datosVehiculo = req.body;
  try {
    const haveName = Object.keys(datosVehiculo).includes("name");
    const haveBrand = Object.keys(datosVehiculo).includes("brand");
    const haveModel = Object.keys(datosVehiculo).includes("model");

    if (haveName && haveBrand && haveModel) {
      res.sendStatus(200); // Codigo 200: Ok
    } else {
      res.sendStatus(500); // Codigo 500: Error en el servidor = INternal server error
    }
    console.log("Vehiculo a crear ", Object.keys(datosVehiculo));
  } catch (error) {
    res.sendStatus(500);
  }
});

// Empezar a escuchar todas las peticiones que van a llegar por un puerto especifico
// Puerto por defecto en React: 3000
app.listen(5000, () => {
  console.log("Escuchando puerto 5000");
});
