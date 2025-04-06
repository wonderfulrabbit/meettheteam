import 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js';
import { Character } from "./character.js";
import { toTitleCase } from "./utils.js";

export let characterNames = {};
export let characters = {};

export async function loadCharacterNames() {
    const { characterList } = await loadLists();

    characterNames = Object.entries(characterList).map(([id, character]) => ({
        id: id, 
        value: character.name || toTitleCase(id)
    }));
}

export async function loadCharacters() {
    const { characterList, inventoryList, abilityList, classList } = await loadLists();

    characters = Object.keys(characterList).reduce((acc, name) => {
        acc[name] = new Character(
            characterList[name],
            inventoryList[name] || {}, 
            abilityList[name] || {},
            classList[name] || {}
        );

        return acc;
    }, {});
}

async function loadLists() {
    const [characterList, inventoryList, abilityList, classList] = await Promise.all([
      loadYAML("../data/characters.yaml"),
      loadYAML("../data/inventory.yaml"),
      loadYAML("../data/abilities.yaml"),
      loadYAML("../data/class.yaml")
    ]);
  
    return { characterList, inventoryList, abilityList, classList };
  }

async function loadYAML(location) {
    const response = await fetch(location);
    const responseData = await response.text();
    return jsyaml.load(responseData);
}