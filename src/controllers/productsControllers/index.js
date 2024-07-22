const createProduct = require('./createProduct');
const getProducts = require('./getProducts');
const getProductById = require('./getProductById');  
const deleteProductById = require('./deleteProductById');
const editProduct = require('./editProduct');
const searchProduct = require('./searchProduct');

module.exports = { createProduct, getProducts, getProductById, editProduct, deleteProductById, searchProduct };
