export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export function catchAsync(fn) {
    return async (req, res) => {
        try {
            await fn(req, res);
        } catch (error) {
            console.error('Error:', error);

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };
}

export function handleError(res, error) {
    console.error('Error:', error);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
}
