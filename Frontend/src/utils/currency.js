export const formatPrice = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '$0';
    }

    return `$${amount.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
};

export const formatPriceWithDecimals = (amount, decimals = 2) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '$0,00';
    }

    return `$${amount.toLocaleString('es-AR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })}`;
};
