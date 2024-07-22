const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductById, editProduct, deleteProductById, searchProduct } = require('../controllers/productsControllers');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.post('/', auth, upload.array("img", 5), createProduct);
router.get('/', getProducts);
router.get('/id/:id', getProductById);
router.put('/:id', auth, upload.array("img", 5), editProduct);
router.get('/search', searchProduct);
router.delete('/:id', auth, deleteProductById);

module.exports = router;
