const addToCartBtn = document.querySelector("#product-details button")
const cartBadges = document.querySelectorAll(".badge")

async function addToCart() {
  const productId = addToCartBtn.dataset.productid
  const csrfToken = addToCartBtn.dataset.csrf
  let response

  try {
    response = await fetch("/cart/items", {
    method: "POST",
    body: JSON.stringify({
      productId: productId,
      _csrf: csrfToken
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }) 
  } catch(error) {
    alert("Something went wrong.")
    return
  }
  

  if (!response.ok) {
    alert("Something went wrong.")
    return
  }

  const responseData = await response.json()
  
  const newTotalQuantity = responseData.newTotalItem

  for (const cartBadge of cartBadges) {
    cartBadge.textContent = newTotalQuantity
  }
  
}

addToCartBtn.addEventListener("click", addToCart)