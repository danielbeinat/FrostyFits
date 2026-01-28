import User from "../models/User.js";

export const addToCart = async (req, res) => {

    try {

        const userData = await User.findOne({ _id: req.user.id });
        const { itemId, quantity = 1 } = req.body;

        userData.cartData[itemId] = (userData.cartData[itemId] || 0) + quantity;

        await User.findOneAndUpdate({ _id: req.user.id }, {
            cartData: userData.cartData
        });


        res.send({ success: true, message: "Added to cart", cart: userData.cartData });


    } catch (err) {
        res.status(500).json({ msg: err.message });


    }


};




export const removeFromCart = async (req, res) => {

    try {
        const userData = await User.findOne({ _id: req.user.id });
        const { itemId, quantity = 1 } = req.body;

        userData.cartData[itemId] = Math.max(0, (userData.cartData[itemId] || 0) - quantity);

        if (userData.cartData[itemId] === 0) {
            delete userData.cartData[itemId];
        }

        await User.findOneAndUpdate({ _id: req.user.id }, {
            cartData: userData.cartData
        });
        res.send({ success: true, message: "Removed from cart", cart: userData.cartData });
    } catch (err) {
        res.status(500).json({ msg: err.message });

    }
};



export const getCart = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        res.json(user.cartData);
    } catch (err) {
        res.status(500).json({ msg: "Error del servidor" });
    }
};
