const Article = require("../models/article");

module.exports = {
  getAllArticles: async (req, res) => {
    if (req.session.authenticated) {
      Article.getAll((err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occured retrieving articles data",
          });
        } else {
          res.render("index", {
            articles: data,
            count: req.params.count
          });
        }
      });
    } else {
      res.redirect("/login");
    }
  },

  getArticleBySlug: async (req, res) => {
    Article.getBySlug(req.params.slug, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occured retrieving articles",
        });
      } else {
        res.render("article", {
          article: data,
        });
      }
    });
  },

  createNewArticle: async (req, res) => {
    console.log("new article");

    const newArticle = new Article({
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      body: req.body.body,
      published: new Date().toISOString().slice(0, 19).replace("T", " "),
      author_id: req.body.author_id,
    });

    Article.createNew(newArticle, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occured sending article data",
        });
      } else {
        res.redirect("/");
      }
    });
  },

  updateArticle: async (req, res) => {
    const newValues = new Article({
      id: req.body.id,
      name: req.body.name,
      published: req.body.published,
      slug: req.body.slug,
      image: req.body.image,
      body: req.body.body,
      author_id: req.body.author_id,
    });

    Article.updatePost(newValues, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occured updating",
        });
      } else {
        res.redirect("/");
      }
    });
  },

  deleteArticle: async (req, res) => {
    Article.deletePost(req.params.id, (err, data) => {
      if (err) {
        res.status(500).sind({
          message: err.messasge || "Failed to delete post",
        });
      } else {
        res.redirect("/");
      }
    });
  },

  articleForm: (req, res) => {
    res.render("form");
  },

  getArticleByID: async (req, res) => {
    console.log("update article");

    Article.getPost(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Didn't find post",
        });
      } else if (data.length > 0) {
        res.render("editForm", {
          article: data,
        });
      } else {
        res.redirect("/");
      }
    });
  },
};
