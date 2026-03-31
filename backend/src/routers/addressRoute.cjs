const express = require('express');
const addressRouter = express.Router();

const {
    getUsersAddress,
    addAddress,
    setDefault,
    updateAddress,
    deleteAddress
} = require('../controllers/addressController.cjs');

addressRouter.get('/:user_id', getUsersAddress);

addressRouter.post('/:user_id', addAddress);

addressRouter.patch('/:id/default', setDefault);

addressRouter.put('/:id', updateAddress);

addressRouter.delete('/:id', deleteAddress);

module.exports = addressRouter;