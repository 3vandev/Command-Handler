import { world, system } from "@minecraft/server";
import { SafeZone, SafeZones } from "./SafeZone.js";
import { a } from "../../database/playerRank.js";
 
world.beforeEvents.playerBreakBlock.subscribe((data) => {
    const { player, block } = data;

    for (const ZONE of SafeZones) {
        if(a.get(player.name).rank == "developer") return;
        if (ZONE.disableBuilding) {
            if (ZONE.isInside(block.location)) {
                data.cancel = true;
                ZONE.command(player);
            }
        }
    }   
});

world.beforeEvents.playerPlaceBlock.subscribe((data) => {
    const { player, block } = data;

    for (const ZONE of SafeZones) {
        if (ZONE.disableBuilding) {
            if(a.get(player.name).rank == "developer") return;
            if (ZONE.isInside(block.location)) {
                data.cancel = true;
                ZONE.command(player);
            }
        }
    } 
});

system.runInterval(() => {
    for(const player of world.getPlayers()) {
        for (const ZONE of SafeZones) {
            if (ZONE.isInside(player.location)) {
                ZONE.inZone(player);
            }
        }
    }
});