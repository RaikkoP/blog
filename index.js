//application packages
const express = require('express');
const app = express();

const path = require('path');

const mysql = require('mysql');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//db connection
const db = mysql.createConnection({
    host: 'd121755.mysql.zonevs.eu',
    user: 'd121755sa461709',
    password: 'Krissuonminu123',
    database: 'd121755_kool',
});

db.connect((err, res) => {
    if (err) throw err;
    console.log("Connected");
})


app.listen(3000, () => {
    console.log('listening on port 3000');
})