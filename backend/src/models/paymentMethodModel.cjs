const db = require('../../db.cjs');

const getPaymentMethods = user_id => {
    const methods = db.prepare(`SELECT * FROM payment_methods WHERE user_id = ?`).all(user_id);
    return methods.map(el => ({ ...el, details: JSON.parse(el.details) }));
};

const addPaymentMethod = (user_id, type, label, details) => {
    const existing = db.prepare(`SELECT * FROM payment_methods WHERE user_id = ?`).all(user_id);
    const is_default = existing.length === 0 ? 1 : 0;

    return db.prepare(`
        INSERT INTO payment_methods (user_id, type, label, details, is_default)
        VALUES (?, ?, ?, ?, ?)
    `).run(user_id, type, label, JSON.stringify(details), is_default);
};

const deletePaymentMethod = id => {
    const method = db.prepare(`SELECT * FROM payment_methods WHERE id = ?`).get(id);
    db.prepare(`DELETE FROM payment_methods WHERE id = ?`).run(id);

    if(method.is_default === 1){
        const remaining = db.prepare(`SELECT * FROM payment_methods WHERE user_id = ?`).get(method.user_id);
        if(remaining) db.prepare(`UPDATE payment_methods SET is_default = 1 WHERE id = ?`).run(remaining.id);
    }
};

const setPaymentMethodDefault = (id, user_id) => {
    db.prepare(`UPDATE payment_methods SET is_default = 0 WHERE user_id = ?`).run(user_id);
    db.prepare(`UPDATE payment_methods SET is_default = 1 WHERE id = ?`).run(id);
};

module.exports = {
    getPaymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    setPaymentMethodDefault
};