//application packages
const express = require('express');

const app = express();
//template engine
const hbs = require('express-handlebars');

const path = require('path');

//template engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    }))
//setup static public directory
app.use(express.static('public'));

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

db.connect((err) => {
    if (err) throw err;
    console.log("Connected");
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM article";
    let articles = [];
    db.query(sql, (err, data) => {
        if (err) throw err;
        articles = data;
        res.render('index', { 
            articles: articles 
        });
    })
});


app.listen(3000, () => {
    console.log('listening on port 3000');
})