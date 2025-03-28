import { initializeNavigation } from "./navigation.js";
import { initializeDropdown } from "./dropdown.js";
import { initializeStatRoll } from "./diceroll.js";
import { loadData } from "./dataLoader.js";

document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializeDropdown();
    initializeStatRoll();
    loadData();
});

