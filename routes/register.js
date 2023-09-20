const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');

router.get('/', registerController.registerForm);
router.post('/create', registerController.createNewAccount);

module.exports = router;