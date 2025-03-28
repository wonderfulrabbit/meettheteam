import { toTitleCase } from "../utils.js";

export function addStatToSlot(id, value) {
    const slots = [
        document.querySelector('#slot-1'),
        document.querySelector('#slot-2')
    ];
    const availableSlot = slots.find(slot => !slot.value);
    if (!availableSlot) return;

    availableSlot.value = `${id.toUpperCase()}: ${value}`;

    _initializeSlotEvents(slots);
}

// Private function to initialize event listeners (slots & roll button)
function _initializeSlotEvents(slots) {
    slots.forEach(slot => slot.addEventListener('click', () => (slot.value = '')));

    document.querySelector('#btn-roll').addEventListener('click', () => _handleRoll(slots));
}

// Private function to handle stat rolling logic
function _handleRoll(slots) {
    if (!slots.every(slot => slot.value)) return;

    const [stat1, stat2] = slots.map(slot => _extractStat(slot.value));
    const embed = _generateEmbed(stat1, stat2);

    navigator.clipboard.writeText(embed);
}

// Private function to extract stat details
function _extractStat(input) {
    const match = input.match(/^(\w+):\s*(\d+)$/);
    return match ? { name: match[1], value: match[2] } : { name: "", value: "" };
}

// Private function to generate the embed command
function _generateEmbed(stat1, stat2) {
    const name = document.getElementById("character-select").value;
    return `!rollstat ${toTitleCase(name)} ${stat1.name} ${stat2.name} ${stat1.value} ${stat2.value}`;
}