const addressModel = require('../models/addressModel.cjs');

//& /address
//^ GET    /:user_id    -> get user's addresses
//^ POST   /:user_id    -> add address
//^ PATCH  /:id/default -> set default
//^ PUT    /:id         -> update address
//^ DELETE /:id         -> delete address

const getUsersAddress = (req, res) => {
    try{
        const user_id = req.params.user_id;
        const addresses = addressModel.getUsersAddress(user_id);
        res.json(addresses);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const addAddress = (req, res) => {
    try{
        const user_id = req.params.user_id;
        const { label, street_address, city, state, ZIP_code, country } = req.body

        if(!label || !street_address || !city || !state || !ZIP_code || !country) return res.status(400).json({ message: 'Fillout all the fields!' })

        addressModel.addAddress(user_id, label, street_address, city, state, ZIP_code, country);
        res.status(201).json({ message: 'Address added!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const setDefault = (req, res) => {
    try{
        const { user_id } = req.body;
        const id = req.params.id;
        addressModel.setDefault(user_id, id);
        res.json({ message: 'Address set default!' })
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const updateAddress = (req, res) => {
    try{
        const id = req.params.id;
        const { label, street_address, city, ZIP_code, country } = req.body;

        if(!label || !street_address || !city || !ZIP_code || !country) return res.status(400).json({ message: 'Fillout all the fields!' })

        const address = addressModel.updateAddress(id, label, street_address, city, ZIP_code, country);
        res.json({ 
            message: 'Address updated!', 
            address: { 
                id: address.id, 
                label: address.label, 
                street_address: address.street_address, 
                city: address.city, 
                state: address.state, 
                ZIP_code: address.ZIP_code, 
                country: address.country, 
                is_default: address.is_default 
            } 
        });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

const deleteAddress = (req, res) => {
    try{
        const id = req.params.id;
        addressModel.deleteAddress(id);
        res.json({ message: 'Address deleted successfully!' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
};

module.exports = {
    getUsersAddress,
    addAddress,
    setDefault,
    updateAddress,
    deleteAddress
}