const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const usersRoutes = require('../modules/users/users.routes');
const productsRoutes = require('../modules/products/products.routes');
const { success } = require('../utils/response');

const router = express.Router();

router.get('/health', (req, res) => success(res, { status: 'ok' }));
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

module.exports = router;
