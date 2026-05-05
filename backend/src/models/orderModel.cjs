const db = require('../../db.cjs');

const getAllOrders = () => {
    return db.prepare(`SELECT * FROM orders`).all();
};

const getOrdersByUser = user_id => {
    const orders = db.prepare(`SELECT * FROM orders WHERE user_id = ?`).all(user_id);
    return orders.map(el => ({
        ...el,
        shipping_address: el.shipping_address ? JSON.parse(el.shipping_address) : null,
        payment_method: el.payment_method ? JSON.parse(el.payment_method) : null,
        items: getOrderItems(el.id)
    }));
};

const getOrderById = (user_id, order_id) => {
    const order = db.prepare(`SELECT * FROM orders WHERE id = ? AND user_id = ?`).get(order_id, user_id);
    if(!order) return null;
    return {
        ...order,
        shipping_address: order.shipping_address ? JSON.parse(order.shipping_address) : null,
        payment_method: order.payment_method ? JSON.parse(order.payment_method) : null,
        items: getOrderItems(order_id)
    };
};

const createOrder = (user_id, total_price, shipping_address, payment_method) => {
    return db.prepare(`
        INSERT INTO orders (user_id, total_price, shipping_address, payment_method)
        VALUES (?, ?, ?, ?)
    `).run(user_id, total_price, JSON.stringify(shipping_address), JSON.stringify(payment_method));
};

const addOrderItem = (order_id, product_id, quantity, price_at_time) => {
    return db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity, price_at_time)
        VALUES (?, ?, ?, ?)
    `).run(order_id, product_id, quantity, price_at_time);
};

const getOrderItems = order_id => {
    return db.prepare(`
        SELECT order_items.*, products.name, products.image, products.category
        FROM order_items
        LEFT JOIN products ON order_items.product_id = products.id
        WHERE order_items.order_id = ?
    `).all(order_id);
};

const updateOrderStatus = (id, status) => {
    return db.prepare(`UPDATE orders SET status = ? WHERE id = ?`).run(status, id);
};

const deleteOrder = id => {
    return db.prepare(`DELETE FROM orders WHERE id = ?`).run(id);
};

const getCartByUser = user_id => {
    return db.prepare(`
        SELECT cart.*, products.price, products.name, products.stock
        FROM cart
        LEFT JOIN products ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `).all(user_id);
};

const clearCart = user_id => {
    return db.prepare(`DELETE FROM cart WHERE user_id = ?`).run(user_id);
};

const reduceStock = (quantity, product_id) => {
    return db.prepare(`UPDATE products SET stock = stock - ? WHERE id = ?`).run(quantity, product_id);
};

module.exports = {
    getAllOrders,
    getOrdersByUser,
    getOrderById,
    createOrder,
    addOrderItem,
    getOrderItems,
    updateOrderStatus,
    deleteOrder,
    getCartByUser,
    clearCart,
    reduceStock
};