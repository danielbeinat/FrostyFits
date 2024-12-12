import User from "../models/User.js";

export const addToCart = async (req, res) => {

    try {

        const userData = await User.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;



        // Obtener detalles del producto
        // const productDetails = await Product.findById(itemId);
        // console.log('Detalles del producto agregado:', productDetails); // Muestra los detalles del producto

        await User.findOneAndUpdate({ _id: req.user.id }, {
            cartData: userData.cartData
        });


        res.send({ success: true, message: "Added to cart" });


    } catch (err) {
        res.status(500).json({ msg: err.message });


    }


};




export const removeFromCart = async (req, res) => {

    try {
        const userData = await User.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) - 1;
        await User.findOneAndUpdate({ _id: req.user.id }, {
            cartData: userData.cartData
        });
        res.send({ success: true, message: "Removed from cart" });
    } catch (err) {
        res.status(500).json({ msg: err.message });

    }
};



export const getCart = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id }); // `req.user.id` proviene de `authMiddleware`
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        res.json(user.cartData); // Devuelve los datos del carrito
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error del servidor" });
    }
};
