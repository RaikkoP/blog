//db connection
const db = require('../utils/db');

//constructor
const Article = function(article){
    this.id = article.id;
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
};

Article.createNew = (newArticle, result) => {
    let query = `INSERT INTO article SET 
    name = "${newArticle.name}",
    slug = "${newArticle.slug}",
    image = "${newArticle.image}",
    body = "${newArticle.body}",
    published = "${newArticle.published}",
    author_id = "${newArticle.author_id}"`
    db.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created article: ", 
        {id: res.insertId, ...newArticle});
        result(null, { id: res.insertId, ...newArticle});
    });
}

Article.getPost = (id, result) => {
    let query = `SELECT * FROM article WHERE id = "${id}"`
    let article;
    db.query(query, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null); 
            return;
        }
        article = res;
        console.log("article: ", article);
        result(null, article);
    });
}

Article.updatePost = (newValues, result) => {
    let query = `UPDATE article SET
    name = "${newValues.name}",
    slug = "${newValues.slug}",
    image = "${newValues.image}",
    body = "${newValues.body}",
    published = "${newValues.published}",
    author_id = "${newValues.author_id}"
    WHERE id = ${newValues.id}`
    db.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("updated article: ",
        {id: res.insertId, ...newValues});
        result(null, {id: res.insertId, ...newValues});
    })
}

Article.deletePost = (id, result) => {
    console.log(id);
    let query = `DELETE FROM article
    WHERE id = "${id}"`
    db.query(query, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("deleted article: ",
        {id: res.insertId, ...id});
        result(null, {id: res.insertId, ...id});
    })
}

module.exports = Article;