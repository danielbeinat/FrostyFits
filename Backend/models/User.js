import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now },
    // wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

});

export default mongoose.model("User", UserSchema);
