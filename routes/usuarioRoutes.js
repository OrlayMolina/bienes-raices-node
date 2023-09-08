import express from 'express';
import { formularioLogin, formularioRegistro } from '../controllers/usuarioController.js';

const router = express.Router();

//Routing res.render sirve para imprimir una vista con un template engine
router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro);


export default router;