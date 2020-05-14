const express = require('express');

const adminController = require('../controllers/admin');
const authController = require('../controllers/auth');
const router = express.Router();

const authenticateRoute = require('../middleware/auth');

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*')
    next();
})
router.get('/', adminController.getHome);
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.get('/orders', adminController.getOrders);;
router.get('/products', authenticateRoute, adminController.getProducts);
router.get('/products/:productId', adminController.getProduct);
router.post('/products/delete', adminController.deleteProduct);
router.patch('/products/update', adminController.updateProduct);
router.post('/products/create', adminController.postProduct);

module.exports = router;