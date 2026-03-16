const db = require('../../db.cjs');

const getCartByUser = user_id => {
    return db.prepare(`
        SELECT cart.id AS cart_id, cart.quantity, cart.user_id, products.*
        FROM cart
        JOIN products ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `).all(user_id);
};

const addProduct = (user_id, product_id, quantity) => {
    const existing = db.prepare(`SELECT * FROM cart WHERE user_id = ? AND product_id = ?`).get(user_id, product_id);
    if(existing){
        db.prepare(`UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?`).run(quantity, user_id, product_id);
    }else{
        db.prepare(`INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`).run(user_id, product_id, quantity);
    }
}

const removeProduct = id => {
    return db.prepare(`DELETE FROM cart WHERE id = ?`).run(id);
};

const updateQuantity = (id, quantity) => {
    return db.prepare(`UPDATE cart SET quantity = ? WHERE id = ?`).run(quantity, id);
};

const clearCartByUser = user_id => {
    return db.prepare(`DELETE FROM cart WHERE user_id = ?`).run(user_id);
};

module.exports = {
    getCartByUser,
    addProduct,
    removeProduct,
    updateQuantity,
    clearCartByUser
}