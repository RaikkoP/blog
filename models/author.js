//db connection
const db = require('../utils/db');

const Author = (author) => {
    this.id = author.id;
    this.name = author.name;
}

Author.getUserPosts = (author, result) => {
    let sql = `SELECT article.name as title, article.slug, article.image, article.published, author.name FROM article LEFT JOIN author ON article.author_id = author.id WHERE author.name = "${author}"`
    let articles = [];
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        articles = res;
        result(null, articles);
    })
};

module.exports = Author;