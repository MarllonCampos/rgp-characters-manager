const character = new CharacterUI();
const rpgTitle = document.querySelector('.main-container__title');

document.addEventListener('DOMContentLoaded', () => {
  const characterForm = document.getElementById('character-form');
  characterForm.onsubmit = submitForm;
  const rpgTitle = document.querySelector('.main-container__title');
  rpgTitle.addEventListener('input', editTitle);
  const addCharacter = document.getElementById('add-character');
  addCharacter.onclick = showPopUp;
  character.list();
  rpgTitle.textContent = window.localStorage.getItem('x-rpg-title') || 'Nome do RPG';
});

function editTitle(event) {
  window.localStorage.setItem('x-rpg-title', event.target.innerText);
}

function submitForm(event) {
  event.preventDefault();
  const elements = event.target.elements;
  const name = elements.name.value;
  const hp = elements.hp.value;
  const ap = elements.ap.value;
  const sanity = elements.sanity.value;
  const type = Array.from(elements.category).find((category) => category.checked).value;
  const attributes = { maxhp: hp, hp, maxap: ap, ap, maxsanity: sanity, sanity };
  const characterEdit = new CharacterEdit({ name, type, attributes });
  characterEdit.create();
  character.list();
  Array.from(elements).forEach((element) => {
    if (element.tagName.toLowerCase() === 'input' && element.type !== 'radio') element.value = '';
  });
  closePopUp();
}

function showPopUp() {
  const popup = document.getElementsByClassName('popup')[0];
  popup.classList.add('popup--active');
  document.body.classList.add('overflow-hidden');
}

window.addEventListener('keydown', (event) => {
  if (event.key != 'Escape') return;
  closePopUp();
});

function closePopUp() {
  const popup = document.querySelector('.popup');
  popup.classList.remove('popup--active');
  document.body.classList.remove('overflow-hidden');
}
