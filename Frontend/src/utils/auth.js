// Secure token management utilities
class TokenManager {
    constructor() {
        this.TOKEN_KEY = 'auth-token';
        this.REFRESH_TOKEN_KEY = 'refresh-token';
        this.USER_KEY = 'user_data';
    }

    // Secure token storage
    setToken(token, refreshToken = null) {
        try {
            // Consistent storage in both development and production
            localStorage.setItem(this.TOKEN_KEY, token);
            if (refreshToken) {
                localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
            }
        } catch (error) {
            console.error('Error setting token:', error);
        }
    }

    getToken() {
        try {
            // Always read from localStorage to match login/register
            return localStorage.getItem(this.TOKEN_KEY);
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }

    getRefreshToken() {
        try {
            // Always read from localStorage to match login/register
            return localStorage.getItem(this.REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error('Error getting refresh token:', error);
            return null;
        }
    }

    removeToken() {
        try {
            // Always remove from localStorage to match login/register
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error('Error removing token:', error);
        }
    }

    // Helper to read cookies (only works for non-httpOnly cookies)
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Token validation
    isTokenValid() {
        const token = this.getToken();
        if (!token) return false;

        try {
            // Decode JWT payload (basic validation)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;

            // Check if token is expired
            return payload.exp > currentTime;
        } catch (error) {
            console.error('Error validating token:', error);
            return false;
        }
    }

    // Refresh token logic
    async refreshToken() {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return false;

        try {
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (response.ok) {
                const data = await response.json();
                this.setToken(data.token, data.refreshToken);
                return true;
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
        }

        return false;
    }

    // User data management
    setUser(userData) {
        try {
            if (import.meta.env.PROD) {
                // Store non-sensitive data in localStorage
                localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
            } else {
                sessionStorage.setItem(this.USER_KEY, JSON.stringify(userData));
            }
        } catch (error) {
            console.error('Error setting user data:', error);
        }
    }

    getUser() {
        try {
            const userData = import.meta.env.PROD
                ? localStorage.getItem(this.USER_KEY)
                : sessionStorage.getItem(this.USER_KEY);

            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error getting user data:', error);
            return null;
        }
    }

    removeUser() {
        try {
            localStorage.removeItem(this.USER_KEY);
            sessionStorage.removeItem(this.USER_KEY);
        } catch (error) {
            console.error('Error removing user data:', error);
        }
    }

    // Complete logout
    logout() {
        this.removeToken();
        this.removeUser();

        // Clear all storage
        try {
            localStorage.clear();
            sessionStorage.clear();
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    }
}

// Input sanitization utilities
class InputSanitizer {
    // Sanitize string input
    static sanitizeString(input) {
        if (typeof input !== 'string') return '';

        return input
            .trim()
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .replace(/javascript:/gi, '') // Remove javascript protocol
            .replace(/on\w+=/gi, '') // Remove event handlers
            .slice(0, 1000); // Limit length
    }

    // Sanitize email
    static sanitizeEmail(email) {
        if (typeof email !== 'string') return '';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const sanitized = this.sanitizeString(email.toLowerCase());

        return emailRegex.test(sanitized) ? sanitized : '';
    }

    // Sanitize numeric input
    static sanitizeNumber(input, min = 0, max = Infinity) {
        const num = parseInt(input, 10);

        if (isNaN(num)) return min;
        return Math.max(min, Math.min(max, num));
    }

    // Sanitize phone number
    static sanitizePhone(phone) {
        if (typeof phone !== 'string') return '';

        return phone
            .replace(/[^\d+\-\s()]/g, '') // Keep only valid phone characters
            .slice(0, 20); // Limit length
    }

    // XSS prevention
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// API request interceptor for security
class SecureAPI {
    constructor(tokenManager) {
        this.tokenManager = tokenManager;
        this.baseURL = import.meta.env.VITE_API_URL || 'https://impossible-berny-dev321-195cbe0d.koyeb.app';
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Add auth token if available
        let token = this.tokenManager.getToken();
        if (!token) {
            try {
                token = localStorage.getItem('auth-token');
            } catch (_) {
                token = null;
            }
        }
        if (token) {
            config.headers['auth-token'] = token;
        }

        // Add CSRF protection
        if (config.method !== 'GET') {
            config.headers['X-CSRF-Token'] = this.getCSRFToken();
        }

        try {
            const response = await fetch(url, config);

            // Handle token refresh
            if (response.status === 401) {
                const refreshed = await this.tokenManager.refreshToken();
                if (refreshed) {
                    // Retry request with new token
                    config.headers['Authorization'] = `Bearer ${this.tokenManager.getToken()}`;
                    return fetch(url, config);
                }
            }

            return response;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    getCSRFToken() {
        // Get CSRF token from meta tag or cookie
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) return metaTag.getAttribute('content');

        return this.tokenManager.getCookie('csrf_token') || '';
    }

    // Convenience methods
    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

export { TokenManager, InputSanitizer, SecureAPI };
export default { TokenManager, InputSanitizer, SecureAPI };
