import bcrypt from 'bcrypt'

const usuarios = [

    {
        nombre: 'Juan',
        email: 'juan@hotmail.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    }

]

export default usuarios