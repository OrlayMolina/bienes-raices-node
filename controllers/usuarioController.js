import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión',
    });
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear cuenta',
    });
}

const registrar = async (req, res) => {

    // Validaciones
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('El correo es invalido').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El password es incorrecto, debe contener más de 6 carácteres').run(req)
    await check('repetir_password').equals('password').withMessage('La contraseña no es la misma').run(req)
    let resultado = validationResult(req)

    // Verificar que el resultado este vacío.

    res.json(resultado.array());

    const usuario = await Usuario.create(req.body)

    res.json(usuario)
}

const formularioOlvidePasword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar Cuenta',
    });
}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePasword
}