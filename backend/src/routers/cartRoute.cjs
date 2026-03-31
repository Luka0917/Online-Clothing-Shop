const express = require('express');
const cartRouter = express.Router();

const {
    getCartByUser,
    addProduct,
    removeProduct,
    changeCartProduct,
    clearCart
} = require('../controllers/cartController.cjs');

cartRouter.get('/:user_id', getCartByUser);

cartRouter.post('/:user_id', addProduct);

cartRouter.delete('/clear/:user_id', clearCart);

cartRouter.delete('/:id', removeProduct);

cartRouter.put('/:id', changeCartProduct);

module.exports = cartRouter;