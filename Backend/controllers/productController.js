import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
    try {
        const { name, image, category, price, aviable, type } = req.body;
        const newProduct = new Product({ name, image, category, price, aviable, type, sizes: [] });
        await newProduct.save();
        res.json({ success: true, product: newProduct });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


export const removeProduct = async (req, res) => {
    try {
        const result = await Product.deleteOne({ _id: req.body.id });
        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, msg: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};




export const updateProduct = async (req, res) => {
    try {
        const { id, name, image, category, price, aviable, type, sizes } = req.body;
        await Product.updateOne({ _id: id }, { name, image, category, price, aviable, type, sizes });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};



export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const newCollection = async (req, res) => {

    try {

        const product = await Product.find({});
        const newcollection = product.slice(1).slice(-8);
        res.send(newcollection);
    } catch (error) {

        res.status(500).send({ error: "Error fetching products" });

    }

}


export const trending = (async (req, res) => {
    try {
        const products = await Product.find({});
        const trending = products.sort((a, b) => a.price - b.price);
        const newTrending = trending.slice(0, 8);
        res.send(newTrending);
    } catch (error) {
        res.status(500).send({ error: "Error fetching products" });
    }
});


