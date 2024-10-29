const Product = require("./product-model")

class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity
    this.totalPrice = totalPrice
  }

  async updatePrices() {
    const productIds = this.items.map(() => {return item.product.id})

    const products = await Product.findMultiple(productIds)

    const deletablCartItemProductIds = []

    for (const cartItem of this.items) {
      const product = products.find((prod) => { return prod.id === cartItem.product.id})

      if (!product) {
        deletablCartItemProductIds.push(cartItem.product.id)
        continue
      }

      cartItem.product = product
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price
    }

    if (deletablCartItemProductIds.length > 0) {
      this.items = this.items.filter((item) => { return deletablCartItemProductIds.indexOf(item.product.id) < 0})
    }

    this.totalQuantity = 0
    this.totalPrice = 0

    for (const item of this.items) {
      this.totalQuantity += item.quantity
      this.totalPrice += item.totalPrice
    }
  }

  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price
    }

    this.totalQuantity++
    this.totalPrice += product.price    

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[0]
      if (item.product.id === product.id) {
        cartItem.quantity = +item.quantity + 1
        cartItem.totalPrice = item.totalPrice + product.price
        this.items[i] = cartItem

        return
      }
    }

    this.items.push(cartItem)
  }

  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[0]
      if (item.product.id === productId && newQuantity > 0) {
        const cartItem = {...item}
        const quantityChange = newQuantity - item.quantity
        cartItem.quantity = newQuantity
        cartItem.totalPrice = newQuantity * item.product.price
        this.items[i] = cartItem

        this.totalQuantity += quantityChange
        this.totalPrice += quantityChange * item.product.price
        return { updatedItemPrice: cartItem.totalPrice	}
      } else if (item.product.id === productId && newQuantity < 1) {
        this.items.splice(i, 1)
        this.totalQuantity -= item.quantity
        this.totalPrice -= item.totalPrice
        return { updatedItemPrice: 0	}
      }
    }
  }
}

module.exports = Cart
