//application packages
const express = require('express');
const app = express();

const path = require('path');
//template engine
const hbs = require('express-handlebars');
//template engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))

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