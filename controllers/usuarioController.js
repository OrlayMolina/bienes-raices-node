import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import { generarId } from '../helpers/token.js'
import { emaillRegistro, emailOlvidePassword } from '../helpers/emails.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión',
    });
}

const formularioRegistro = (req, res) => {


    res.render('auth/registro', {
        pagina: 'Crear cuenta',
        csrfToken: req.csrfToken()
    });
}

const registrar = async (req, res) => {

    // Validaciones
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('El correo es invalido').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El password es incorrecto, debe contener más de 6 caracteres').run(req);
    await check('repetir_password').equals(req.body.password).withMessage('La contraseña no es la misma').run(req);


    let resultado = validationResult(req)


    // Verificar que el resultado este vacío.
    if(!resultado.isEmpty()){
        // Hay errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
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
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El usuario ya esta Registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }


    // Almacenar un usuario 
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })

    //Confirmar email de registro
    emaillRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token    
    })

    //Mostrar mensaje de confirmación
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos Enviado un Email de Confirmación'
    })

}

// Función que comprueba la cuenta
const confirmar = async (req, res, next) => {

    const { token } = req.params;

    // Verificar si el token es valido 
    const usuario = await Usuario.findOne({ where : { token }})
    if(!usuario){
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar Cuenta',
            mensaje: 'Hubo un error al confirmar tu Cuenta, intenta de nuevo',
            error: true
        })
    }

    //Confirmar cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La Cuenta se confirmó Correctamente'  
    })
    
}

const formularioOlvidePasword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera el acceso a Bienes Raices',
        csrfToken: req.csrfToken(),
    });
}

const resetPassword = async (req, res) => {
    //Validacion
    await check('email').isEmail().withMessage('El correo es invalido').run(req)
    
    let resultado = validationResult(req)


    // Verificar que el resultado este vacío.
    if(!resultado.isEmpty()){
        // Hay errores
        return res.render('auth/olvide-password', {
            pagina: 'Recupera el acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        });
    }

    //Buscar el usuario

    const { email } = req.body

    const usuario = await Usuario.findOne( { where : { email } } )

    if(!usuario){
        return res.render('auth/olvide-password', {
            pagina: 'Recupera el acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El email no pertenece a ningún usuario'}]
        });
    }

    // Generar un token y enviar email
    usuario.token = generarId();
    await usuario.save();

    // Enviar un email
    emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    })


    // Renderizar un mensaje al usuario para que revise la bandeja
    res.render('templates/mensaje', {
        pagina: 'Reestablece tu Password',
        mensaje: 'Hemos Enviado un Email con la instrucciones'
    })
}

const comprobarToken = async (req, res) => {

    const { token } = req.params;

    const usuario = await Usuario.findOne({ where : { token } } )

    if(!usuario){
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Reestablece tu Password',
            mensaje: 'Hubo un error al validar tu información, intenta de nuevo',
            error: true       
        })
    }

}



const nuevoPassword = (req, res) => {
    console.log('Guardando password...')
}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePasword,
    resetPassword,
    comprobarToken,
    nuevoPassword
}