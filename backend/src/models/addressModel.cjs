const db = require('../../db.cjs');

const getUsersAddress = user_id => {
    return db.prepare(`SELECT * FROM addresses WHERE user_id = ?`).all(user_id);
};

const addAddress = (user_id, label, street_address, city, state, ZIP_code, country) => {
    const existing = db.prepare(`SELECT * FROM addresses WHERE user_id = ?`).all(user_id);
    const is_default = existing.length === 0 ? 1 : 0;

    return db.prepare(`
        INSERT INTO addresses (user_id, label, street_address, city, state, ZIP_code, country, is_default)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(user_id, label, street_address, city, state, ZIP_code, country, is_default);
};

const setDefault = (user_id, id) => {
    db.prepare(`UPDATE addresses SET is_default = 0 WHERE user_id = ?`).run(user_id);
    db.prepare(`UPDATE addresses SET is_default = 1 WHERE id = ?`).run(id);
};

const updateAddress = (id, label, street_address, city, ZIP_code, country) => {
    db.prepare(`
        UPDATE addresses SET label = ?, street_address = ?, city = ?, ZIP_code = ?, country = ?
        WHERE id = ?
    `).run(label, street_address, city, ZIP_code, country, id);
    return db.prepare(`SELECT * FROM addresses WHERE id = ?`).get(id);
};

const deleteAddress = id => {
    const address = db.prepare(`SELECT * FROM addresses WHERE id = ?`).get(id);
    db.prepare(`DELETE FROM addresses WHERE id = ?`).run(id);
    if(address.is_default === 1){
        const remaining = db.prepare(`SELECT * FROM addresses WHERE user_id = ?`).get(address.user_id);
        if(remaining) db.prepare(`UPDATE addresses SET is_default = 1 WHERE id = ?`).run(remaining.id);
    }
};

module.exports = {
    getUsersAddress,
    addAddress,
    setDefault,
    updateAddress,
    deleteAddress
}