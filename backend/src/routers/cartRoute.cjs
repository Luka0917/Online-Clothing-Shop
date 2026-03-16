const express = require('express');
const cartRouter = express.Router();

const {
    getCartByUser,
    addProduct,
    removeProduct,
    changeCartProduct,
    clearCart
} = require('../controllers/cartController.cjs');

cartRouter.get('/:id', getCartByUser);

cartRouter.post('/', addProduct);

cartRouter.delete('/user/:id', clearCart);

cartRouter.delete('/:id', removeProduct);

cartRouter.put('/:id', changeCartProduct);

module.exports = cartRouter;