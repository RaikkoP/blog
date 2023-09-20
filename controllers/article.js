const Article = require("../models/article.model");

const getAllArticles = (req, res) => {
    Article.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured retrieving articles data"
            })
        } else {
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
            res.render("article", {
                article: data
            })
        }
    });
};

const createNewArticle = (req, res) => {
    console.log('new article');

    const newArticle = new Article({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' '),
        author_id: req.body.author_id
    }
    )
     
    Article.createNew(newArticle, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured sending article data"
            })
        } else {
            res.redirect('/')
        }
    })
};

const updateArticle = (req, res) => {

    const newValues = new Article({
        id: req.body.id,
        name: req.body.name,
        published: req.body.published,
        slug: req.body.slug,
        image:req.body.image,
        body: req.body.body,
        author_id: req.body.author_id
    });

    Article.updatePost(newValues, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured updating"
            })
        } else {
            res.redirect('/');
        }
    });
};

const deleteArticle = (req, res) => {
    

    Article.deletePost(req.params.id, (err, data) => {
        if(err) {
            res.status(500).sind({
                message: err.messasge || "Failed to delete post"
            })
        } else {
            res.redirect('/');
        }
    })
}

const articleForm = (req, res) => {
    res.render("form")
};

const getArticleByID = (req, res) => {
    console.log('update article');

    Article.getPost(req.params.id, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Didn't find post"
            });
        } else {
            res.render("editForm", {
                article: data
            })
        }
    });
}

module.exports = {
    getAllArticles,
    getArticleBySlug,
    createNewArticle,
    articleForm,
    getArticleByID,
    updateArticle,
    deleteArticle
};