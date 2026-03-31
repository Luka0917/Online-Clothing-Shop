const productModel = require('../models/productModel.cjs');

//& /products
//^ GET    /          -> get all products
//^ GET    /counts    -> get category count
//^ GET    /id/:id    -> get product by id
//^ POST   /          -> add product
//^ DELETE /:id       -> remove product

const getAllProducts = (req, res) => {
    try {
        const products = productModel.getAllProducts();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const getProductById = (req, res) => {
    try{
        const id = req.params.id;
        const product = productModel.getProductById(id);

        if(!product) return res.status(404).json({ message: 'Product not found!' });

        res.json(product);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const addProduct = (req, res) => {
    try{
        const { name, description, price, stock, category, image } = req.body;

        if(!name || !price) return res.status(400).json({ message: 'Name and Price required!' });

        productModel.addProduct(name, description, price, stock, category, image);
        res.status(201).json({ message: 'Product added!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const removeProduct = (req, res) => {
    try{
        const id = req.params.id;
        productModel.removeProduct(id);
        res.json({ message: 'Product removed!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const getCategoryCounts = (req, res) => {
    try{
        const counts = productModel.getCategoryCounts();
        res.json(counts);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    removeProduct,
    getCategoryCounts
};