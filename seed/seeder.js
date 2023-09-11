import { exit } from 'node:process'
import categorias from './categorias.js'
import precios from './precios.js'
import usuarios from './usuarios.js'
import db from '../config/db.js'
import { Categoria, Precio, Usuario } from '../models/index.js'


const importarDatos = async () => {
    try {
        //Autenticar db
        await db.authenticate();

        //Generar Columnas
        await db.sync()

        //Insertamos los datos

        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios)
        ])

        console.log('Datos importados Correctamente')
        exit()

    }catch(error){
        console.log(error)
        exit(1) // Terminar los proceso
    }
}

const eliminarDatos = async () => {
    try {

        await db.sync({force: true})
        console.log('Datos eliminados Correctamente'),
        exit()

    }catch(error){
        console.log(error)
        exit(1) // Terminar los proceso
    }
}

if(process.argv[2] === '-i'){
    importarDatos();
}

if(process.argv[2] === '-e'){
    eliminarDatos();
}