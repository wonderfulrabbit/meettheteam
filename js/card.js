export class Card {
    constructor(title, attack, stats) {
        this.title = title;
        this.attack = attack;
        this.stats = stats;
        this.card = this.#createCard(title);
        this.#addTitleEventToCard(this.card);
        this.#addTagsToCard(this.card, attack.tags);
        this.#addContentToCard(this.card, attack);
        this.#addEventCopyToCard(this.card, attack, stats);
    }

    // Public getter to retrieve the created card element
    get Show() {
        return this.card;
    }

    // Private method to create the card element
    #createCard(title) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-header">
                <div class="card-title">
                    <h4>${title}</h4>
                    <div class="tags"></div>
                </div>
                <button class="copy-btn">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
            <div class="card-content">
                ...
            </div>`;
        
        return card;
    }

    // Private method to add a toggle event on the title that shows/hides the card content
    #addTitleEventToCard(card) {
        const titleElement = card.querySelector('.card-title');
        const contentElement = card.querySelector('.card-content');
        contentElement.style.display = 'none';
        titleElement.addEventListener('click', () => {
            contentElement.style.display = contentElement.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Private method to add tag elements to the card
    #addTagsToCard(card, tags) {
        const tagContainer = card.querySelector('.tags');
        tags.forEach(label => {
            tagContainer.innerHTML += `<div class="tag">${label}</div>`;
        });
    }

    // Private method to add the main content to the card based on attack data
    #addContentToCard(card, attack) {
        if (this.attack.type == "melee" || this.attack.type == "ranged" || this.attack.type == "spell") {
            const { stat1, stat2, attackbonus, defense, damagebonus, damagetype, description } = attack;
            const contentParts = [
                `<b>Attack:</b> ${stat1} + ${stat2} + ${attackbonus ? attackbonus + " " : ""}vs ${defense}`,
                `<b>Damage:</b> HR + ${damagebonus} ${damagetype}`,
                description ? `<em>${description}</em>` : ""
            ];
            const content = contentParts.filter(Boolean).join("<br>");
            card.querySelector('.card-content').innerHTML = content;
        }
        else if (this.attack.type == "ability") {
            const { description } = attack;
            const content =  description ? `<em>${description}</em>` : "";
            card.querySelector('.card-content').innerHTML = content;
        }
    }

    // Private method to attach an event to the copy button that generates an alias string and writes it to the clipboard
    #addEventCopyToCard(card, attack, stats) {
        const button = card.querySelector('.copy-btn');

        if (this.attack.type == "melee" || this.attack.type == "ranged" || this.attack.type == "spell") {
            const stat1Value = stats[attack.stat1.toLowerCase()];
            const stat2Value = stats[attack.stat2.toLowerCase()];

            button.addEventListener('click', () => {
                const aliasParts = [
                    `!use ${attack.type}`,
                    `"${attack.name}"`,
                    `"${attack.tags.join('|')}"`,
                    `"${attack.description.trim()}"`,
                    attack.stat1,
                    attack.stat2,
                    stat1Value,
                    stat2Value,
                    attack.attackbonus,
                    attack.damagebonus,
                    `"${attack.damagetype}"`,
                    attack.defense
                ];
                const alias = aliasParts.join(" ");
                navigator.clipboard.writeText(alias);
            });
        }
        else if (this.attack.type == "ability") {
            button.addEventListener('click', () => {
                const aliasParts = [
                    `!use ${attack.type}`,
                    `"${attack.name}"`,
                    `"${attack.tags.join('|')}"`,
                    `"${attack.description.trim()}"`,
                    `"${attack.level}"`
                ];
                const alias = aliasParts.join(" ");
                navigator.clipboard.writeText(alias);
            });
        }
    }
}