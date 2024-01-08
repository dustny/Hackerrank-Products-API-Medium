const router = require('express').Router();
const Controller = require('../controllers/products');

router.post('/products', Controller.createProduct);
router.get('/products', Controller.getAllProducts);
router.patch('/products/:id', Controller.patchProductById);
router.put('/products/:id', Controller.updateProductById);
router.delete('/products/:id', Controller.updateProductById);


module.exports = router;
