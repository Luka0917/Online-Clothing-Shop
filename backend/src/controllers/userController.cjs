const userModel = require('../models/userModel.cjs');
const bcrypt = require('bcrypt');

const registerUser = (req, res) => {
    try{
        const { full_name, email, password } = req.body;

        if(!full_name || !email || !password) return res.status(400).json({ message: 'All fields are required!' });

        const existingUser = userModel.getUserEmail(email);
        if(existingUser) return res.status(400).json({ message: 'Email already registered!' });

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = userModel.addUser(full_name, email, hashedPassword, 'user');

        res.status(201).json({ message: 'User registered!', user: { id: newUser.lastInsertRowid, full_name, email, role: 'user' } });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const loginUser = (req, res) => {
    try{
        const { email, password }= req.body;

        if(!email || !password) return res.status(400).json({ message: 'Email and password required!' });

        const user = userModel.getUserEmail(email);
        if(!user) return res.status(404).json({ message: 'User not found!' });

        const isValid = bcrypt.compareSync(password, user.password);
        if(!isValid) return res.status(401).json({ message: 'Incorrect password!' });

        res.json({ message: 'Login successful!', user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role, created_at: user.created_at } });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const getUserById = (req, res) => {
    try{
        const id = req.params.id;
        const user = userModel.getUserById(id);

        if(!user) return res.status(404).json({ message: 'User not found!' });

        res.json({ id: user.id, full_name: user.full_name, email: user.email, role: user.role });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const deleteUser = (req, res) => {
    try{
        const id = req.params.id;
        userModel.deleteUser(id);
        res.json({ message: 'User Deleted!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    deleteUser
};