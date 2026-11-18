const express = require('express');
const { z } = require('zod');
const { authenticate } = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const productsController = require('./products.controller');

const idParams = z.object({
  params: z.object({ id: z.coerce.number().int().positive() })
});
const productBody = z.object({
  body: z.object({
    name: z.string().trim().min(1).max(160),
    description: z.string().trim().max(2000).optional(),
    price: z.coerce.number().nonnegative(),
    stock: z.coerce.number().int().nonnegative()
  })
});
const router = express.Router();

router.use(authenticate);
router.get('/', productsController.listProducts);
router.get('/:id', validate(idParams), productsController.getProduct);
router.post('/', validate(productBody), productsController.createProduct);
router.put('/:id', validate(idParams.merge(productBody)), productsController.updateProduct);
router.delete('/:id', validate(idParams), productsController.deleteProduct);

module.exports = router;
