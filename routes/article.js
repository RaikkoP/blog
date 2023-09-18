const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);
router.get('/form', articleController.articleForm);
router.post('/create', articleController.createNewArticle);
router.get('/edit/:id', articleController.getArticleByID);
router.post('/edited', articleController.updateArticle);
router.post('/delete/:id', articleController.deleteArticle);

module.exports = router;