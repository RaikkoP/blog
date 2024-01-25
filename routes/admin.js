const express = require('express');
const router = express.Router();
const adminArticleController = require('../controllers/admin/articles')

router.post('/article/create', adminArticleController.createNew)
router.get('/article/edit/:id', adminArticleController.getPost)
router.post('/article/edit/:id', adminArticleController.updatePost)
router.post('/article/delete/:id', adminArticleController.deletePost)

module.exports = router;