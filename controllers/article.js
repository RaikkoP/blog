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
    Article.getBySlug(req.params.slug, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured retrieving articles"
            });
        } else {
            console.log(data);
            res.render("article", {
                article: data
            })
        }
    });
};


module.exports = {
    getAllArticles,
    getArticleBySlug
}