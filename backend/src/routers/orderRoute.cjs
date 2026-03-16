const express = require('express');
const orderRouter = express.Router();

const {
    getAllOrders,
    getOrdersByUser,
    checkout,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/orderController.cjs');

orderRouter.get('/', getAllOrders);

orderRouter.get('/:id', getOrdersByUser);

orderRouter.post('/', checkout);

orderRouter.put('/:id', updateOrderStatus);

orderRouter.delete('/:id', deleteOrder);

module.exports = orderRouter;