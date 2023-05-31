const character = new Character();

document.addEventListener('DOMContentLoaded', () => {
  const characterForm = document.getElementById('character-form');
  characterForm.onsubmit = submitForm;
  const addCharacter = document.getElementById('add-character');
  addCharacter.onclick = showPopUp;
  character.list();
});

function submitForm(event) {
  event.preventDefault();
  const elements = event.target.elements;
  const name = elements.name.value;
  const hp = elements.hp.value;
  const ap = elements.ap.value;
  const sanity = elements.name.value;
  const type = Array.from(elements.category).find((category) => category.checked).value;
  const attributes = [{ maxHp: hp }, { hp }, { maxSanity: sanity }, { sanity }, { maxAp: ap }, { ap }];
  character.create({ name, type, attributes });
  closePopUp();
}

function showPopUp() {
  const popup = document.getElementsByClassName('popup')[0];
  popup.classList.add('popup--active');
  document.body.classList.add('.overflow-hidden');
}

window.addEventListener('keydown', (event) => {
  if (event.key != 'Escape') return;
  closePopUp();
});

function closePopUp() {
  const popup = document.querySelector('.popup');
  popup.classList.remove('popup--active');
  document.body.classList.remove('.overflow-hidden');
}
