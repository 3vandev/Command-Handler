import { world,system } from "@minecraft/server";

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
        [25, -64, 25], 
        [-25, 255, -25], 
        true,
        () => {
            world.sendMessage("§cYou can't build here!");
        },
        (player) => {
            player.runCommand("effect @s instant_health 2 255 true");
        }
)];
 