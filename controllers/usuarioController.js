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

const formularioOlvidePasword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar Cuenta',
    });
}

export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePasword
}