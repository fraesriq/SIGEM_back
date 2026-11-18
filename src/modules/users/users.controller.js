const usersService = require('./users.service');
const { success } = require('../../utils/response');

async function getProfile(req, res) {
  return success(res, await usersService.getProfile(req.user.id));
}

async function listUsers(req, res) {
  return success(res, await usersService.listUsers());
}

module.exports = { getProfile, listUsers };
