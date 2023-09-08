const db = require('../utils/db');

const getAllArticles = (req, res) => {
    const sql = "SELECT * FROM article";
    let articles = [];
    db.query(sql, (err, data) => {
        if (err) throw err;
        articles = data;
        res.render('index', { 
            articles: articles 
        });
    })
};

const getArticleBySlug = (req, res) => {
    let sql = `SELECT article.name as title, article.slug, article.image, article.body, article.published, author.name FROM article LEFT JOIN author ON article.author_id = author.id WHERE article.slug = "${req.params.slug}" `
    let article
    db.query(sql, (err, data) => {
        if (err) throw err;
        article = data;
        console.log(article);
        res.render('article', { article: article });
    })
};

module.exports = {
    getAllArticles,
    getArticleBySlug
}