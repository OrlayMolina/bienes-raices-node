import express from 'express'
import { body } from 'express-validator'
import { admin, crear, guardar } from '../controllers/propiedadController.js'
import protegerRuta from '../middleware/protegerRuta.js';

const router = express.Router();

router.get('/mis-propiedades', protegerRuta, admin)
router.get('/propiedades/crear', protegerRuta, crear)
router.post('/propiedades/crear', 
    protegerRuta,
    body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio'),
    body('descripcion')
        .notEmpty().withMessage('La descripción de anuncio no puede ser ir vacia')
        .isLength({max:300}).withMessage('La descripción debe ser menor de 300 carácteres'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona un número de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona un número de estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona un número de baños'),
    body('lat').notEmpty().withMessage('Selecciona la ubicación en el mapa'),

    guardar
)

export default router