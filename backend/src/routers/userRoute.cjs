const express = require('express');
const userRouter = express.Router();

const {
    registerUser,
    loginUser,
    getUserById,
    deleteUser
} = require('../controllers/userController.cjs');

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/:id', getUserById);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;