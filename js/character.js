import { addStatToSlot } from "./elements/statrollmenu.js";
import { Card } from "./card.js";
import { darkenRGB } from "./utils.js";

export class Character {
    constructor(character, equipment, abilities, attacks) {
        this.base = character;
        this.equipment = equipment;
        this.abilities = abilities;
        this.attacks = attacks;
    }

    updateAll(){
        this.#updateBaseHTML();
        this.#updateStatsHTML();
        this.#updateCombatStatsHTML();
        this.#updateEquipmentHTML();
        this.#updateAbilitiesHTML();
        this.#updateAttacksHTML();
    }

    #updateBaseHTML() {
        document.querySelector('#character-name').innerHTML = this.base.name;    
        document.querySelector('#character-level').innerHTML = this.base.level;
        document.querySelector('#character-player').innerHTML = this.base.player;
        document.querySelector('#trait-identity').innerHTML = this.base.traits.identity;
        document.querySelector('#trait-origin').innerHTML = this.base.traits.origin;
        document.querySelector('#trait-theme').innerHTML = this.base.traits.theme;
    }

    #updateStatsHTML() {
        Object.entries(this.base.stats).forEach(([id, value]) => {
            document.querySelector(`#stat-${id}`).innerHTML = value;

            const tag = document.querySelector(`#stat-${id} + .tag.selectable`);
            const newTag = tag.cloneNode(true);
            tag.replaceWith(newTag);

            newTag.addEventListener('click', () => addStatToSlot(id, value));
        });
    }

    #updateCombatStatsHTML() {
        document.querySelector('#combat-hp').innerHTML = this.base.level + 5 * this.base.stats.mig + this.abilities.class1.bonus.hp + this.abilities.class2.bonus.hp;
        document.querySelector(`#combat-mp`).innerHTML = this.base.level + 5 * this.base.stats.wlp + this.abilities.class1.bonus.mp + this.abilities.class2.bonus.mp;
        document.querySelector(`#combat-ip`).innerHTML = 6; 
        document.querySelector(`#combat-extrainit`).innerHTML = 0 +  + (this.equipment.armor?.bonus?.init || 0); 
        // Calculate DEF for tanks
        const armorDefBonus = this.equipment.armor?.bonus?.def || 0;
        const offHandBonus = this.equipment.offhand?.bonus?.def || 0;
        document.querySelector(`#combat-def`).innerHTML = armorDefBonus >= 10 ? armorDefBonus + offHandBonus : this.base.stats.dex + armorDefBonus + offHandBonus;
        // Calculate MDEF
        document.querySelector(`#combat-mdef`).innerHTML = this.base.stats.ins + (this.equipment.offhand?.bonus?.mdef || 0) + (this.equipment.armor?.bonus?.mdef || 0); 
    }

    #updateEquipmentHTML() {
        document.querySelector('#equip-mainhand').innerHTML = this.equipment.mainhand.name;
        document.querySelector(`#equip-offhand`).innerHTML = this.equipment.offhand.name;
        document.querySelector(`#equip-armor`).innerHTML = this.equipment.armor.name;
        document.querySelector(`#equip-accessory`).innerHTML = this.equipment.accessory.name;
    }

    #updateAbilitiesHTML() {
        // Cache
        const class1El = document.querySelector('#build-class-1');
        const class2El = document.querySelector('#build-class-2');
        const container = document.querySelector('#build-container');
        const class1 = this.abilities.class1;
        const class2 = this.abilities.class2;

        // Update header elements with class names and levels
        class1El.innerHTML = `${class1.name} (${class1.level}⭐)`;
        class2El.innerHTML = `${class2.name} (${class2.level}⭐)`;

        // Set background colors with !important override
        class1El.style.setProperty('background-color', class1.color, 'important');
        class2El.style.setProperty('background-color', class2.color, 'important');

        // If there are no abilities, exit
        if (!this.abilities.list) return;

        container.innerHTML = "";

        Object.values(this.abilities.list).forEach(ability => {
            const card = new Card(`${ability.name} (${ability.level}⭐)`, ability, this.base.stats);
            const cardEl = card.Show;
        
            // Update background colors based on ability tags
            if (ability.tags.includes(class1.name)) {
                cardEl.style.setProperty('background-color', class1.color, 'important');
                // Find all tag elements within the .tags container and darken their background
                const tagContainer = cardEl.querySelector('.tags');
                if (tagContainer) {
                    Array.from(tagContainer.children).forEach(tag => {
                        tag.style.setProperty('background-color', darkenRGB(class1.color), 'important');
                    });
                }
            } else if (ability.tags.includes(class2.name)) {
                cardEl.style.setProperty('background-color', class2.color, 'important');
                const tagContainer = cardEl.querySelector('.tags');
                if (tagContainer) {
                    Array.from(tagContainer.children).forEach(tag => {
                        tag.style.setProperty('background-color', darkenRGB(class2.color), 'important');
                    });
                }
            }
        
            container.appendChild(cardEl);
        });
    }

    #updateAttacksHTML() {
        // Obtener el contenedor de equipamiento
        const equipCards = document.getElementById('equip-cards');
        const stats = this.base.stats;
        const { mainhand, offhand } = this.equipment;

        equipCards.innerHTML = "";
    
        // Si el arma principal tiene propiedad de defensa, se crea su tarjeta
        if (mainhand?.defense) {
            const card = new Card(mainhand.name, mainhand, stats);
            equipCards.appendChild(card.Show);
        }
    
        // Si el arma secundaria tiene propiedad de defensa, se crea su tarjeta
        if (offhand?.defense) {
            const card = new Card(offhand.name, offhand, stats);
            equipCards.appendChild(card.Show);
        }
    
        // Obtener el contenedor de hechizos y agregar cada tarjeta de hechizo
        const spellCards = document.getElementById('spell-cards');

        spellCards.innerHTML = "";

        Object.values(this.attacks).forEach(attack => {
            const card = new Card(attack.name, attack, stats);
            spellCards.appendChild(card.Show);
        });
    }
}