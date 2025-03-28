class Char {
    constructor(character, equipment, abilities) {
        this.base = character;
        this.equipment = equipment[character.name];
        this.abilities = abilities[character.name];
    }
}

function getAllNames(charlist) {
    return charlist.map(char => char.name);
}