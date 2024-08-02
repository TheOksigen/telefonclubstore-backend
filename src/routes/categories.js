const express = require('express');
const {
    createCategory,
    createSubcategory,
    editCategoriesById,
    getCategories,
    getCategoriesById, 
    deleteCategoryById,
    updateSubcategory,
    deleteSubcategory
} = require('../controllers/categories.controllers');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/create', auth, createCategory);
router.get('/all', getCategories);
router.get('/get/:id', getCategoriesById);
router.put('/update/:id', auth, editCategoriesById);
router.delete('/delete/:id', auth, deleteCategoryById);
router.post('/subcategory/create', auth, createSubcategory);
router.put('/subcategory/update/:id', auth, updateSubcategory);
router.delete('/subcategory/delete/:id', auth, deleteSubcategory);

module.exports = router;
