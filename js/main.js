import { loadCharacterNames, loadCharacters } from "./dataLoader.js";
import { initializeDropdown } from "./elements/dropdown.js";
import { initializeNav } from "./elements/navigator.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Get variables
    await loadCharacterNames();
    await loadCharacters();

    // Initialize elements
    initializeNav();
    initializeDropdown();
});