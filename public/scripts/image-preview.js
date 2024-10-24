const imageInput = document.querySelector("#image-upload-control input")
const imagePreview = document.querySelector("#image-upload-control img")

function updateImagePreview() {
    const files = imageInput.files

    if (!files || files.length === 0){
        imagePreview.style.display = "none"
        return
    }

    const selectedFile = files[0]

    imagePreview.src = URL.createObjectURL(selectedFile)
    imagePreview.style.display = "block"
}

imageInput.addEventListener("change", updateImagePreview)