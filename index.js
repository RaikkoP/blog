//application packages
require("dotenv").config();
const express = require('express');
const db = require('./utils/db');
const session = require('express-session')
const app = express();
const bcrypt = require('bcryptjs');
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

//session id signature
app.use(session({
    secret: bcrypt.genSaltSync(10),
    cookie: {
        maxAge: 30000,
        sameSite: 'strict'
    },
    saveUninitialized: false
}));

//Db connection check
db.connect((err) => {
    if (err) throw err;
    console.log("Connected");
})

//Bodyparser info
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//Routes

const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/author');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');

app.use('/', articleRoutes);
app.use('/article', articleRoutes);
app.use('/author', userRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);



app.listen(3000, () => {
    console.log('listening on port 3000');
})