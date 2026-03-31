const express = require('express');
const userRouter = express.Router();

const {
    registerUser,
    loginUser,
    getUserById,
    deleteUser,
    updateUserInfo,
    changePassword,
    refreshToken,
    logout
} = require('../controllers/userController.cjs');

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.post('/refresh', refreshToken);

userRouter.post('/logout', logout);

userRouter.get('/:id', getUserById);

userRouter.delete('/:id', deleteUser);

userRouter.put('/:id', updateUserInfo);

userRouter.put('/:id/password', changePassword);

module.exports = userRouter;