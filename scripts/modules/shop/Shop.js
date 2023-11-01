import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

class Shop {
    constructor(name, items) {
        this.name = name;
        this.items = items;

        this.menu = new ActionFormData()
        .title("§c" + this.name)
        .body("§aWelcome to the shop!");
        for (const item of this.items) {
            this.menu.button("§a" + item.name + " §7- §a" + item.price + " coins");
        }
    }

    open(player) {
        this.menu.show(player).then((data) => {
            this.items[data.selection].buy(player);
        });
    }
}

class shopItem {
    constructor(name, price, onBuy) {
        this.name = name;
        this.price = price;
        this.onBuy = onBuy;
    }

    buy(player) {
        this.onBuy(player);
    }
}


/*
world.afterEvents.itemUse.subscribe((data) => {
    if(data.itemStack.typeId === "minecraft:nether_star") {
        testMenu(data.source);
    }
});

export function testMenu(player) {
    new ActionFormData()
    .title("§cTest Menu")
    .body("§aThis is a test menu")
    .button("§aClick me!")
    .show(player).then((data) => {
    });
}
*/
