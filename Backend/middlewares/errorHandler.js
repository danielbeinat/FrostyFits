const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).send({
        error: {
            message: err.message || 'Error interno del servidor',
        },
    });
};

export default errorHandler;
