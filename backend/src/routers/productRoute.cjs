const express = require('express');
const productRouter = express.Router();

const {
    getAllProducts,
    getProductByCategory,
    getProductById,
    addProduct,
    removeProduct,
    getCategoryCounts
} = require('../controllers/productController.cjs');

productRouter.get('/', getAllProducts);

productRouter.get('/counts', getCategoryCounts);

productRouter.get('/:category', getProductByCategory);

productRouter.get('/id/:id', getProductById);

productRouter.post('/', addProduct);

productRouter.delete('/:id', removeProduct);

module.exports = productRouter;