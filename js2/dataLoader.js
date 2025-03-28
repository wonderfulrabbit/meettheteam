import { updateCharacterSelect, changeCharacter } from "./character.js";
import 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js';

export let characters = {};
export let classes = {};
export let abilities = {};
export let equipment = {};

export async function loadData() {
    const response = await fetch("../data/characters.yaml");
    const classResponse = await fetch("../data/classes.yaml");
    const abilityResponse = await fetch("../data/abilities.yaml");
    const equipmentResponse = await fetch("../data/equipment.yaml");

    const characterData = await response.text();
    const classData = await classResponse.text();
    const abilityData = await abilityResponse.text();
    const equipmentData = await equipmentResponse.text();

    characters = jsyaml.load(characterData);
    classes = jsyaml.load(classData);
    abilities =  jsyaml.load(abilityData);
    equipment = jsyaml.load(equipmentData);

    const characterList = Object.keys(characters);
    updateCharacterSelect(characterList);
    changeCharacter(characterList[0]);
}