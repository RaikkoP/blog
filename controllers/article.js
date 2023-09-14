const Article = require("../models/article.model");

const getAllArticles = (req, res) => {
    Article.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured retrieving articles data"
            })
        } else {
            console.log(data);
            res.render("index", {
                articles: data
            });
        }
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