const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const adminArticleController = require('../controllers/admin/articles')

router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);
router.get('/form', articleController.articleForm);
router.post('/create', articleController.createNewArticle);
router.get('/edit/:id', articleController.getArticleByID);
router.post('/edited', articleController.updateArticle);
router.post('/delete/:id', articleController.deleteArticle);
router.post('/admin/article/create', adminArticleController.createArticle)

module.exports = router;