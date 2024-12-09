import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    aviable: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
    type: { type: String, required: true }, // Nuevo campo para especificar el tipo
    sizes: { type: [String], default: [], required: true },



});


export default mongoose.model("Product", ProductSchema);
