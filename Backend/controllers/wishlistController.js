// const User = require("../models/User");
// const Product = require("../models/Product");

// exports.addToWishlist = async (req, res) => {
//     try {
//         const { userId, productId } = req.body;

//         // Verificar si el producto existe
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ msg: "Product not found" });
//         }

//         // Agregar el producto a la wishlist del usuario
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         if (!user.wishlist.includes(productId)) {
//             user.wishlist.push(productId);
//             await user.save();
//             return res.json({ success: true, wishlist: user.wishlist });
//         } else {
//             return res.status(400).json({ msg: "Product already in wishlist" });
//         }
//     } catch (err) {
//         res.status(500).json({ msg: err.message });
//     }
// };


// exports.removeFromWishlist = async (req, res) => {
//     try {
//         const { userId, productId } = req.body;

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
//         await user.save();
//         res.json({ success: true, wishlist: user.wishlist });
//     } catch (err) {
//         res.status(500).json({ msg: err.message });
//     }
// };

// exports.getWishlist = async (req, res) => {
//     try {
//         const { userId } = req.query;

//         const user = await User.findById(userId).populate("wishlist");
//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         res.json({ success: true, wishlist: user.wishlist });
//     } catch (err) {
//         res.status(500).json({ msg: err.message });
//     }
// };
