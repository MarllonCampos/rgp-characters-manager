class Character {
  DELETE_ICON = `<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

  INCREASE_ICON = `<svg width="22px" height="22px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 13l-6-6-6 6"></path> </g></svg>`;

  DECREASE_ICON = `<svg width="22px" height="22px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 13l-6-6-6 6"></path> </g></svg>`;

  constructor() {
    this.localStorageKey = 'x-all-characters';
    this.characterTypes = {
      MOBS: 'monster',
      PLAYERS: 'player',
    };
    this.CHARACTERS_CONTAINER = document.querySelector('#characters');
  }

  create({ name, type, attributes }) {
    const allCharacters = this.findCharacters();
    const character = { name, type, index: this.countSpecificCharacter(type), attributes };
    allCharacters.push(character);

    this.setStorage(allCharacters);
    this.list();
  }

  findCharacters() {
    const allCharacters = window.localStorage.getItem(this.localStorageKey);
    return !allCharacters ? [] : JSON.parse(allCharacters);
  }

  countSpecificCharacter(type = 'player') {
    if (/(monster|player)/g.test(type) === false) return Alert('Tipo de monstro não conhecido');
    const lengthCharacterFromType = Array.from(
      document.querySelectorAll(`button[data-character-index*='${type}']`)
    ).length;

    return lengthCharacterFromType;
  }

  clearList() {
    const characters = document.querySelectorAll('.characters__character-container');

    characters.forEach((character) => {
      character.parentNode.removeChild(character);
    });
  }

  setStorage(allCharacters) {
    if (!Array.isArray(allCharacters)) return;
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(allCharacters));
  }

  delete(event) {
    event.target.parentNode.classList.add('deleteCharacterAnimation');
    const dataAttribute = event.target.getAttribute('data-character-index');
    const [type, index] = dataAttribute.split('-');
    const allCharacters = this.findCharacters();
    const specificCharacter = allCharacters.find((character) => character.type == type && character.index == index);
    event.target.parentNode.addEventListener('animationend', (parentNode) => {
      parentNode.target.style.height = '0px';
      parentNode.target.style.display = 'none';
      const finalList = allCharacters.filter(
        (character) => JSON.stringify(character) !== JSON.stringify(specificCharacter)
      );
      this.CHARACTERS_CONTAINER.removeChild(event.target.parentNode);
      this.setStorage(finalList);
    });
  }

  changePosition(character, number) {
    const formattedNumber = Number(number);
    const allCharacters = this.findCharacters();
    const typeCharacters = allCharacters.filter((characterArray) => characterArray.type === character.type);
    const counterTypeCharacters = allCharacters.filter((characterArray) => characterArray.type !== character.type);
    const indexOfCharacter = typeCharacters.findIndex(
      (typeCharacter) => JSON.stringify(typeCharacter) === JSON.stringify(character)
    );
    const nextCharacterIndex = indexOfCharacter + formattedNumber;
    if (nextCharacterIndex + 1 > typeCharacters.length || nextCharacterIndex < 0) return alert('Menor indice possível');
    const previousCharacter = typeCharacters[nextCharacterIndex];
    typeCharacters[nextCharacterIndex] = { ...character, index: nextCharacterIndex };
    typeCharacters[indexOfCharacter] = { ...previousCharacter, index: indexOfCharacter };
    this.setStorage([...typeCharacters, ...counterTypeCharacters]);
    this.list();
  }

  list() {
    const allCharacter = this.findCharacters();
    if (allCharacter.length <= 0) return;
    this.clearList();
    const sortedCharacter = allCharacter.sort(
      (previousCharacter, nextCharacter) => previousCharacter.index - nextCharacter.index
    );
    sortedCharacter.forEach((character) => {
      const characterContainer = document.createElement('div');
      characterContainer.classList.add('characters__character-container');
      characterContainer.setAttribute('data-type', character.type);

      // User Name
      const characterName = document.createElement('p');
      characterName.classList.add('characters__character-container__name');
      characterName.innerHTML = character.name;

      // Position Buttons Container
      const characterButtonContainer = document.createElement('div');
      characterButtonContainer.classList.add('characters__character-container__position-container');

      const characterIncreasePosition = document.createElement('button');
      characterIncreasePosition.classList.add('characters__character-container__increase-position');
      characterIncreasePosition.classList.add('characters__character-container__button');
      characterIncreasePosition.innerHTML = this.INCREASE_ICON;
      characterIncreasePosition.value = -1;
      characterIncreasePosition.addEventListener('click', (event) =>
        this.changePosition(character, event.target.value)
      );

      const characterDecreasePosition = document.createElement('button');
      characterDecreasePosition.classList.add('characters__character-container__button');
      characterDecreasePosition.innerHTML = this.DECREASE_ICON;
      characterDecreasePosition.value = 1;
      characterDecreasePosition.addEventListener('click', (event) =>
        this.changePosition(character, event.target.value)
      );

      // Append change position buttons to container
      characterButtonContainer.appendChild(characterIncreasePosition);
      characterButtonContainer.appendChild(characterDecreasePosition);

      const deleteCharacterButton = document.createElement('button');
      deleteCharacterButton.setAttribute('type', 'button');
      deleteCharacterButton.setAttribute('data-character-index', `${character.type}-${character.index}`);
      deleteCharacterButton.classList.add('characters__character-container__delete-character');
      deleteCharacterButton.innerHTML = this.DELETE_ICON;
      deleteCharacterButton.addEventListener('click', (event) => this.delete(event));

      const maxAttributes = Object.entries(character.attributes).filter(([key, _value], _) => /^max/gi.test(key));

      const attributesContainer = document.createElement('div');
      attributesContainer.classList.add('characters__character-container__attributes-container');
      maxAttributes.forEach(([key, value]) => {
        const maxAttributeButton = document.createElement('button');
        maxAttributeButton.setAttribute('type', 'button');
        maxAttributeButton.setAttribute('value', value);
        maxAttributeButton.setAttribute('data-attribute', key.toLowerCase());
        maxAttributeButton.textContent = value;
        maxAttributeButton.classList.add('characters__character-container__attribute-button');

        const normalAttributeButton = document.createElement('button');
        normalAttributeButton.setAttribute('type', 'button');
        normalAttributeButton.setAttribute('value', value);
        normalAttributeButton.setAttribute('data-attribute', key.replace(/max/g, '').toLowerCase());

        normalAttributeButton.textContent = value;
        normalAttributeButton.classList.add('characters__character-container__attribute-button');

        attributesContainer.appendChild(maxAttributeButton);
        attributesContainer.appendChild(normalAttributeButton);
      });

      characterContainer.appendChild(characterButtonContainer);
      characterContainer.appendChild(characterName);
      characterContainer.appendChild(attributesContainer);
      characterContainer.appendChild(deleteCharacterButton);
      this.CHARACTERS_CONTAINER.appendChild(characterContainer);
    });
  }
}
