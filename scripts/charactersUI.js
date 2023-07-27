class CharacterUI {
  DELETE_ICON = `<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ff2c06" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

  INCREASE_ICON = `<svg width="22px" height="22px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 13l-6-6-6 6"></path> </g></svg>`;

  DECREASE_ICON = `<svg width="22px" height="22px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 13l-6-6-6 6"></path> </g></svg>`;

  EDIT_ICON = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#16161d"></path> </g></svg>`;

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

  createCharacterEditButton = (character) => {
    const editCharacterButton = document.createElement('button');
    editCharacterButton.setAttribute('type', 'button');
    editCharacterButton.classList.add('characters__character-container__edit-character');
    editCharacterButton.innerHTML = this.EDIT_ICON;
    editCharacterButton.addEventListener('click', (event) => {
      console.log('EDITED');
    });

    return editCharacterButton;
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

      const editCharacterButton = this.createCharacterEditButton(character);

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
      characterContainer.appendChild(editCharacterButton);
      this.CHARACTERS_CONTAINER.appendChild(characterContainer);
    });
  }
}
