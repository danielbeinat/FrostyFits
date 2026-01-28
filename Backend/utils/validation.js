import Joi from 'joi';

export const schemas = {
    product: Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
            .messages({
                'string.empty': 'Product name is required',
                'string.min': 'Product name must be at least 3 characters',
                'string.max': 'Product name must not exceed 100 characters',
                'any.required': 'Product name is required'
            }),

        price: Joi.number()
            .positive()
            .max(999999)
            .required()
            .messages({
                'number.base': 'Price must be a number',
                'number.positive': 'Price must be positive',
                'number.max': 'Price must not exceed $999,999',
                'any.required': 'Price is required'
            }),

        category: Joi.string()
            .valid('women', 'men', 'kid', 'shoes')
            .required()
            .messages({
                'any.only': 'Category must be one of: women, men, kid, shoes',
                'any.required': 'Category is required'
            }),

        type: Joi.string()
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.empty': 'Product type is required',
                'string.min': 'Product type must be at least 2 characters',
                'string.max': 'Product type must not exceed 50 characters',
                'any.required': 'Product type is required'
            }),

        image: Joi.string()
            .uri()
            .required()
            .messages({
                'string.uri': 'Image must be a valid URL',
                'any.required': 'Product image is required'
            }),

        sizes: Joi.array()
            .items(Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '39', '40', '41', '42', '43', '44'))
            .optional()
            .default([]),

        stock: Joi.number()
            .integer()
            .min(0)
            .max(999999)
            .required()
            .messages({
                'number.base': 'Stock must be a number',
                'number.integer': 'Stock must be an integer',
                'number.min': 'Stock cannot be negative',
                'number.max': 'Stock must not exceed 999,999',
                'any.required': 'Stock is required'
            }),

        discount: Joi.number()
            .min(0)
            .max(100)
            .default(0)
            .messages({
                'number.min': 'Discount cannot be negative',
                'number.max': 'Discount cannot exceed 100%'
            }),

        aviable: Joi.boolean()
            .default(true)
    }),

    user: Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.empty': 'Name is required',
                'string.min': 'Name must be at least 2 characters',
                'string.max': 'Name must not exceed 50 characters',
                'any.required': 'Name is required'
            }),

        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            }),

        password: Joi.string()
            .min(6)
            .max(128)
            .required()
            .messages({
                'string.min': 'Password must be at least 6 characters',
                'string.max': 'Password must not exceed 128 characters',
                'any.required': 'Password is required'
            })
    }),

    login: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            }),

        password: Joi.string()
            .required()
            .messages({
                'any.required': 'Password is required'
            })
    }),

    productUpdate: Joi.object({
        id: Joi.string()
            .required()
            .messages({
                'any.required': 'Product ID is required'
            }),

        name: Joi.string()
            .min(3)
            .max(100)
            .optional()
            .messages({
                'string.min': 'Product name must be at least 3 characters',
                'string.max': 'Product name must not exceed 100 characters'
            }),

        price: Joi.number()
            .positive()
            .max(999999)
            .optional()
            .messages({
                'number.positive': 'Price must be positive',
                'number.max': 'Price must not exceed $999,999'
            }),

        category: Joi.string()
            .valid('women', 'men', 'kid', 'shoes')
            .optional()
            .messages({
                'any.only': 'Category must be one of: women, men, kid, shoes'
            }),

        type: Joi.string()
            .min(2)
            .max(50)
            .optional()
            .messages({
                'string.min': 'Product type must be at least 2 characters',
                'string.max': 'Product type must not exceed 50 characters'
            }),

        image: Joi.string()
            .uri()
            .optional()
            .messages({
                'string.uri': 'Image must be a valid URL'
            }),

        sizes: Joi.array()
            .items(Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '39', '40', '41', '42', '43', '44'))
            .optional()
            .default([]),

        stock: Joi.number()
            .integer()
            .min(0)
            .max(999999)
            .optional()
            .messages({
                'number.integer': 'Stock must be an integer',
                'number.min': 'Stock cannot be negative',
                'number.max': 'Stock must not exceed 999,999'
            }),

        discount: Joi.number()
            .min(0)
            .max(100)
            .optional()
            .messages({
                'number.min': 'Discount cannot be negative',
                'number.max': 'Discount cannot exceed 100%'
            }),

        aviable: Joi.boolean()
            .optional()
    })
};

export const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[source], {
            abortEarly: false,
            stripUnknown: true,
            convert: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message,
                value: detail.context.value
            }));

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors,
                received: req[source]
            });
        }

        req[source] = value;
        next();
    };
};

export const sanitizeInput = (req, res, next) => {
    const sanitizeString = (str) => {
        if (typeof str !== 'string') return str;
        return str
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '')
            .trim();
    };

    const sanitizeObject = (obj) => {
        if (typeof obj !== 'object' || obj === null) return obj;

        const sanitized = {};
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string') {
                sanitized[key] = sanitizeString(value);
            } else if (Array.isArray(value)) {
                sanitized[key] = value.map(item =>
                    typeof item === 'string' ? sanitizeString(item) : sanitizeObject(item)
                );
            } else if (typeof value === 'object' && value !== null) {
                sanitized[key] = sanitizeObject(value);
            } else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    };

    if (req.body) req.body = sanitizeObject(req.body);
    if (req.query) req.query = sanitizeObject(req.query);
    if (req.params) req.params = sanitizeObject(req.params);

    next();
};
