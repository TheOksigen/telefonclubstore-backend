const express = require('express');
const {
    createCategory,
    createSubcategory,
    editCategoriesById,
    getCategories,
    getCategoriesById,
    deleteCategoryById
} = require('../controllers/categoriesControllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, createCategory);
router.post('/subcategory', auth, createSubcategory);
router.get('/', getCategories);
router.get('/:id', getCategoriesById);
router.put('/:id', auth, editCategoriesById);
router.delete('/:id', auth, deleteCategoryById);

module.exports = router;
