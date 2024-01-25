const Sequelize = require("sequelize");

const sequalize = new Sequelize('d121755_kool', 'd121755_raikko', 'MaOlenLahe123', {
    host: 'd121755.mysql.zonevs.eu',
    dialect: 'mysql',
});

module.exports = sequalize;