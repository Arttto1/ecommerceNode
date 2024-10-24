const Product = require("../models/product-model")

async function getProductsPage(req, res, next) {
  try {
    const products = await Product.findAll()
    res.render("costumer/products/all-products", { products: products})
  } catch(error) {
    next(error)
  }
}

module.exports = { getProductsPage }