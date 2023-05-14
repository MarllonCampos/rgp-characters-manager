document.addEventListener("DOMContentLoaded", () => {

    const characterInput = document.getElementById("image")
    characterInput.onchange =getImageFromInput;

    const addCharacter = document.getElementById("add-character")
    console.log(addCharacter)
    addCharacter.onclick = showPopUp

})

function getImageFromInput(event) { 
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file);

    reader.onloadend = (event) => {  
        console.log(event.target.result);
    }
}
function showPopUp() {
    console.log("popup")
    const popup = document.getElementsByClassName("popup")[0]
    popup.classList.add("popup--active")
}