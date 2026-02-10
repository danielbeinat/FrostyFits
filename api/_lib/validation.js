import Joi from 'joi';

export const schemas = {
    product: Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().positive().max(999999).required(),
        category: Joi.string().valid('women', 'men', 'kid', 'shoes').required(),
        type: Joi.string().min(2).max(50).required(),
        image: Joi.string().uri().required(),
        sizes: Joi.array().items(Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '39', '40', '41', '42', '43', '44')).optional().default([]),
        stock: Joi.number().integer().min(0).max(999999).required(),
        discount: Joi.number().min(0).max(100).default(0),
        aviable: Joi.boolean().default(true)
    }),

    user: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(128).required()
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),

    productUpdate: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(3).max(100).optional(),
        price: Joi.number().positive().max(999999).optional(),
        category: Joi.string().valid('women', 'men', 'kid', 'shoes').optional(),
        type: Joi.string().min(2).max(50).optional(),
        image: Joi.string().uri().optional(),
        sizes: Joi.array().items(Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '39', '40', '41', '42', '43', '44')).optional().default([]),
        stock: Joi.number().integer().min(0).max(999999).optional(),
        discount: Joi.number().min(0).max(100).optional(),
        aviable: Joi.boolean().optional()
    })
};

export function validateData(schema, data) {
    const { error, value } = schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
        convert: true
    });

    if (error) {
        const errors = error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
        }));

        return { errors, value: null };
    }

    return { errors: null, value };
}
