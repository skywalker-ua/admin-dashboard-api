const express = require('express');

const adminController = require('../controllers/admin');
const router = express.Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*')
    next();
})
router.get('/', adminController.getHome);
router.get('/orders', adminController.getOrders);
router.get('/products', adminController.getProducts);
router.get('/products/:productId', adminController.getProduct);
router.post('/products/delete', adminController.deleteProduct);
router.patch('/products/update', adminController.updateProduct);
router.post('/products/create', adminController.postProduct);

module.exports = router;