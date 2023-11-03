import { world, system } from "@minecraft/server";
import { inCombatDatabase } from "../../database/playerInCombat";

export class SafeZone {
    constructor(from, to, disableBuilding = false, command = () => {}, inZone = () => {}) {
        this.from = from;
        this.to = to;
        this.command = command;
        this.inZone = inZone;
        this.disableBuilding = disableBuilding;

    }

    isInside(location) {
        if(location.x <= this.from[0] && location.z <= this.from[2] && location.x >= this.to[0] && location.z >= this.to[2])
        {
            return true;
        }
        return false;
    }
}
export const SafeZones = [
    new SafeZone(
        [597, 1, 123], 
        [149, 255, -325], 
        true,
        () => {
        },
        (player) => {
            if(inCombatDatabase.get(player.name).inCombat == true) return;
            player.runCommand("effect @s instant_health 2 255 true");
        }
    ),

    new SafeZone(
        [383, 1, -111],
        [363, 255, -91],
        true,
        () => {},
        (player) => {
            player.runCommand("effect @s instant_health 2 255 true");
        }
    )
];