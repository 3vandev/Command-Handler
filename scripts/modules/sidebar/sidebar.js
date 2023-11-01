import { world } from "@minecraft/server";
import { SS } from "../../utils/SS";

let longest = 0;

export class row {
    constructor(text, line = 0, indent = 0) {
        this.text = text;
        for (let i = 0; i < indent; i++) {
            this.text = " " + this.text;
        }
        this.text = "§.§r" + this.text;
        this.text = "\n".repeat(line) + this.text;
    }
}

export class sidebar {
    constructor(title, rows = []) {
        this.title = title || ""; // add a check to ensure title is defined
        this.rows = rows;

        for (const row of this.rows) {
            if (row.text.length > longest) {
                longest = row.text.length;
            }
        }

        const titleNoColor = this.title.replace(/§./g, '');;
        const center = Math.floor((longest / 2) - (titleNoColor.length));
        const titleRow = new row(" ".repeat(center) + this.title + " ".repeat(center), 0);

        this.sidebar = titleRow.text + "\n";
        for (const row of this.rows) {
            this.sidebar += row.text + "\n";
        }
    }

    display(player) {
        player.runCommand(`title "${player.name}" title ${this.sidebar}`)
    }
}