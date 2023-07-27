class CharacterUI {
  DELETE_ICON = `<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

  INCREASE_ICON = `<svg width="22px" height="22px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 13l-6-6-6 6"></path> </g></svg>`;

  DECREASE_ICON = `<svg width="22px" height="22px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 13l-6-6-6 6"></path> </g></svg>`;

  constructor() {
    this.CHARACTERS_CONTAINER = document.querySelector('#characters');
  }

  clearList() {
    const characters = document.querySelectorAll('.characters__character-container');

    characters.forEach((character) => {
      character.parentNode.removeChild(character);
    });
  }

  delete(event) {
    const targetParentNode = event.target.parentNode;
    targetParentNode.classList.add('deleteCharacterAnimation');
    document.body.classList.add('overflow-hidden');

    targetParentNode.addEventListener('animationend', (parentNode) => {
      parentNode.target.style.height = '0px';
      parentNode.target.style.display = 'none';
      document.body.classList.remove('overflow-hidden');

      this.CHARACTERS_CONTAINER.removeChild(targetParentNode);
    });
  }

  createCharacterName = (character) => {
    const characterName = document.createElement('p');
    characterName.classList.add('characters__character-container__name');
    characterName.innerHTML = character.name;
    return characterName;
  };

  createButtonsContainer = (character) => {
    const characterButtonContainer = document.createElement('div');
    characterButtonContainer.classList.add('characters__character-container__position-container');

    const characterIncreasePosition = document.createElement('button');
    characterIncreasePosition.classList.add('characters__character-container__increase-position');
    characterIncreasePosition.classList.add('characters__character-container__button');
    characterIncreasePosition.innerHTML = this.INCREASE_ICON;
    characterIncreasePosition.value = -1;
    characterIncreasePosition.addEventListener('click', (event) => {
      character.changePosition(event.target.value);
    });

    const characterDecreasePosition = document.createElement('button');
    characterDecreasePosition.classList.add('characters__character-container__button');
    characterDecreasePosition.innerHTML = this.DECREASE_ICON;
    characterDecreasePosition.value = 1;
    characterDecreasePosition.addEventListener('click', (event) => {
      character.changePosition(event.target.value);
    });

    characterButtonContainer.appendChild(characterIncreasePosition);
    characterButtonContainer.appendChild(characterDecreasePosition);

    return characterButtonContainer;
  };

  createCharacterDeleteButton = (character) => {
    const deleteCharacterButton = document.createElement('button');
    deleteCharacterButton.setAttribute('type', 'button');
    deleteCharacterButton.classList.add('characters__character-container__delete-character');
    deleteCharacterButton.innerHTML = this.DELETE_ICON;
    deleteCharacterButton.addEventListener('click', (event) => {
      this.delete(event);
      character.delete();
    });

    return deleteCharacterButton;
  };

  createCharacterAttributeContainer = (character) => {
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
      maxAttributeButton.addEventListener('click', () => {
        character.changeAttribute({ attribute: key, value: 1 });
      });

      const normalAttributeButton = document.createElement('button');
      const normalAttribute = key.replace(/max/g, '').toLowerCase();
      normalAttributeButton.setAttribute('type', 'button');
      normalAttributeButton.setAttribute('value', value);
      normalAttributeButton.setAttribute('data-attribute', normalAttribute);
      normalAttributeButton.addEventListener('click', () => {
        character.changeAttribute({ attribute: normalAttribute, value: -1 });
      });
      normalAttributeButton.textContent = character.attributes[normalAttribute];
      normalAttributeButton.classList.add('characters__character-container__attribute-button');

      attributesContainer.appendChild(normalAttributeButton);
      attributesContainer.appendChild(maxAttributeButton);
    });

    return attributesContainer;
  };

  list() {
    const allCharacters = CharacterEdit.getCharacters().map((character) => new CharacterEdit(character));
    if (allCharacters.length <= 0) return;
    this.clearList();
    allCharacters.forEach((character) => {
      const characterContainer = document.createElement('div');
      characterContainer.classList.add('characters__character-container');
      characterContainer.setAttribute('data-type', character.type);
      characterContainer.setAttribute('data-id', character.id);

      // User Name
      const characterName = this.createCharacterName(character);

      // Position Buttons Container
      const characterButtonContainer = this.createButtonsContainer(character);

      const deleteCharacterButton = this.createCharacterDeleteButton(character);

      // Append characters attribute buttons
      const attributesContainer = this.createCharacterAttributeContainer(character);

      // Append all buttons and containers to main container
      characterContainer.appendChild(characterButtonContainer);
      characterContainer.appendChild(characterName);
      characterContainer.appendChild(attributesContainer);
      characterContainer.appendChild(deleteCharacterButton);
      this.CHARACTERS_CONTAINER.appendChild(characterContainer);
    });
  }
}
