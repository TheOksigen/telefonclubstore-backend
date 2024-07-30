const express = require('express');

const { createCategory, createSubcategory, editCategoriesById, getCategories, getCategoriesById, deleteCategoryById } = require('../controllers/categories.controllers');

const auth = require('../middlewares/auth.middleware');
const validator = require('../middlewares/validation.middleware');

const { categorySchema, subcategorySchema } = require('../schema/categories.schema');

const router = express.Router();

router.post('/',  auth, createCategory);
router.post('/subcategory',  auth, createSubcategory);
router.get('/', getCategories);
router.get('/:id', getCategoriesById);
router.put('/:id', auth, editCategoriesById);
router.delete('/:id', auth, deleteCategoryById);

module.exports = router;
