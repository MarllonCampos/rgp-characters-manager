class CharacterEdit {
  constructor(props) {
    this.characterUI = new CharacterUI();
    this.localStorageKey = CharacterEdit.#localStorageKey;
    if (props?.id) {
      this.character = props;
    } else this.character = { ...props, id: crypto.randomUUID() };
  }

  static get #localStorageKey() {
    return 'x-all-characters';
  }

  create() {
    const allCharacters = CharacterEdit.getCharacters();
    allCharacters.push(this.character);

    this.saveCharacters(allCharacters);
  }

  saveCharacters(allCharacters) {
    if (!Array.isArray(allCharacters)) return;
    window.localStorage.setItem(CharacterEdit.#localStorageKey, JSON.stringify(allCharacters));
  }

  indexOfObject() {
    const allCharacters = CharacterEdit.getCharacters();
    return allCharacters.findIndex((typeCharacter) => String(typeCharacter.id) === String(this.character.id));
  }

  changePosition(number) {
    const formattedNumber = Number(number);
    const allCharacters = CharacterEdit.getCharacters();
    const indexOfCharacter = this.indexOfObject(this.character);
    const nextCharacterIndex = indexOfCharacter + formattedNumber;
    const grandeur = number < 0 ? 'Maior' : 'Menor';
    if (nextCharacterIndex + 1 > allCharacters.length || nextCharacterIndex < 0)
      return alert(`${grandeur} indice possível`);
    const previousCharacter = allCharacters[nextCharacterIndex];
    allCharacters[nextCharacterIndex] = this.character;
    allCharacters[indexOfCharacter] = previousCharacter;
    this.saveCharacters(allCharacters);
    this.characterUI.list();
  }

  changeAttribute({ attribute, value }) {
    const allCharacters = CharacterEdit.getCharacters();

    const nonMaxAttribute = attribute.replace('max', '').toLowerCase();
    const isMaxAttribute = /max/gi.test(attribute);
    const maxAttribute = isMaxAttribute ? attribute : `max${attribute}`;

    const character = allCharacters.find((character) => character.id == this.character.id);
    const characterIndex = this.indexOfObject(character);
    const characterAttributeValue = Number(this.character.attributes[nonMaxAttribute]);
    const maxCharacterAttributeValue = Number(this.character.attributes[maxAttribute]);
    const newAttributeValue = String(characterAttributeValue + Number(value));
    const increaseMaxAttribute = newAttributeValue > maxCharacterAttributeValue;
    const specificAttributeButton = Array.from(document.querySelectorAll(`button[data-attribute=${nonMaxAttribute}]`))[
      characterIndex
    ];
    const maxAttributeButton = Array.from(document.querySelectorAll(`button[data-attribute=${maxAttribute}]`))[
      characterIndex
    ];

    function changeButtonValues(element, value) {
      element.value = value;
      element.innerHTML = value;
    }
    let newCharacter = { ...this.character };
    if (!isMaxAttribute) {
      changeButtonValues(specificAttributeButton, newAttributeValue);
      newCharacter.attributes[attribute] = newAttributeValue;
    }
    if (increaseMaxAttribute) {
      changeButtonValues(maxAttributeButton, newAttributeValue);
      changeButtonValues(specificAttributeButton, newAttributeValue);
      newCharacter.attributes[attribute] = newAttributeValue;
      newCharacter.attributes[nonMaxAttribute] = newAttributeValue;
    }
    if (!increaseMaxAttribute) {
      changeButtonValues(specificAttributeButton, newAttributeValue);
      newCharacter.attributes[nonMaxAttribute] = newAttributeValue;
    }
    allCharacters[characterIndex] = newCharacter;
    this.saveCharacters(allCharacters);
  }

  delete() {
    const allCharacters = CharacterEdit.getCharacters();
    const finalList = allCharacters.filter((characters) => characters.id != this.character.id);
    this.saveCharacters(finalList);
  }

  static getCharacters() {
    const allCharacters = window.localStorage.getItem(CharacterEdit.#localStorageKey);
    return !allCharacters ? [] : JSON.parse(allCharacters);
  }
}
