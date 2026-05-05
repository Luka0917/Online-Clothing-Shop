const paymentMethodModel = require('../models/paymentMethodModel.cjs');

//& /payment-method
//^ GET    /:user_id -> get user's payment methods
//^ POST   /:user_id -> add payment method
//^ DELETE /:id      -> delete payment method
//^ PATCH  /:id      -> set default

const getPaymentMethods = (req, res) => {
    try{
        const { user_id } = req.params;
        const methods = paymentMethodModel.getPaymentMethods(user_id);
        res.json(methods);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const addPaymentMethod = (req, res) => {
    try{
        const { user_id } = req.params;
        const { type, label, details } = req.body;

        if(!type || !details) return res.status(400).json({ message: 'Type and details are required!' });

        const result = paymentMethodModel.addPaymentMethod(user_id, type, label, details);
        res.status(201).json({ message: 'Payment method added!', id: result.lastInsertRowid });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const deletePaymentMethod = (req, res) => {
    try{
        const { id } = req.params;
        paymentMethodModel.deletePaymentMethod(id);
        res.json({ message: 'Payment method deleted!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const setPaymentMethodDefault = (req, res) => {
    try{
        const { id } = req.params;
        const { user_id } = req.body;
        paymentMethodModel.setPaymentMethodDefault(id, user_id);
        res.json({ message: 'Default payment method updated!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

module.exports = {
    getPaymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    setPaymentMethodDefault
};