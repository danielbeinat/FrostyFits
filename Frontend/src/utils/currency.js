/**
 * Utility functions for currency formatting
 */

/**
 * Formats a number as Argentine pesos
 * @param {number} amount - The amount to format
 * @returns {string} The formatted amount with ARS symbol
 */
export const formatPrice = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '$0';
    }

    return `$${amount.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
};

/**
 * Formats a number as Argentine pesos with decimal places
 * @param {number} amount - The amount to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} The formatted amount with ARS symbol
 */
export const formatPriceWithDecimals = (amount, decimals = 2) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '$0,00';
    }

    return `$${amount.toLocaleString('es-AR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })}`;
};
