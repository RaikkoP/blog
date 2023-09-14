//db connection
const db = require('../utils/db');

//constructor
const Article = (article) => {
    this.name = article.name;
    this.slug = article.slug;
    this.image = article.image;
    this.body = article.body;
    this.published = article.published;
    this.author_id = article.author_id;
};

//Get all articles
Article.getAll = (result) => {
    let sql = "SELECT * FROM article";
    let articles =  [];
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        articles = res;
        console.log("articles: ", articles);
        result(null, articles);
    })
};

Article.getBySlug = (slug, result) => {
    let sql = `SELECT article.name as title, article.slug, article.image, article.body, article.published, author.name FROM article LEFT JOIN author ON article.author_id = author.id WHERE article.slug = "${slug}" `
    db.query(sql, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (data.length){
            console.log("Found article: ", data[0]);
            result(null, data[0]);
        }
    })
}

module.exports = Article;