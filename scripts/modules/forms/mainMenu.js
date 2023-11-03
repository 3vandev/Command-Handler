import { ChestFormData } from "../../extensions/forms";
import { world, system} from "@minecraft/server"

import { a } from "../../database/playerRank"
import { c } from "../../database/playerMoney"

import { inCombatDatabase } from "../../database/playerInCombat";

import { SS } from "../../utils/SS";
import { numberWithCommas } from "../../utils/numberFormat";

world.afterEvents.itemUse.subscribe((data) => {
    if(data.itemStack.typeId == "minecraft:nether_star") {
        mainMenu(data.source);
    }
});

export function mainMenu(player) {
    let menu = new ChestFormData();
    menu.title(SS("8", "Main Menu"));
    for (let i = 0; i < 35; i++) {
        menu.button(i, SS("a", ""), [], "textures/blocks/glass_black.png");
    }
    if(inCombatDatabase.get(player.name).inCombat) {
        menu.button(0, SS("a", "Combat"), ["",SS('8','You are in combat'),SS('c','Press to exit combat')], "minecraft:iron_sword", 1, true);
    }
    else {
        menu.button(0, SS("a", "Combat"), ["",SS('8','Fight other players for'), SS('a','Press to join combat')], "minecraft:iron_sword");
    }

    menu.button(1, SS("a", `${player.name}'s Stats`), ["", `${SS('7', "Jewls:")} ${SS('a', numberWithCommas(c.get(player.name).money))}`, `${SS('7', "Rank:")} ${SS('a', numberWithCommas(a.get(player.name).rank).toUpperCase())}`], "minecraft:skull");
    menu.button(12, SS("a", "Shop"), ["",SS('8','Upgrade your items for'), SS('8','a better advantage in combat')], "minecraft:gold_block");
    menu.button(13, SS("a", "Warps"), ["",SS('8','Warp to your favorite arenas')], "minecraft:totem_of_undying");
    menu.button(14, SS("a", "Sell"), ["",SS('8','Sell items for money')], "minecraft:emerald_block");

    menu.show(player).then((data) => {
        player.runCommand("playsound note.pling @s")
        if(data.selection == 0) {
            if(inCombatDatabase.get(player.name).inCombat) {
                player.sendMessage("§cYou are no longer in combat!");
                inCombatDatabase.set(player.name, { inCombat: false });
            }
            else {
                player.sendMessage("§aYou are now in combat!");
                inCombatDatabase.set(player.name, { inCombat: true });
            }
        }
    });
}