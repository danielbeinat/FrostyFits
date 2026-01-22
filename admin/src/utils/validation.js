// Product validation utilities
export const validateProduct = (product) => {
    const errors = {};

    // Name validation
    if (!product.name || product.name.trim().length === 0) {
        errors.name = "Product name is required";
    } else if (product.name.trim().length < 3) {
        errors.name = "Product name must be at least 3 characters";
    } else if (product.name.trim().length > 100) {
        errors.name = "Product name must be less than 100 characters";
    }

    // Price validation
    if (!product.price || product.price === "") {
        errors.price = "Price is required";
    } else if (isNaN(product.price)) {
        errors.price = "Price must be a valid number";
    } else if (parseFloat(product.price) <= 0) {
        errors.price = "Price must be greater than 0";
    } else if (parseFloat(product.price) > 99999) {
        errors.price = "Price must be less than $99,999";
    }

    // Category validation
    if (!product.category) {
        errors.category = "Category is required";
    }

    // Type validation
    if (!product.type) {
        errors.type = "Product type is required";
    }

    // Stock validation
    if (!product.stock || product.stock === "") {
        errors.stock = "Stock is required";
    } else if (isNaN(product.stock)) {
        errors.stock = "Stock must be a valid number";
    } else if (parseInt(product.stock) < 0) {
        errors.stock = "Stock cannot be negative";
    } else if (parseInt(product.stock) > 99999) {
        errors.stock = "Stock must be less than 99,999";
    }

    // Discount validation
    if (product.discount && product.discount !== "") {
        if (isNaN(product.discount)) {
            errors.discount = "Discount must be a valid number";
        } else if (parseFloat(product.discount) < 0) {
            errors.discount = "Discount cannot be negative";
        } else if (parseFloat(product.discount) > 100) {
            errors.discount = "Discount cannot be more than 100%";
        }
    }

    // Sizes validation
    if (!product.sizes || product.sizes.length === 0) {
        errors.sizes = "At least one size must be selected";
    }

    // Image validation
    if (!product.image) {
        errors.image = "Product image is required";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

// Login validation
export const validateLogin = (email, password) => {
    const errors = {};

    // Email validation
    if (!email || email.trim().length === 0) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password || password.length === 0) {
        errors.password = "Password is required";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

// File validation
export const validateImageFile = (file) => {
    const errors = {};

    if (!file) {
        errors.file = "Please select an image file";
        return { isValid: false, errors };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        errors.file = "Only JPEG, PNG, and WebP images are allowed";
    }

    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
        errors.file = "Image size must be less than 10MB";
    }

    // Check file name
    if (file.name.length > 255) {
        errors.file = "File name is too long";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

// Search validation
export const validateSearch = (query) => {
    const errors = {};

    if (query && query.trim().length > 0) {
        if (query.trim().length < 2) {
            errors.search = "Search query must be at least 2 characters";
        } else if (query.trim().length > 100) {
            errors.search = "Search query is too long";
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

// Sanitize input
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;

    return input
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript protocol
        .replace(/on\w+=/gi, ''); // Remove event handlers
};

// Format price
export const formatPrice = (price) => {
    const num = parseFloat(price);
    if (isNaN(num)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(num);
};

// Format discount
export const formatDiscount = (discount) => {
    const num = parseFloat(discount);
    if (isNaN(num) || num === 0) return '';
    return `${num}%`;
};

// Calculate final price with discount
export const calculateFinalPrice = (price, discount) => {
    const priceNum = parseFloat(price);
    const discountNum = parseFloat(discount) || 0;

    if (isNaN(priceNum)) return 0;

    const finalPrice = priceNum * (1 - discountNum / 100);
    return Math.round(finalPrice * 100) / 100; // Round to 2 decimal places
};
