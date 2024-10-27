const Order = require("../models/order-model")

function addOrder(req, res) {
    const cart = res.locals.cart

    const order = new Order(cart, )
}

module.exports = { addOrder }