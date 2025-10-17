const express = require('express');
const router = express.Router();
const { register, login, refresh } = require('../controllers/auth.controller.js');
const authenticate = require('../middlewares/auth.js');

router.post('/register', register);

router.post('/login', login);

router.post('/refresh', refresh)

// Le middleware d'authentification est appliqué à cette route
router.post('/user', authenticate, (req, res) => {
});

router.post('/test', authenticate, (req, res) => {
    res.json({message: 'Test route is working!'});
});

module.exports = router;