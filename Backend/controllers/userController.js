import User from "../models/User.js";

export const addToCart = async (req, res) => {

    try {

        const userData = await User.findOne({ _id: req.user.id });
        const { itemId, quantity = 1 } = req.body;

        // Usar la cantidad enviada desde el frontend o default 1
        userData.cartData[itemId] = (userData.cartData[itemId] || 0) + quantity;


        // Obtener detalles del producto
        // const productDetails = await Product.findById(itemId);
        // console.log('Detalles del producto agregado:', productDetails); // Muestra los detalles del producto

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

        // Usar la cantidad enviada desde el frontend o default 1
        userData.cartData[itemId] = Math.max(0, (userData.cartData[itemId] || 0) - quantity);

        // Si la cantidad es 0, eliminar el item del carrito
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
