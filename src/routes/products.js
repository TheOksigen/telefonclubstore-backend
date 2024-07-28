// src/routes/products.js
const express = require('express');
const router = express.Router();

const { createProduct, getProducts, getProductById, editProduct, deleteProductById, searchProduct } = require('../controllers/products.controllers');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const validator = require('../middlewares/validation.middleware');

const { productSchema } = require('../schema/product.schema');

router.post('/', validator(productSchema), auth, upload.array("img", 5), createProduct);
router.get('/', getProducts);
router.get('/id/:id', getProductById);
router.put('/:id', auth, upload.array("img", 5), editProduct);
router.get('/search', searchProduct);
router.delete('/:id', auth, deleteProductById);

module.exports = router;
