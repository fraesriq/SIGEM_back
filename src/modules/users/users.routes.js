const express = require('express');
const { authenticate } = require('../../middlewares/auth.middleware');
const usersController = require('./users.controller');

const router = express.Router();

router.use(authenticate);
router.get('/me', usersController.getProfile);
router.get('/', usersController.listUsers);

module.exports = router;
