import { unlink } from 'node:fs/promises'
import { validationResult } from 'express-validator'
import { Precio, Categoria, Propiedad } from '../models/index.js'

const admin = async (req, res) => {

    // Leer QueryString

    const { pagina: paginaActual } = req.query
    
    //Expresión regular
    const expression = /^[0-9]$/ // Valida que solo sea numeros

    if(!expression.test(paginaActual)){
        return res.redirect('/mis-propiedades?pagina=1')
    }

    try {
        const { id } = req.usuario;

        //Limites y offset para el paginador
        const limit = 4;
        const offset = ((limit * paginaActual) - limit)

        const propiedades = await Propiedad.findAll({
            limit,
            offset,
            where : {
                usuarioId: id
            },
            include: [
                { model: Categoria, as: 'categoria'},
                { model: Precio, as: 'precio'}
            ]
        })

        res.render('propiedades/admin', {
            pagina: 'Mis Propiedades',
            propiedades,
            csrfToken: req.csrfToken()
        })
    }catch(error){
        console.log(error)
    }
}

//Formulario para crear una nueva propiedad
const crear = async (req, res) => {

    //Consultar modelo de precio y categorias
    const [categorias, precios] =  await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/crear', {
        pagina: 'Crear Propiedad',
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {}
    })
}

const guardar = async (req, res) => {

    //Validacion
    let resultado = validationResult(req)

    if(!resultado.isEmpty()){

            //Consultar modelo de precio y categorias
            const [categorias, precios] =  await Promise.all([
            Categoria.findAll(),
            Precio.findAll()

        ])

        return res.render('propiedades/crear', {
            pagina: 'Crear Propiedad',
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
            
        })

    }

    //Crear un registro
    try {

        const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body

        const { id: usuarioId } = req.usuario

        const propiedadGuardada = await Propiedad.create({
            titulo, 
            descripcion, 
            habitaciones, 
            estacionamiento, 
            wc, 
            calle, 
            lat, 
            lng,
            precioId,
            categoriaId,
            usuarioId,
            imagen: ''
        })
        

        const { id } = propiedadGuardada

        res.redirect(`/propiedades/agregar-imagen/${id}`)

    }catch(error){
        console.log(error)
    }
}

const agregarImagen = async (req, res) => {

    const { id } = req.params;

    // validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }

    // validar que la propiedad no este publicada
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades')
    }

    // validar que la propiedad pertenece a quién visita esta página
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect('/mis-propiedades') 
    }
    
    res.render('propiedades/agregar-imagen', {
        pagina: `Agregar Imagen:  ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        propiedad
    })
}

const almacenarImagen = async (req, res, next) => {

    const { id } = req.params;

    // validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }

    // validar que la propiedad no este publicada
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades')
    }

    // validar que la propiedad pertenece a quién visita esta página
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect('/mis-propiedades') 
    }
    
    try {

        //Almacenar la imagen y publicar la propiedad
        propiedad.imagen = req.file.filename;

        propiedad.publicado = 1;

        await propiedad.save();

        next();

    }catch(error){

        console.log(error);
    }
}

const editar = async (req, res) => {

    const { id } = req.params;

    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad){
        return res.redirect('/mis-propiedades');
    }

    //Quien visita la URL es quien creo la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades');
    }

    //Consultar modelo de precio y categorias
    const [categorias, precios] =  await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/editar', {
        pagina: `Editar Propiedad:  ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: propiedad
    })

}

const guardarCambios = async (req, res) => {

    //Validacion
    let resultado = validationResult(req)

    if(!resultado.isEmpty()){

            //Consultar modelo de precio y categorias
            const [categorias, precios] =  await Promise.all([
            Categoria.findAll(),
            Precio.findAll()

        ])


        return res.render('propiedades/editar', {
            pagina: 'Editar Propiedad',
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        })

    }

    const { id } = req.params;

    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad){
        return res.redirect('/mis-propiedades');
    }

    //Quien visita la URL es quien creo la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades');
    }

    // Reescribir el objeto actualizarlo
    try {

        const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body

        propiedad.set({
            titulo, 
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId
        })

        await propiedad.save();

        res.redirect('/mis-propiedades');

    } catch(error){
        console.log(error)
    }
}

const eliminar = async (req, res) => {

    const { id } = req.params;

    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad){
        return res.redirect('/mis-propiedades');
    }

    //Quien visita la URL es quien creo la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades');
    }

    // Eliminar la imagen
    await unlink(`public/uploads/${propiedad.imagen}`)

    console.log(`Se elimino la imagen ${propiedad.imagen}`)

    // Eliminar propiedad
    await propiedad.destroy()
    res.redirect('/mis-propiedades')

}

const mostrarPropiedad = async (req, res) => {

    const { id } = req.params;

    //Comprobar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id, {
        include: [
            {model: Precio, as: 'precio'},
            {model: Categoria, as: 'categoria'}
        ]
    });

    if(!propiedad){
        res.redirect('/404')
    }

    res.render('propiedades/mostrar', {
        propiedad,
        pagina: propiedad.titulo
    })
}

export {
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar, 
    mostrarPropiedad
}