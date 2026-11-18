const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/env');
const { failure } = require('../utils/response');

function authenticate(req, res, next) {
  const authorization = req.get('authorization');
  const [scheme, token] = authorization ? authorization.split(' ') : [];

  if (scheme !== 'Bearer' || !token) {
    return failure(res, 'Se requiere autenticación', 401);
  }

  try {
    req.user = jwt.verify(token, jwtConfig.secret);
    return next();
  } catch {
    return failure(res, 'El token no es válido o ha expirado', 401);
  }
}

module.exports = { authenticate };
