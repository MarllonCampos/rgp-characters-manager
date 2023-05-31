class Character {
  PLUS_ICON = `<svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg>`;

  MINUS_ICON = `<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Remove_Minus"> <path id="Vector" d="M6 12H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`;
  constructor() {
    this.localStorageKey = 'x-all-characters';
    this.characterTypes = {
      MOBS: 'monster',
      PLAYERS: 'player',
    };
  }

  create({ name, type, image }) {
    console.log('create');
    const allCharacters = this.findCharacters();
    const character = { name, type, image, index: this.countSpecificCharacter(type) };
    allCharacters.push(character);
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(allCharacters));
    this.list();
  }

  findCharacters() {
    const allCharacters = window.localStorage.getItem(this.localStorageKey);
    return !allCharacters ? [] : JSON.parse(allCharacters);
  }

  countSpecificCharacter(type = 'player') {
    if (/(mob|player)/g.test(type)) return 0;
    const allCharacters = this.findCharacters();
    return allCharacters.filter((character) => character.type === type).length;
  }

  list() {
    const allCharacter = this.findCharacters();
    if (allCharacter.length <= 0) return;
    const CHARACTERS_CONTAINER = document.querySelector('#characters');
    const MONSTERS_CONTAINER = document.querySelector('#mobs');
    allCharacter.forEach((character) => {
      const characterContainer = document.createElement('div');
      characterContainer.classList.add('characters__character-container');
      const characterImage = document.createElement('img');
      characterImage.classList.add('characters__character-container__image');

      const characterButtonContainer = document.createElement('div');
      characterButtonContainer.classList.add('characters__character-container__position-container');

      const characterIncreasePosition = document.createElement('button');
      characterIncreasePosition.classList.add('characters__character-container__increase-position');
      characterIncreasePosition.classList.add('characters__character-container__button');
      characterIncreasePosition.innerHTML = this.PLUS_ICON;

      const characterDecreasePosition = document.createElement('button');
      characterDecreasePosition.classList.add('characters__character-container__button');
      characterDecreasePosition.innerHTML = this.MINUS_ICON;
      characterButtonContainer.appendChild(characterIncreasePosition);
      characterButtonContainer.appendChild(characterDecreasePosition);

      const characterName = document.createElement('p');
      characterName.classList.add('characters__character-container__name');

      characterName.innerHTML = character.name;
      characterImage.src = character.image;

      characterContainer.appendChild(characterButtonContainer);
      characterContainer.appendChild(characterImage);
      characterContainer.appendChild(characterName);
      if (character.type == this.characterTypes.MOBS) return MONSTERS_CONTAINER.appendChild(characterContainer);
      if (character.type === this.characterTypes.PLAYERS) return CHARACTERS_CONTAINER.appendChild(characterContainer);
      alert('If you are seeing this message, please contact the creator, github: marlloncampos');
    });
  }
}
