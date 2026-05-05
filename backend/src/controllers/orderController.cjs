const db = require('../../db.cjs');
const orderModel = require('../models/orderModel.cjs');

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
        const { user_id } = req.params;
        const orders = orderModel.getOrdersByUser(user_id);
        res.json(orders);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const getOrderDetails = (req, res) => {
    try{
        const { user_id, order_id } = req.params;
        const order = orderModel.getOrderById(user_id, order_id);
        if(!order) return res.status(404).json({ message: 'Order not found!' });
        res.json(order);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const checkout = (req, res) => {
    try{
        const { user_id } = req.params;
        const { address_id, payment_method_id, shipping_address: rawAddress, paymentMethod: rawPayment } = req.body;

        if(!user_id) return res.status(400).json({ message: 'user_id is required!' });

        const cartItems = orderModel.getCartByUser(user_id);
        if(cartItems.length === 0) return res.status(400).json({ message: 'Cart is empty!' });

        for(const item of cartItems){
            if(item.stock < item.quantity) return res.status(400).json({ message: `Not enough stock for ${item.name}` });
        }

        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        let shipping_address;
        if(address_id){
            shipping_address = db.prepare(`SELECT * FROM addresses WHERE id = ?`).get(address_id);
            if(!shipping_address) return res.status(400).json({ message: 'Address not found!' });
        }else if(rawAddress){
            shipping_address = rawAddress;
        }else{
            return res.status(400).json({ message: 'Address is required!' });            
        }

        let paymentMethodData;
        if(payment_method_id){
            const paymentMethod = db.prepare(`SELECT * FROM payment_methods WHERE id = ?`).get(payment_method_id);
            if(!paymentMethod) return res.status(400).json({ message: 'Payment method not found!' });
            paymentMethodData = { ...paymentMethod, details: JSON.parse(paymentMethod.details) };
        }else if(rawPayment){
            paymentMethodData = rawPayment;
        }else{
            return res.status(400).json({ message: 'payment method is required!' });
        }

        const orderResult = orderModel.createOrder(user_id, total, shipping_address, paymentMethodData);
        const order_id = orderResult.lastInsertRowid;

        cartItems.forEach(item => {
            orderModel.addOrderItem(order_id, item.product_id, item.quantity, item.price);
            orderModel.reduceStock(item.quantity, item.product_id);
        });

        orderModel.clearCart(user_id);

        res.status(201).json({ message: 'Order created successfully!', order_id });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const updateOrderStatus = (req, res) => {
    try{
        const { id } = req.params;
        const { status } = req.body;

        if(!status) return res.status(400).json({ message: 'Status is required!' });

        const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
        if(!validStatuses.includes(status)) return res.status(400).json({ message: 'Invalid status' });

        orderModel.updateOrderStatus(id, status);
        res.json({ message: 'Order status updated!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const deleteOrder = (req, res) => {
    try{
        const { id } = req.params;
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
    getOrderDetails,
    checkout,
    updateOrderStatus,
    deleteOrder
}