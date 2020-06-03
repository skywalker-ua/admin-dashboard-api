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
router.get('/counter', authenticateRoute, adminController.getCounter);
router.get('/orders', authenticateRoute, adminController.getOrders);
router.get('/orders/:orderId', authenticateRoute, adminController.getOrder)
router.post('/orders/create', authenticateRoute, adminController.postOrder);
router.get('/products', authenticateRoute, adminController.getProducts);
router.get('/products/:productId', authenticateRoute, adminController.getProduct);
router.post('/products/delete', authenticateRoute, adminController.deleteProduct);
router.patch('/products/update', authenticateRoute, adminController.updateProduct);
router.post('/products/create', authenticateRoute, adminController.postProduct);

module.exports = router;