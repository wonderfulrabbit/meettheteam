import { addStatToSlot } from "./elements/statrollmenu.js";
import { Card } from "./card.js";
import { darkenRGB } from "./utils.js";

export class Character {
    constructor(character, inventory, abilities, role) {
        this.profile = character;
        this.inventory = inventory;
        this.abilities = abilities;
        this.role = role;
    }

    updateAll(){
        this.#updateProfileHTML();
        this.#updateInventoryHTML();
        this.#updateAbilitiesHTML();
        this.#updateRoleHTML();
    }

    #updateProfileHTML() {
        const elements = document.querySelectorAll("#section-profile strong");
        const values = [
            this.profile.name,
            this.profile.age,
            this.profile.height,
            this.profile.role,
            this.profile.body,
            this.profile.face,
            this.profile.vibe,
            this.profile.clothes_a,
            this.profile.clothes_b,
            this.profile.movement,
            this.profile.hometown,
            this.profile.reputation,
            this.profile.ideal,
            this.profile.flaw,
            this.profile.dream
        ];
    
        elements.forEach((el, i) => el.textContent = values[i]);
    }
    
    #updateInventoryHTML() {
        const elements = document.querySelectorAll("#section-inventory li");
    
        elements.forEach((el, i) => {
            el.textContent = this.inventory[i] ?? ""; // Set to item if exists, else empty
        });
    }

    #updateAbilitiesHTML() {
        const container = document.querySelector("#section-abilities div");
        container.innerHTML="";

        this.abilities.forEach(card => {
            const div = document.createElement("div");
            div.className = "card";

            // Title
            div.innerHTML += `
            <div class="card-title">
                <span class="line"></span>
                <span>${card.title}</span>
                <span class="line"></span>
            </div>`;

            // Tag
            if (card.tag) {
                div.innerHTML += `<div class="card-tag">${card.tag}</div>`;
            }

            // Paragraphs
            card.paragraphs.forEach(p => {
            const para = document.createElement("p");
            para.className = "card-body";

            if (p.number !== undefined) {
                para.innerHTML = `<span class="card-number">${p.number}</span> ${p.text}`;
            } else if (p.label) {
                para.innerHTML = `<strong>${p.label}</strong> ${p.text}`;
            } else {
                para.innerHTML = p.text;
            }

            div.appendChild(para);
            });

            // Footer
            div.innerHTML += `
            <div class="card-footer">
                <span>${card.footer.role}</span>
                <span>${card.footer.path} — <strong>${card.footer.root}</strong></span>
            </div>`;

            container.appendChild(div);
        });
    }

    #updateRoleHTML() {
        const roleTitle = document.querySelector("#section-class h4");
        roleTitle.textContent = `${this.role.title} PATHS`;

        const container = document.getElementById("paths-container");
        container.innerHTML = "";
        
        const entries = Object.entries(this.role.paths);
        entries.forEach(([pathName, abilities], index) => {
            const title = document.createElement("p");
            title.innerHTML = `<strong>${pathName}</strong>`;
            container.appendChild(title);

            const list = document.createElement("p");
            list.textContent = abilities.join(" — ");
            container.appendChild(list);

            if (index < entries.length - 1) {
                container.appendChild(document.createElement("hr"));
            }
        });
    }
}