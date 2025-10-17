const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const authenticate = require('../middlewares/auth.js');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/refresh-token', authController.refresh)

module.exports = router;