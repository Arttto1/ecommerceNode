const express = require("express")

const productsController = require("../controllers/products-controller")

const router = express.Router()

router.get("/products", productsController.getProductsPage)

router.get("/products/:id", productsController.getProductDetais)

module.exports = router