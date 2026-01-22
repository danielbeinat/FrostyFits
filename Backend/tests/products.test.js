import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

describe('Product Endpoints', () => {
    beforeEach(async () => {
        // Limpiar base de datos antes de cada test
        await Product.deleteMany({});
    });

    afterEach(async () => {
        // Limpiar base de datos después de cada test
        await Product.deleteMany({});
    });

    describe('POST /api/products/add', () => {
        it('should create a new product successfully', async () => {
            const productData = {
                name: 'Test Product',
                image: 'https://example.com/image.jpg',
                category: 'men',
                price: 99.99,
                type: 'Shirt',
                sizes: ['M', 'L', 'XL'],
                stock: 50,
                discount: 10,
                aviable: true
            };

            const response = await request(app)
                .post('/api/products/add')
                .send(productData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.product.name).toBe(productData.name);
            expect(response.body.product.price).toBe(productData.price);
            expect(response.body.product.category).toBe(productData.category);
        });

        it('should validate required fields', async () => {
            const response = await request(app)
                .post('/api/products/add')
                .send({})
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.errors).toBeDefined();
        });

        it('should validate price is positive', async () => {
            const productData = {
                name: 'Test Product',
                image: 'https://example.com/image.jpg',
                category: 'men',
                price: -10,
                type: 'Shirt',
                sizes: ['M'],
                stock: 10
            };

            const response = await request(app)
                .post('/api/products/add')
                .send(productData)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.errors).toBeDefined();
        });

        it('should validate category is valid', async () => {
            const productData = {
                name: 'Test Product',
                image: 'https://example.com/image.jpg',
                category: 'invalid',
                price: 99.99,
                type: 'Shirt',
                sizes: ['M'],
                stock: 10
            };

            const response = await request(app)
                .post('/api/products/add')
                .send(productData)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.errors).toBeDefined();
        });
    });

    describe('GET /api/products/allproducts', () => {
        beforeEach(async () => {
            // Create test products
            await Product.create([
                {
                    name: 'Product 1',
                    image: 'https://example.com/image1.jpg',
                    category: 'men',
                    price: 99.99,
                    type: 'Shirt',
                    sizes: ['M', 'L'],
                    stock: 50
                },
                {
                    name: 'Product 2',
                    image: 'https://example.com/image2.jpg',
                    category: 'women',
                    price: 149.99,
                    type: 'Dress',
                    sizes: ['S', 'M'],
                    stock: 30
                }
            ]);
        });

        it('should get all products', async () => {
            const response = await request(app)
                .get('/api/products/allproducts')
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.products).toHaveLength(2);
            expect(response.body.products[0].name).toBe('Product 1');
        });
    });

    describe('POST /api/products/removeproduct', () => {
        let productId;

        beforeEach(async () => {
            const product = await Product.create({
                name: 'Test Product',
                image: 'https://example.com/image.jpg',
                category: 'men',
                price: 99.99,
                type: 'Shirt',
                sizes: ['M'],
                stock: 50
            });
            productId = product._id;
        });

        it('should delete a product successfully', async () => {
            const response = await request(app)
                .post('/api/products/removeproduct')
                .send({ id: productId })
                .expect(200);

            expect(response.body.success).toBe(true);

            // Verify product is deleted
            const deletedProduct = await Product.findById(productId);
            expect(deletedProduct).toBeNull();
        });

        it('should return 404 for non-existent product', async () => {
            const fakeId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .post('/api/products/removeproduct')
                .send({ id: fakeId })
                .expect(404);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Product not found');
        });
    });

    describe('POST /api/products/update', () => {
        let productId;

        beforeEach(async () => {
            const product = await Product.create({
                name: 'Test Product',
                image: 'https://example.com/image.jpg',
                category: 'men',
                price: 99.99,
                type: 'Shirt',
                sizes: ['M'],
                stock: 50
            });
            productId = product._id;
        });

        it('should update a product successfully', async () => {
            const updateData = {
                id: productId,
                name: 'Updated Product',
                price: 149.99,
                stock: 100
            };

            const response = await request(app)
                .post('/api/products/update')
                .send(updateData)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.product.name).toBe(updateData.name);
            expect(response.body.product.price).toBe(updateData.price);
            expect(response.body.product.stock).toBe(updateData.stock);
        });

        it('should return 404 for non-existent product', async () => {
            const fakeId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .post('/api/products/update')
                .send({ id: fakeId, name: 'Updated Name' })
                .expect(404);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Product not found');
        });
    });
});
