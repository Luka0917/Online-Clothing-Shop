const db = require('../../db.cjs');

const getAllProducts = () => {
    return db.prepare(`SELECT * FROM products`).all();
};

const getProductById = id => {
    return db.prepare(`SELECT * FROM products WHERE id = ?`).get(id);
};

const addProduct = (name, description, price, stock, category, image) => {
    return db.prepare(`
        INSERT INTO products (name, description, price, stock, category, image)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, description, price, stock, category, image)
};

const removeProduct = id => {
    return db.prepare(`DELETE FROM products WHERE id = ?`).run(id);
};

const getCategoryCounts = () => {
    return db.prepare(`SELECT category, COUNT(*) as count FROM products GROUP BY category`).all();
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    removeProduct,
    getCategoryCounts
}