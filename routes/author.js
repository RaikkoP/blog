const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

router.get('/:name', authorController.getUserPosts);

module.exports = router;