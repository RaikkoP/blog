const mysql = require('mysql');
//db connection
const db = mysql.createConnection({
    host: 'd121755.mysql.zonevs.eu',
    user: 'd121755sa461709',
    password: 'Krissuonminu123',
    database: 'd121755_kool',
});

module.exports = db;
