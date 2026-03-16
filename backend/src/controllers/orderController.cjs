const orderModel = require('../models/orderModel.cjs');
const db = require('../../db.cjs');

const getAllOrders = (req, res) => {
    try{
        const orders = orderModel.getAllOrders();
        res.json(orders);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const getOrdersByUser = (req, res) => {
    try{
        const user_id = req.params.user_id;
        const orders = orderModel.getOrdersByUser(user_id);
        res.json(orders);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const checkout = (req, res) => {
    try{
        const { user_id } = req.body;

        if(!user_id) return res.status(400).json({ message: 'user_id is required!' });

        const cartItems = orderModel.getCartByUser(user_id);
        if(cartItems.length === 0) return res.status(400).json({ message: 'Cart is empty!' });

        let total = 0;

        cartItems.forEach(el => {
            const product = db.prepare(`SELECT price FROM products WHERE id = ?`).get(el.product_id);
            total += product.price * cartItems.quantity;
        });

        const orderResult = orderModel.createOrder(user_id, total);
        const order_id = orderResult.lastInsertedRowid;

        cartItems.forEach(item => {
            const product = db.prepare(`SELECT price FROM products WHERE id = ?`).get(item.product_id);
            orderModel.addOrderItem(order_id, item.product_id, item.quantity, product.price);
        });

        orderModel.clearCart(user_id);

        res.status(201).json({ message: 'Order created successfully!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const updateOrderStatus = (req, res) => {
    try{
        const id = req.params.id;
        const { status } = req.body;

        if(!status) return res.status(400).json({ message: 'Status is required!' });

        orderModel.updateOrderStatus(id, status);
        res.json({ message: 'Order status updated!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const deleteOrder = (req, res) => {
    try{
        const id = req.params.id;
        orderModel.deleteOrder(id);
        res.json({ message: 'Order deleted!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

module.exports = {
    getAllOrders,
    getOrdersByUser,
    checkout,
    updateOrderStatus,
    deleteOrder
}