const productsRepository = require('./products.repository');

function notFound() {
  const error = new Error('Producto no encontrado');
  error.statusCode = 404;
  return error;
}

async function listProducts() {
  return productsRepository.findAll();
}

async function getProduct(id) {
  const product = await productsRepository.findById(id);
  if (!product) throw notFound();
  return product;
}

async function createProduct(product) {
  return productsRepository.create(product);
}

async function updateProduct(id, product) {
  const updated = await productsRepository.update(id, product);
  if (!updated) throw notFound();
  return updated;
}

async function deleteProduct(id) {
  const deleted = await productsRepository.remove(id);
  if (!deleted) throw notFound();
}

module.exports = { listProducts, getProduct, createProduct, updateProduct, deleteProduct };
