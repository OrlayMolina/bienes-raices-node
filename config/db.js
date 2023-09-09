import Sequelize from 'sequelize'

const db = new Sequelize('bienesraices_node_mvc', 'root', '', {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }, 
    operatorAliases: false
});

export default db;