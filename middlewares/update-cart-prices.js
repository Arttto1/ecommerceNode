async function updateCartPrices(req, res, next) {
  const cart = res.locals.cart

  await cart.updateCartPrices()

  next()
}

module.exports = updateCartPrices