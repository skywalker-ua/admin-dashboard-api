const express = require('express');

const adminController = require('../controllers/admin');
const authController = require('../controllers/auth');
const router = express.Router();

const authenticateRoute = require('../middleware/auth');

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})
router.get('/', adminController.getHome);
router.post('/token/check', authController.postToken);
router.post('/password-recovery', authController.postRecoverPassword);
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.get('/orders',authenticateRoute, adminController.getOrders);
router.post('/order/create', authenticateRoute, adminController.postOrder);
router.get('/products', authenticateRoute, adminController.getProducts);
router.get('/products/:productId',authenticateRoute, adminController.getProduct);
router.post('/products/delete',authenticateRoute, adminController.deleteProduct);
router.patch('/products/update',authenticateRoute, adminController.updateProduct);
router.post('/products/create',authenticateRoute, adminController.postProduct);

module.exports = router;