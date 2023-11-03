// Import necessary modules
import { system, world, ItemStack, ItemLockMode } from "@minecraft/server";
import { SS } from "./utils/SS.js";
// Commands
import "./commands/commandHandler.js";

// Database
import "./database/playerInCombat.js";
import "./database/playerMoney.js";
import "./database/playerRank.js";

// Forms
import "./modules/forms/mainMenu.js";

// Misc
import "./modules/misc/customTags.js";
import "./modules/misc/playerSpawn.js";

// NPC
import "./modules/npc/test.js";
import "./modules/npcTags.js";

// SafeZone
import "./modules/safeZone/safeZoneHandler.js";

// Shop
import "./modules/shop/Shop.js";

// Sidebar
import "./modules/ui/sidebar/displaySidebar.js";
import "./modules/ui/Actionbar/Actionbar.js";

system.runInterval(()=>{
    let menu = new ItemStack("minecraft:nether_star", 1);
    menu.nameTag = SS(['r','e','l'], 'Menu')
    menu.setLore(['',SS(['r','7'], '§7Right click to open the menu!')])
    menu.lockMode = ItemLockMode.slot;

    for(const player of world.getPlayers()) {
        player.getComponent("inventory").container.setItem(8, menu)
    }
}, 100);