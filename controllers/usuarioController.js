import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import { generarId } from '../helpers/token.js'

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
    await check('password').isLength({ min: 6 }).withMessage('El password es incorrecto, debe contener más de 6 caracteres').run(req);
    await check('repetir_password').equals('password').withMessage('La contraseña no es la misma').run(req);

    let resultado = validationResult(req)


    // Verificar que el resultado este vacío.
    if(!resultado.isEmpty()){
        // Hay errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }

    // Extraer los datos
    const { nombre, email, password} = req.body

    //Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne( { where : { email: email } } )
    if(existeUsuario){
            return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: [{msg: 'El usuario ya esta Registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }


    // Almacenar un usuario 
    await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })

    //Mostrar mensaje de confirmación
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos Enviado un Email de Confirmación'
    })

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