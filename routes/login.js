const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.get('/login', loginController.loginForm);
router.post('/login/process', loginController.loginUser);
router.get('/register', loginController.registerForm);
router.post('/register/process', loginController.createNewAccount);



module.exports = router;