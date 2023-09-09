import express from 'express';
import { formularioLogin, formularioRegistro, formularioOlvidePasword } from '../controllers/usuarioController.js';

const router = express.Router();

//Routing res.render sirve para imprimir una vista con un template engine
router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro);
router.get('/olvide-password', formularioOlvidePasword);


export default router;