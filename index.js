//const express = require('express'); //CommonJS

import express from 'express'; //ECMAScript6 forma de importar dependencia de forma nativa a Javascript
import usuarioRoutes from './routes/usuarioRoutes.js'; //archivos creados requiere la extension .js
import db from './config/db.js';

//crear app
const app = express();

// Habilitar lectura de datos de formulario 
app.use( express.urlencoded({extended: true}))

//Conexión a la base de datos
try {

    await db.authenticate();
    db.sync();
    console.log('Conexión correcta a la base de datos.')

}catch (error) {

    console.log('Error '.error)
}

//Habilitar Pug
app.set('view engine', 'pug') // set agrega config
app.set('views', './views')

//Carpeta Pública
app.use( express.static('public'));


app.use('/auth', usuarioRoutes); //usuarioRoutes es la funcion no es necesario agregar ().


//Definir un puerto y arrancar el proyecto
const port = 3000;  

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el ${port}`);
});