const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');

const sequelize = new Sequelize(
    "mysql://root:ulSrYqPnVxMZOTjetxKgzYJRhAElIDNQ@roundhouse.proxy.rlwy.net:44997/railway"
    , {
        dialectModule: mysql2,
    }
);

// const sequelize = new Sequelize({
//     database: 'eduworkxsequelize',
//     host: 'localhost',
//     username: 'root',
//     password: 'root',
//     dialect: 'mysql',
// });


(async () => { // IIFE trik untuk menjalankan pertama kali
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;