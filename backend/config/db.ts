const { Sequelize } = require('sequelize')

export const sequelize = new Sequelize(

    'Task',
    'postgres',
    'Abinesh@1728',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: false

    })