import { middle, contentMaker, createCopyButton } from "./utils.js";
import { aliasMaker } from "./aliasHandler.js";

export function updateBasicInfo(character) {
    document.querySelector('#character-name').innerHTML = character.name;    
    document.querySelector('#character-level').innerHTML = character.level;
    document.querySelector('#character-player').innerHTML = character.player;
    document.querySelector('#trait-identity').innerHTML = character.traits.identity;
    document.querySelector('#trait-origin').innerHTML = character.traits.origin;
    document.querySelector('#trait-theme').innerHTML = character.traits.theme;
}

export function updateStats(stats) {
    Object.entries(stats).forEach(([statId, statData]) => updateStatField(statId, statData));
}

function updateStatField(statId, statData) {
    document.querySelector(`#stat-${statId}`).innerHTML = statData;

    const tag = document.querySelector(`#stat-${statId} + .tag.selectable`);
    tag.replaceWith(tag.cloneNode(true));

    const newTag = document.querySelector(`#stat-${statId} + .tag.selectable`);
    newTag.addEventListener('click', () => {
        const slot1 = document.querySelector('#slot-1');
        const slot2 = document.querySelector('#slot-2');
        const slot = !slot1.value ? slot1 : (!slot2.value ? slot2 : null);
        if (!slot) return;
        slot.value = `${statId.toUpperCase()}: ${statData}`;
    });
}

export function updateCombatStats(stats, characterClass, level) {
    document.querySelector('#combat-hp').innerHTML = level + 5 * stats.mig;
    document.querySelector(`#combat-mp`).innerHTML = level + 5 * stats.wlp;
    document.querySelector(`#combat-ip`).innerHTML = 6; 
    document.querySelector(`#combat-extrainit`).innerHTML = 0; 
    document.querySelector(`#combat-def`).innerHTML = stats.dex; 
    document.querySelector(`#combat-mdef`).innerHTML = stats.ins; 
}

export function updateTooltips(stats, characterClass, level) {
    document.querySelector(`.tag.base`).innerHTML = characterClass.hp;
    document.querySelector(`.tag.base`).setAttribute("data-tooltip", `From ${characterClass.name} class`);
    document.querySelector(`.tag.base`).setAttribute("data-placement", `right`);

    ["str", "dex", "con", "int", "wis", "cha"].forEach(stat => {
        document.querySelectorAll(`.tag.${stat}`).forEach(e => {
            e.setAttribute("data-tooltip", stats[stat].value);
            e.setAttribute("data-placement", "right")
        });
    });

    document.querySelectorAll(".tag.lvl").forEach(e => {
        e.setAttribute("data-tooltip", level);
        e.setAttribute("data-placement", "right");
    });

    document.querySelectorAll(".tag.class").forEach(e => {
        e.setAttribute("data-tooltip", characterClass.name);
        e.setAttribute("data-placement", "right");
    });
}

export function updateDefenses(stats, characterClass, level) {
    const saves = {
        fort: ["str", "dex", "con"],
        ref: ["dex", "con", "wis"],
        will: ["int", "wis", "cha"]
    };

    Object.entries(saves).forEach(([id, statsArr]) => {
        const baseValue = characterClass[id] || 0;
        const statValues = statsArr.map(stat => stats[stat]?.value || 0);
        const total = baseValue + middle(...statValues);

        document.querySelector(`#stat-${id}`).innerHTML = total;
        document.querySelector(`.tag.${id}`).innerHTML = baseValue
        document.querySelector(`.tag.${id}`).setAttribute("data-tooltip", `From ${characterClass.name} class`);
        document.querySelector(`.tag.${id}`).setAttribute("data-placement", `right`);
    });
}

export function updateEntries(containerId, entries, user, stats) {
    const container = document.querySelector(containerId);
    container.innerHTML = "";

    if (!entries) return;

    Object.values(entries).forEach(entry => {
        container.appendChild(createEntryElement(entry, user, stats));
    });
}

function createEntryElement(entry, user, stats) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="card-header">
          <div class="card-title">
            <h3>${entry.name} 💲 ${entry.command}</h3>
            <div class="tags">
            </div>
          </div>
          <button class="copy-btn">
            <i class="fas fa-copy"></i>
          </button>
        </div>
        <div class="card-content">
            ...     
        </div>`;

    const title = card.querySelector('.card-title');
    const content = card.querySelector('.card-content');
    content.style.display = 'none';
    title.addEventListener('click', () => {
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });

    const tags = card.querySelector('.tags');
    entry.labels?.forEach((label) => {
        tags.innerHTML += `<div class="tag">${label}</div>`;
    });

    card.querySelector('.card-content').innerHTML = contentMaker(entry);

    const button = card.querySelector('.copy-btn');
    button.addEventListener('click', () => {
        const alias = aliasMaker(entry, user, stats);
        navigator.clipboard.writeText(alias);
    });

    return card;
}
