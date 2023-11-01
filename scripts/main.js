// Import necessary modules
import { system, world } from "@minecraft/server";
import "./commands/commandHandler.js";
import "./modules/sidebar/displaySidebar.js";
import "./modules/safeZone/safeZoneHandler.js";
import "./modules/shop/Shop.js";
import "./database/playerRank.js"

world.afterEvents.playerSpawn.subscribe((data) => {
    world.sendMessage("§aWelcome to the server!");
});