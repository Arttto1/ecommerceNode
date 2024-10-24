const allDeleteProductBtns = document.querySelectorAll(".product-item button")

async function deleteProduct(event) {
    const button = event.target
    const productId = button.dataset.productid
    const csrfToken = button.dataset.csrf

    const response = await fetch("/admin/products/" + productId + "?_csrf=" + csrfToken, {
        method: "DELETE",
    })

    if (!response.ok) {
        alert("something went wrong!")
        return
    }

    button.parentElement.parentElement.parentElement.parentElement.remove()
}

for(const oneDeleteProductBtn of allDeleteProductBtns) {
    oneDeleteProductBtn.addEventListener("click", deleteProduct)
}