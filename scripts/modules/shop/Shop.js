import { world, system } from "@minecraft/server";
import { ActionFormData, FormCancelationReason } from "@minecraft/server-ui";
import { SS } from "../../utils/SS";
import { a } from "../../database/playerRank"
import { c } from "../../database/playerMoney"

class Shop {
    constructor(name, items) {
        this.name = name;
        this.items = items;

        this.menu = new ActionFormData()
        .title(SS("b",this.name))
        for (const item of this.items) {
            this.menu.button(`${SS('8', item.name)}\n${SS('6', item.price + "g")}`);
        }
    }
    open(player) {
        system.runTimeout(() => {
            this.menu.body(SS("a",`Welcome to the shop!\nYou have ${SS("6", c.get(player.name).money + "g")}`))
            this.menu.show(player).then((data) => {
                if(parseFloat(c.get(player.name).money) >= this.items[data.selection].price) {
                    player.sendMessage("§aYou bought a " + this.items[data.selection].name + "!");
                    this.items[data.selection].onBuy(player);
                    c.set(player.name, { money: parseFloat(c.get(player.name).money) - this.items[data.selection].price });
                }
            });
        }, 20 * 3);
    }
}

class shopItem {
    constructor(name, price, onBuy) {
        this.name = name;
        this.price = price;
        this.onBuy = onBuy;
    }
}

export const shop = new Shop("Rank Shop", [
    new shopItem("Garnet", 100, (player) => {
        a.set(player.name, { rank: "garnet" });
    }),
    new shopItem("Amethyst", 200, (player) => {
        a.set(player.name, { rank: "amethyst" });
    }),
    new shopItem("Topaz", 300, (player) => {
        a.set(player.name, { rank: "topaz" });
    }),
    new shopItem("Sapphire", 400, (player) => {
        a.set(player.name, { rank: "sapphire" });
    }),
    new shopItem("Emerald", 500, (player) => {
        a.set(player.name, { rank: "emerald" });
    }),
    new shopItem("Ruby", 600, (player) => {
        a.set(player.name, { rank: "ruby" });
    }),
    new shopItem("Diamond", 700, (player) => {
        a.set(player.name, { rank: "diamond" });
    }),
    new shopItem("Obsidian", 800, (player) => {
        a.set(player.name, { rank: "obsidian" });
    }),
]);
