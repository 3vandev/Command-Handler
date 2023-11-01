// Import necessary modules
import { system, world } from "@minecraft/server";
import "./commands/commandHandler.js";
import "./modules/sidebar/displaySidebar.js";
import "./modules/safeZone/safeZoneHandler.js";
import "./modules/shop/Shop.js";
import "./database/playerRank.js"
import { setRank, a } from "./database/playerRank.js";
import { SS } from "./utils/SS.js";

world.afterEvents.playerSpawn.subscribe((data) => {
    world.sendMessage("§aWelcome to the server!");
});

system.runInterval(() => {
    for(const player of world.getPlayers()) {
        player.nameTag = `[${SS('7',a.get(player.name).rank.toUpperCase())}] ${player.name}\n${SS('c',Math.floor(player.getComponent("minecraft:health").currentValue) + "/20")}`;
    }
}, 20);