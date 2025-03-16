export function initializeStatRoll() {
    const slot1 = document.querySelector('#slot-1');
    const slot2 = document.querySelector('#slot-2');
    const button = document.querySelector('#btn-roll');

    slot1.addEventListener('click', () => {
        slot1.value = '';
    });

    slot2.addEventListener('click', () => {
        slot2.value = '';
    });

    button.addEventListener('click', () => {
        if ( !slot1.value || !slot2.value ) return;
        const stat1 = extractStat(slot1.value);
        const stat2 = extractStat(slot2.value);
        const embed = simpleEmbedMaker(stat1, stat2);
        navigator.clipboard.writeText(embed);
    });
}

function simpleEmbedMaker(stat1, stat2) {
    const select = document.querySelector("#character-select");
    const str = select.value;
    const character = str.charAt(0).toUpperCase() + str.slice(1);

    return `!rollstat ${character} ${stat1.name} ${stat2.name} ${stat1.value} ${stat2.value}`;
}

function extractStat(input) {
    const match = input.match(/^(\w+):\s*(\d+)$/);
    return match ? { name: match[1], value: match[2] } : { name: "", value: "" };
}
