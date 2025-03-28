import { characterNames, characters } from "../dataLoader.js";

export function initializeDropdown() {
    const dropdown = document.querySelector('#character-select');

    // Clear existing options
    dropdown.innerHTML = "";

    // Populate dropdown with character names
    characterNames.forEach(({ id, value }) => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = value;
        dropdown.appendChild(option);
    });

    // Retrieve the saved character id from localStorage, if any
    const savedCharacterId = localStorage.getItem('selectedCharacterId');

    // Determine the initial character id
    let initialCharacterId;
    if (savedCharacterId && characters[savedCharacterId]) {
        initialCharacterId = savedCharacterId;
        dropdown.value = savedCharacterId;
    } else {
        initialCharacterId = Object.keys(characters)[0];
    }

    // Update UI with the initial character
    characters[initialCharacterId].updateAll();

    // Handle dropdown selection and save the selection in localStorage
    dropdown.addEventListener("change", ({ target }) => {
        const selectedId = target.value;
        characters[selectedId].updateAll();
        localStorage.setItem('selectedCharacterId', selectedId);
    });
}