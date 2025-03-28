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
    const { characterList, equipmentList, abilityList, attackList } = await loadLists();

    characters = Object.keys(characterList).reduce((acc, name) => {
        acc[name] = new Character(
            characterList[name],
            equipmentList[name] || {}, 
            abilityList[name] || {},
            attackList[name] || {}
        );
        return acc;
    }, {});
}

async function loadLists() {
    const characterList = await loadYAML("../data/characters.yaml");
    const equipmentList = await loadYAML("../data/equipment.yaml");
    const abilityList = await loadYAML("../data/abilities.yaml");
    const attackList = await loadYAML("../data/attacks.yaml");

    return { characterList, equipmentList, abilityList, attackList };
}

async function loadYAML(location) {
    const response = await fetch(location);
    const responseData = await response.text();
    return jsyaml.load(responseData);
}