import express from 'express';

const router = express.Router();

//Routing res.render sirve para imprimir una vista con un template engine
app.get('/', (req, res)=>{
    res.json({msg: 'Hola mundo'});
});

app.get('/nosotros', (req, res)=>{
    res.send('Infromación de nosotros');
});