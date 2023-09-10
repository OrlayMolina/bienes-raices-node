import express from 'express';
import { formularioLogin, formularioRegistro, registrar, confirmar, formularioOlvidePasword, resetPassword } from '../controllers/usuarioController.js';

const router = express.Router();

//Routing res.render sirve para imprimir una vista con un template engine
router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

// con la varialbe token leeremos el token del usuario
router.get('/confirmar:token', confirmar);

router.get('/olvide-password', formularioOlvidePasword);
router.post('/olvide-password', resetPassword);


export default router;