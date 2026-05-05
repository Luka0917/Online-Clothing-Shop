const express = require('express');
const paymentMethodRouter = express.Router();

const {
    getPaymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    setPaymentMethodDefault
} = require('../controllers/paymentMethodController.cjs');

paymentMethodRouter.get('/:user_id', getPaymentMethods);

paymentMethodRouter.post('/:user_id', addPaymentMethod);

paymentMethodRouter.delete('/:id', deletePaymentMethod);

paymentMethodRouter.patch('/:id', setPaymentMethodDefault);

module.exports = paymentMethodRouter;