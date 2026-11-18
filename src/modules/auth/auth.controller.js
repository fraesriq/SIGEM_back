const authService = require('./auth.service');
const { success } = require('../../utils/response');

async function register(req, res) {
  return success(res, await authService.register(req.validated.body), 201);
}

async function login(req, res) {
  return success(res, await authService.login(req.validated.body));
}

module.exports = { register, login };
