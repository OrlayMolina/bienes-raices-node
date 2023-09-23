import Propiedad from './Propiedad.js'
import Precio from './Precio.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'
import Mensaje from './Mensaje.js'

Precio.hasOne(Propiedad) //Relación 1x1

Propiedad.belongsTo(Precio, { foreignKey: 'precioId'}) //Relación 1x1
Propiedad.belongsTo(Categoria, { foreignKey: 'categoriaId'}) //Relación 1x1
Propiedad.belongsTo(Usuario, { foreignKey: 'usuarioId'}) //Relación 1x1

Mensaje.belongsTo(Propiedad, { foreignKey: 'propiedadId'})
Mensaje.belongsTo(Usuario, { foreignKey: 'usuarioId'})

export {
    Propiedad,
    Precio,
    Categoria,
    Usuario,
    Mensaje
}