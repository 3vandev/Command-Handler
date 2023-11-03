import { world, system } from "@minecraft/server";
import { SS } from "../../utils/SS";
import { a } from "../../database/playerRank"
import { c } from "../../database/playerMoney"
import { ChestFormData } from "../../extensions/forms.js";

class Shop {
    constructor(name, items) {
        this.name = name;
        this.items = items;

        this.menu = new ChestFormData('large')
            .title(SS("8", this.name));
        for (let i = 0; i < this.items.length; i++) {
            this.menu.button(i, SS("a", this.items[i].name), [SS("7", this.items[i].price + "g")], this.items[i].iconPath);
        }
    }
    open(player) {
        system.runTimeout(() => {
            this.menu.button(49, SS("a", `Welcome to the shop!\nYou have ${SS("6", c.get(player.name).money + "g")}`), [], "minecraft:barrier");
            this.menu.show(player).then((data) => {
                data.slot = data.selection;
                if (parseFloat(c.get(player.name).money) >= this.items[data.slot].price) {
                    player.sendMessage("§aYou bought a " + this.items[data.slot].name + "!");
                    this.items[data.slot].onBuy(player);
                    c.set(player.name, { money: parseFloat(c.get(player.name).money) - this.items[data.slot].price });
                }
            });
        }, 20 * 3);
    }
}

class shopItem {
    constructor(name, price, onBuy, iconPath) {
        this.name = name;
        this.price = price;
        this.onBuy = onBuy;
        this.iconPath = iconPath;
    }
}

export const shop = new Shop("Rank Shop", [
    new shopItem("Garnet", 100, (player) => {
        a.set(player.name, { rank: "garnet" });
    }, "minecraft:redstone_block"),
    new shopItem("Amethyst", 200, (player) => {
        a.set(player.name, { rank: "amethyst" });
    }, "minecraft:emerald_block"),
    new shopItem("Topaz", 300, (player) => {
        a.set(player.name, { rank: "topaz" });
    }, "minecraft:gold_block"),
    new shopItem("Sapphire", 400, (player) => {
        a.set(player.name, { rank: "sapphire" });
    }, "minecraft:diamond_block"),
    new shopItem("Emerald", 500, (player) => {
        a.set(player.name, { rank: "emerald" });
    }, "minecraft:emerald"),
    new shopItem("Ruby", 600, (player) => {
        a.set(player.name, { rank: "ruby" });
    }, "minecraft:redstone"),
    new shopItem("Diamond", 700, (player) => {
        a.set(player.name, { rank: "diamond" });
    }, "minecraft:diamond"),
    new shopItem("Obsidian", 800, (player) => {
        a.set(player.name, { rank: "obsidian" });
    }, "minecraft:obsidian"),
    new shopItem("Bedrock", 900, (player) => {
        a.set(player.name, { rank: "bedrock" });
    }, "minecraft:bedrock"),
    new shopItem("Netherite", 1000, (player) => {
        a.set(player.name, { rank: "netherite" });
    }, "minecraft:netherite_block"),
    new shopItem("Dragon", 1100, (player) => {
        a.set(player.name, { rank: "dragon" });
    }, "minecraft:dragon_egg"),
    new shopItem("God", 1200, (player) => {
        a.set(player.name, { rank: "god" });
    }, "minecraft:nether_star"),
    new shopItem("God+", 1300, (player) => {
        a.set(player.name, { rank: "god+" });
    }, "minecraft:nether_star"),
    new shopItem("God++", 1400, (player) => {
        a.set(player.name, { rank: "god++" });
    }, "minecraft:nether_star"),
    new shopItem("God+++", 1500, (player) => {
        a.set(player.name, { rank: "god+++" });
    }, "minecraft:nether_star"),
]);
