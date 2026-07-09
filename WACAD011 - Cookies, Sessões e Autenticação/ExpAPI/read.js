const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

router.get('/products', isAuth, productController.index);
router.get('/products/:id', isAuth, productController.read);

router.post('/products', isAdmin, productController.create);
router.put('/products/:id', isAdmin, productController.update);
router.delete('/products/:id', isAdmin, productController.delete);

module.exports = router;