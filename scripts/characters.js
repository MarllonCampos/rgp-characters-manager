class Character {
  constructor() {
    this.localStorageKey = 'x-all-characters';
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
    const characterContainer = document.createElement('div');
    const characterImage = document.createElement('img');
    const characterIncreasePosition = document.createElement('button');
    const characterDecreasePosition = document.createElement('button');
    const characterName = document.createElement('p');
  }
}
