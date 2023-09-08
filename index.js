//const express = require('express'); //CommonJS

import express from 'express'; //ECMAScript6 forma de importar dependencia de forma nativa a Javascript

//crear app
const app = express();




//Definir un puerto y arrancar el proyecto
const port = 3000;  

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el ${port}`);
});