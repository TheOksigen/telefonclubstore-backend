const createCategory = require('./createCategory');
const createSubcategory = require('./createSubcategory');
const editCategoriesById = require('./editCategoriesById');
const getCategories = require('./getCategories');
const getCategoriesById = require('./getCategoriesById');
const deleteCategoryById = require('./deleteCategoryById'); 

module.exports = {
    createCategory,
    createSubcategory,
    editCategoriesById,
    getCategories,
    getCategoriesById,
    deleteCategoryById 
};
