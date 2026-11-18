const productsService = require('./products.service');
const { success } = require('../../utils/response');

async function listProducts(req, res) {
  return success(res, await productsService.listProducts());
}

async function getProduct(req, res) {
  return success(res, await productsService.getProduct(req.validated.params.id));
}

async function createProduct(req, res) {
  return success(res, await productsService.createProduct(req.validated.body), 201);
}

async function updateProduct(req, res) {
  return success(
    res,
    await productsService.updateProduct(req.validated.params.id, req.validated.body)
  );
}

async function deleteProduct(req, res) {
  await productsService.deleteProduct(req.validated.params.id);
  return res.status(204).end();
}

module.exports = { listProducts, getProduct, createProduct, updateProduct, deleteProduct };
