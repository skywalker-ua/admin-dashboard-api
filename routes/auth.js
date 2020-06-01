const express = require('express');

const authController = require('../controllers/auth');
const router = express.Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

router.post('/token/check', authController.postToken);
router.post('/password-recovery', authController.postRecoverPassword);
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);

module.exports = router;
