const express = require('express');
const { createCategory, createSubcategory, editCategoriesById, getCategories,
    getCategoriesById, deleteCategoryById, updateSubcategory, deleteSubcategory } = require('../controllers/categories.controllers');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/', auth, createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoriesById);
router.put('/:id', auth, editCategoriesById);
router.delete('/:id', auth, deleteCategoryById);

router.post('/subcategory', auth, createSubcategory);
router.put('/subcategory/:id', auth, updateSubcategory);
router.delete('/subcategory/:id', auth, deleteSubcategory);


module.exports = router;
