import { catchAsync, AppError } from "../middlewares/errorHandler.js";
import { logProduct } from "../config/logger.js";
import Product from "../models/Product.js";

export const addProduct = catchAsync(async (req, res, next) => {
    const { name, image, category, price, aviable, type, sizes, discount, stock } = req.body;

    // Validación personalizada: productos que no son Gorro deben tener al menos una talla
    if (type !== 'Gorro' && (!sizes || sizes.length === 0)) {
        return next(new AppError('At least one size must be selected for this product type', 400));
    }

    const newProduct = new Product({
        name,
        image,
        category,
        price,
        aviable,
        type,
        sizes,
        discount: discount || 0,
        stock: stock || 0
    });

    await newProduct.save();

    logProduct('Product added', newProduct._id, req.user?.id, {
        name,
        category,
        price
    });

    res.status(201).json({
        success: true,
        product: newProduct
    });
});

export const removeProduct = catchAsync(async (req, res, next) => {
    const { id } = req.body;

    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    await Product.findByIdAndDelete(id);

    logProduct('Product deleted', id, req.user?.id, {
        name: product.name
    });

    res.json({ success: true });
});

export const updateProduct = catchAsync(async (req, res, next) => {
    const { id, name, image, category, price, aviable, type, sizes, discount, stock } = req.body;

    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    const updateData = { name, image, category, price, aviable, type, sizes };

    if (discount !== undefined) updateData.discount = discount;
    if (stock !== undefined) updateData.stock = stock;

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );

    logProduct('Product updated', id, req.user?.id, {
        name: updatedProduct.name,
        changes: updateData
    });

    res.json({ success: true, product: updatedProduct });
});

export const allproducts = catchAsync(async (req, res, next) => {
    const products = await Product.find({}).sort({ date: -1 });

    res.json({ success: true, products });
});

export const newcollection = catchAsync(async (req, res, next) => {
    const products = await Product.find({}).sort({ date: -1 }).limit(8);

    res.json({ success: true, products });
});

export const trendingproducts = catchAsync(async (req, res, next) => {
    const products = await Product.find({ aviable: true })
        .sort({ price: 1 })  // Ordenar por precio ascendente (más baratos primero)
        .limit(8);

    res.json({ success: true, products });
});

export const getProductById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    res.json({ success: true, product });
});

export const getProductsByCategory = catchAsync(async (req, res, next) => {
    const { category } = req.params;

    const products = await Product.find({ category, aviable: true })
        .sort({ date: -1 });

    res.json({ success: true, products });
});

export const searchProducts = catchAsync(async (req, res, next) => {
    const { query } = req.query;

    if (!query) {
        return next(new AppError('Search query is required', 400));
    }

    const products = await Product.find({
        $and: [
            { aviable: true },
            {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { category: { $regex: query, $options: 'i' } },
                    { type: { $regex: query, $options: 'i' } }
                ]
            }
        ]
    }).sort({ date: -1 });

    res.json({ success: true, products });
});

