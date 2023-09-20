const mysql = require('mysql');
//db connection
const db = mysql.createConnection({
    host: 'd121755.mysql.zonevs.eu',
    user: 'd121755_raikko',
    password: 'MaOlenLahe123',
    database: 'd121755_kool',
});

module.exports = db;
