const logger = require('../utils/logger');
const { failure } = require('../utils/response');

function notFound(req, res) {
  return failure(res, `Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404);
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  logger.error('Error en la solicitud', {
    method: req.method,
    path: req.originalUrl,
    message: err.message
  });

  if (err.code === 'ER_DUP_ENTRY') {
    return failure(res, 'Ya existe un registro con esos datos', 409);
  }

  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return failure(res, 'La referencia indicada no existe', 400);
  }

  if (Number.isInteger(err.statusCode) && err.statusCode >= 400 && err.statusCode < 500) {
    return failure(res, err.message, err.statusCode);
  }

  return failure(
    res,
    process.env.NODE_ENV === 'production' ? 'Error interno del servidor' : err.message,
    500
  );
}

module.exports = { notFound, errorHandler };
