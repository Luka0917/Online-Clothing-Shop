const express = require('express');
const orderRouter = express.Router();

const {
    getAllOrders,
    getOrdersByUser,
    getOrderDetails,
    checkout,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/orderController.cjs');

orderRouter.get('/', getAllOrders);

orderRouter.get('/:user_id', getOrdersByUser);

orderRouter.get('/:user_id/:order_id', getOrderDetails);

orderRouter.post('/:user_id/checkout', checkout);

orderRouter.put('/:id', updateOrderStatus);

orderRouter.delete('/:id', deleteOrder);

module.exports = orderRouter;