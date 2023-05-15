document.addEventListener("DOMContentLoaded", () => {

    const characterInput = document.getElementById("image")
    characterInput.onchange = getImageFromInput;

    const addCharacter = document.getElementById("add-character")
    addCharacter.onclick = showPopUp

})

function getImageFromInput(event) {
    const file = event.target.files[0]
    const popup = document.querySelector(".popup")

    const reader = new FileReader()
    reader.readAsDataURL(file);

    reader.onloadend = (loadEndEvent) => {
        const img = popup.querySelector("#preview-image")
        img.src = loadEndEvent.target.result
    }
}
function showPopUp() {
    const popup = document.getElementsByClassName("popup")[0]
    popup.classList.add("popup--active")
}

window.addEventListener("keydown", (event) => {
    if (event.key != "Escape") return
    closePopUp()
})



function closePopUp() {
    const popup = document.querySelector(".popup")
    popup.classList.remove("popup--active")
}