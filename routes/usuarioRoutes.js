import express from 'express';

const router = express.Router();

//Routing res.render sirve para imprimir una vista con un template engine
router.get('/', (req, res) => {
    res.json({msg: 'Hola mundo'});
});

router.post('/', (req, res) => {
    res.json({msg: 'Respuesta de tipo POST'});
});

export default router;