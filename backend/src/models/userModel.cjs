const db = require('../../db.cjs');

const addUser = (full_name, email, password, role) => {
    return db.prepare(`
        INSERT INTO users (full_name, email, password, role)
        VALUES (?, ?, ?, ?)
    `).run(full_name, email, password, role);
};

const getUserEmail = email => {
    return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
};

const getUserById = id => {
    return db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
};

const deleteUser = id => {
    db.prepare(`DELETE FROM users WHERE id = ?`).run(id);
};

const updateUserInfo = (id, full_name, email) => {
    return db.prepare(`UPDATE users SET full_name = ?, email = ? WHERE id = ? `).run(full_name, email, id);
};

const changePassword = (id, newPassword) => {
    return db.prepare(`UPDATE users SET password = ? WHERE id = ?`).run(newPassword, id);
};

module.exports = {
    addUser,
    getUserEmail,
    getUserById,
    deleteUser,
    updateUserInfo,
    changePassword
};