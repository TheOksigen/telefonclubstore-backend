const express = require('express');
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    editProduct,
    deleteProductById,
    searchProduct,
    getProductsByCategory,
    getProductsBySubcategory
} = require('../controllers/products.controllers');


const auth = require('../middlewares/auth.middleware');


router.post('/create', auth, createProduct);
router.get('/all', getProducts);
router.get('/get/:id', getProductById);
router.put('/update/:id', auth, editProduct);
router.get('/search', searchProduct);
router.delete('/delete/:id', auth, deleteProductById);


router.get('/category/:category', getProductsByCategory);
router.get('/subcategory/:subcategory', getProductsBySubcategory);

module.exports = router;
