import express from 'express';

const router = express.Router();

//Routing res.render sirve para imprimir una vista con un template engine
router.get('/login', (req, res) => {
    res.render('auth/login', {
        autenticado: false,
    });
});


export default router;