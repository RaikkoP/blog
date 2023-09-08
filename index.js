//application packages
const express = require('express');
const db = require('./utils/db');

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

db.connect((err) => {
    if (err) throw err;
    console.log("Connected");
})

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/author');

app.use('/', articleRoutes);
app.use('/article', articleRoutes);
app.use('/author', userRoutes);



app.listen(3000, () => {
    console.log('listening on port 3000');
})