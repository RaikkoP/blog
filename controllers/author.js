const db = require('../utils/db');

const getUserPosts = (req, res) => {
    let sql = `SELECT article.name as title, article.slug, article.image, article.published, author.name FROM article LEFT JOIN author ON article.author_id = author.id WHERE author.name = "${req.params.name}"`
    let articles = [];
    db.query(sql, (err, data) => {
        if (err) throw err;
        articles = data;
        res.render('author', { 
            articles: articles 
        });
    })
};

module.exports = {
    getUserPosts};