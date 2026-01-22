/**
 * @typedef {Object} Product
 * @property {string} _id - Product ID
 * @property {string} name - Product name
 * @property {string} image - Product image URL
 * @property {string} category - Product category (women, men, kid, shoes)
 * @property {number} price - Product price
 * @property {number} discount - Discount percentage (0-100)
 * @property {number} stock - Available stock
 * @property {boolean} aviable - Product availability
 * @property {string} type - Product type
 * @property {string[]} sizes - Available sizes
 * @property {Date} date - Creation date
 */

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} name - User name
 * @property {string} email - User email
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user - Current user
 * @property {boolean} isAuthenticated - Authentication status
 * @property {boolean} loading - Loading state
 */

/**
 * @typedef {Object} Notification
 * @property {string} message - Notification message
 * @property {'success'|'error'|'warning'|'info'} type - Notification type
 */

/**
 * @typedef {Object} DashboardStats
 * @property {number} totalProducts - Total number of products
 * @property {number} totalStock - Total stock across all products
 * @property {number} lowStockProducts - Number of products with low stock
 * @property {Object.<string, number>} categories - Product count by category
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Request success status
 * @property {string} [message] - Response message
 * @property {any} [data] - Response data
 */

/**
 * @typedef {Object} FormErrors
 * @property {string} [name] - Name field error
 * @property {string} [price] - Price field error
 * @property {string} [category] - Category field error
 * @property {string} [type] - Type field error
 * @property {string} [stock] - Stock field error
 * @property {string} [discount] - Discount field error
 * @property {string} [sizes] - Sizes field error
 * @property {string} [image] - Image field error
 */

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email - User email
 * @property {string} password - User password
 */

/**
 * @typedef {Object} ProductFormData
 * @property {string} name - Product name
 * @property {string} image - Product image URL
 * @property {string} category - Product category
 * @property {string} price - Product price
 * @property {string} discount - Discount percentage
 * @property {string} stock - Available stock
 * @property {string} type - Product type
 * @property {string[]} sizes - Available sizes
 */

/**
 * @typedef {Object} NavigationItem
 * @property {string} name - Display name
 * @property {React.ReactNode} icon - Icon component
 * @property {string} to - Navigation path
 * @property {string} description - Item description
 */

/**
 * @typedef {Object} FilterOptions
 * @property {string} [search] - Search query
 * @property {string} [category] - Category filter
 * @property {string} [type] - Type filter
 */

// Export types for JSDoc usage
export {
    Product,
    User,
    AuthState,
    Notification,
    DashboardStats,
    ApiResponse,
    FormErrors,
    LoginCredentials,
    ProductFormData,
    NavigationItem,
    FilterOptions,
};
