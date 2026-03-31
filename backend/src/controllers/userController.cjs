const userModel = require('../models/userModel.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        const accessToken = jwt.sign(
            { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
            process.env.ACCESS_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const refreshToken = (req, res) => {
    try{
        const token = req.cookies.refreshToken;
        if(!token) return res.json({ accessToken: null });

        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const user = userModel.getUserById(decoded.id);

        const accessToken = jwt.sign(
            { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
            process.env.ACCESS_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ accessToken });
    }catch(err){
        console.error(err);
        res.status(403).json({ message: 'Invalid token!' });
    }
};

const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out!' });
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

const updateUserInfo = (req, res) => {
    try{
        const id = req.params.id;
        const { full_name, email } = req.body;

        if(!full_name || !email) return res.status(400).json({ message: 'Full name and email required!' });

        userModel.updateUserInfo(id, full_name, email);
        const user = userModel.getUserById(id);

        res.json({ message: 'User info updated!', user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role, created_at: user.created_at } });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const changePassword = (req, res) => {
    try{
        const id = req.params.id;
        const { currentPassword, newPassword } = req.body;

        const user = userModel.getUserById(id);
        if(!user) return res.status(400).json({ message: 'User not found!' });

        const isMatch = bcrypt.compareSync(currentPassword, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Current password is incorect!' });

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        userModel.changePassword(id, hashedPassword);

        res.json({ message: 'Password changed successfully!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    deleteUser,
    updateUserInfo,
    changePassword,
    refreshToken,
    logout
};