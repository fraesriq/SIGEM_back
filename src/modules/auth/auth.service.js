const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersRepository = require('../users/users.repository');
const { jwt: jwtConfig } = require('../../config/env');

async function register({ name, email, password }) {
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await usersRepository.create({ name, email, passwordHash });
  return { user, token: createToken(user) };
}

async function login({ email, password }) {
  const user = await usersRepository.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    const error = new Error('Correo electrónico o contraseña incorrectos');
    error.statusCode = 401;
    throw error;
  }

  const { passwordHash, ...safeUser } = user;
  return { user: safeUser, token: createToken(user) };
}

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  });
}

module.exports = { register, login };
