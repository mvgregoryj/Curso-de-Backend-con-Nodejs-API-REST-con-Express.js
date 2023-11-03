// Middleware para logear errores
function logErrors (err, req, res, next) {
    console.log('logErrors');
    console.log(err);
    next(err);
}

// Middleware para crear un estandar de formato cada vez que se envía un error
function errorHandler (err, req, res, next) {
    console.log('errorHandler');
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}

function boomErrorHandler (err, req, res, next) {
    console.log('boomErrorHandler');
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    } else {
      next(err);
    }
}
module.exports = { logErrors, errorHandler, boomErrorHandler };