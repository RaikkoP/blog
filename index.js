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

app.use('/', articleRoutes);
app.use('/article', articleRoutes);

app.get('/author/:name', (req, res) => {
    let sql = `SELECT article.name as title, article.slug, article.image, article.published, author.name FROM article LEFT JOIN author ON article.author_id = author.id WHERE author.name = "${req.params.name}"`
    let articles = [];
    db.query(sql, (err, data) => {
        if (err) throw err;
        articles = data;
        res.render('author', { 
            articles: articles 
        });
    })
})


app.listen(3000, () => {
    console.log('listening on port 3000');
})