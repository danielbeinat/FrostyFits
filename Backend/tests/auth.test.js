import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

describe('Authentication Endpoints', () => {
    beforeEach(async () => {
        // Limpiar base de datos antes de cada test
        await User.deleteMany({});
    });

    afterEach(async () => {
        // Limpiar base de datos después de cada test
        await User.deleteMany({});
    });

    describe('POST /api/auth/signup', () => {
        it('should create a new user successfully', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/auth/signup')
                .send(userData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.token).toBeDefined();
            expect(response.body.user.email).toBe(userData.email);
            expect(response.body.user.name).toBe(userData.name);
            expect(response.body.user).not.toHaveProperty('password');
        });

        it('should not create user with existing email', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'Password123'
            };

            // Create first user
            await request(app)
                .post('/api/auth/signup')
                .send(userData);

            // Try to create second user with same email
            const response = await request(app)
                .post('/api/auth/signup')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Email already exists');
        });

        it('should validate required fields', async () => {
            const response = await request(app)
                .post('/api/auth/signup')
                .send({})
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.errors).toBeDefined();
        });

        it('should validate email format', async () => {
            const userData = {
                name: 'Test User',
                email: 'invalid-email',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/auth/signup')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.errors).toBeDefined();
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            // Create a test user for login tests
            const user = new User({
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashedpassword123' // This would be hashed in real scenario
            });
            await user.save();
        });

        it('should login with valid credentials', async () => {
            const loginData = {
                email: 'test@example.com',
                password: 'Password123' // This would need to match the hashed password
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.token).toBeDefined();
            expect(response.body.user.email).toBe(loginData.email);
        });

        it('should not login with invalid email', async () => {
            const loginData = {
                email: 'wrong@example.com',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Invalid email or password');
        });

        it('should not login with invalid password', async () => {
            const loginData = {
                email: 'test@example.com',
                password: 'wrongpassword'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Invalid email or password');
        });

        it('should validate required fields', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({})
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.errors).toBeDefined();
        });
    });
});
