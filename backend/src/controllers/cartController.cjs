const cartModel = require('../models/cartModel.cjs');

//& /cart
//^ GET    /:user_id       -> get user's cart
//^ POST   /:user_id       -> add new item in cart
//^ DELETE /clear/:user_id -> clear user's cart
//^ DELETE /:id            -> remove item from cart
//^ PUT    /:id            -> update cart item (quantity from body)

const getCartByUser = (req, res) => {
    try{
        const user_id = req.params.user_id;
        const products = cartModel.getCartByUser(user_id);
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const addProduct = (req, res) => {
    try{
        const user_id = req.params.user_id;
        const { product_id, quantity } = req.body;

        if(!user_id || !product_id || !quantity) return res.status(400).json({ message: 'user_id, product_id and quantity are required!' });

        cartModel.addProduct(user_id, product_id, quantity);
        res.status(201).json({ message: 'Product added!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const clearCart = (req, res) => {
    try{
        const user_id = req.params.user_id;
        if(!user_id) return res.status(400).json({ message: 'user_id is required!' });

        cartModel.clearCartByUser(user_id);

        res.json({ message: 'Cart cleared successfully!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const removeProduct = (req, res) => {
    try{
        const id = req.params.id;
        cartModel.removeProduct(id);
        res.json({ message: 'Product removed!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const changeCartProduct = (req, res) => {
    try{
        const id = req.params.id;
        const { quantity } = req.body;
        cartModel.updateQuantity(id, quantity);
        res.json({ message: 'Quantity updated!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

module.exports = {
    getCartByUser,
    addProduct,
    removeProduct,
    changeCartProduct,
    clearCart
}