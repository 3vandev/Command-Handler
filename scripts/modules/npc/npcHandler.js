import { world, system} from "@minecraft/server";
import { npc } from "./npc.js";
import { SS } from "../../utils/SS.js";
import { mainMenu } from "../forms/mainMenu.js";

let npcs = null;

system.runTimeout(()=>{
    world.getDimension("overworld").runCommand("kill @e[type=rc:fakevillager]");
    npcs = [new npc("Jerry", { x: 368, y: 30, z: -96}, ["Hi [player]!", "welcome to RUNECRAFT", "A free for all server!", "Enjoy your stay!"]),
    new npc("Server Menu", { x: 378, y: 30, z: -96}, [], (player) => { mainMenu(player);})];
}, 60);

world.afterEvents.entityHitEntity.subscribe((event) => {
    const hitNpc = npcs.find(npc => npc.entity === event.hitEntity);
    if (hitNpc) {
        if(hitNpc.dialogue.length != 0) {
            for (let i = 0; i < hitNpc.dialogue.length; i++) {
                const line = hitNpc.dialogue[i];
                system.runTimeout(() => {
                    event.damagingEntity.sendMessage(`${SS(['8','l'], hitNpc.name)} > ${SS('r', line.replace("[player]", event.damagingEntity.name))}`);
                    event.damagingEntity.runCommand("playsound mob.villager.yes");
                }, 20 * i); // Wait half a second (500 milliseconds) between each message
            }
        }

        hitNpc.onClick(event.damagingEntity);
    }
});