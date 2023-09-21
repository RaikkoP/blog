const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.get('/', loginController.loginForm);
router.post('/login', loginController.loginUser);



module.exports = router;