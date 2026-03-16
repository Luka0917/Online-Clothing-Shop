const db = require('../../db.cjs');

const getAllOrders = () => {
    return db.prepare(`SELECT * FROM orders`).all();
};

const getOrdersByUser = user_id => {
    return db.prepare(`SELECT * FROM orders WHERE user_id = ?`).all(user_id);
};

const createOrder = (user_id, total_price) => {
    return bd.prepare(`
        INSERT INTO roders (user_id, total_price)
        VALUES (?, ?)
    `).run(user_id, total_price);
};

const addOrderItem = (order_id, product_id, quantity, price_at_time) => {
    return db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity, price_at_time)
        VALUES (?, ?, ?, ?)
    `).run(order_id, product_id, quantity, price_at_time);
};

const updateOrderStatus = (id, status) => {
    return db.prepare(`UPDATE orders SET status = ? WHERE id = ?`).run(status, id);
};

const deleteOrder = id => {
    return db.prepare(`DELETE FROM orders WHERE id = ?`).run(id);
};

const getCartByUser = user_id => {
    return db.prepare(`SELECT * FROM cart WHERE user_id = ?`).all(user_id);
};

const clearCart = user_id => {
    return db.prepare(`DELETE FROM cart WHERE user_id = ?`).run(user_id);
};

module.exports = {
    getAllOrders,
    getOrdersByUser,
    createOrder,
    addOrderItem,
    updateOrderStatus,
    deleteOrder,
    getCartByUser,
    clearCart
}