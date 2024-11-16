const imageInput = document.getElementById("imageInput");
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const resizeButton = document.getElementById("resizeButton");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let originalImage = null;

imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            originalImage = img;
            widthInput.value = img.width;
            heightInput.value = img.height;
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
});

resizeButton.addEventListener("click", () => {
    const width = parseInt(widthInput.value, 10);
    const height = parseInt(heightInput.value, 10);

    if (!originalImage) {
        alert("Por favor, selecione uma imagem primeiro!");
        return;
    }

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        alert("Por favor, insira valores válidos para largura e altura.");
        return;
    }

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(originalImage, 0, 0, width, height);

    const resizedImageURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = resizedImageURL;
    downloadLink.download = "imagem_redimensionada.png";
    downloadLink.click();
});
