// Import necessary modules
import { world,system } from "@minecraft/server";
import { SS } from "../../utils/SS";

world.afterEvents.playerSpawn.subscribe((data) => {
    if(!data.initialSpawn) return;
    system.runTimeout(() => {
        data.player.sendMessage(`${SS("e", "WELCOME TO")} ${SS("l", "RUNECRAFT")}`);
    }, 20);
});