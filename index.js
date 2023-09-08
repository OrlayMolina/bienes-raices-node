//const express = require('express'); //CommonJS

import express from 'express'; //ECMAScript6 forma de importar dependencia de forma nativa a Javascript
import usuarioRoutes from './routes/usuarioRoutes.js'; //archivos creados requiere la extension .js

//crear app
const app = express();

//Habilitar Pug
app.set('view engine', 'pug') // set agrega config
app.set('views', './views')


app.use('/auth', usuarioRoutes); //usuarioRoutes es la funcion no es necesario agregar ().


//Definir un puerto y arrancar el proyecto
const port = 3000;  

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el ${port}`);
});