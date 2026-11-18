const usersRepository = require('./users.repository');

async function getProfile(userId) {
  const user = await usersRepository.findById(userId);
  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }
  return user;
}

async function listUsers() {
  return usersRepository.findAll();
}

module.exports = { getProfile, listUsers };
