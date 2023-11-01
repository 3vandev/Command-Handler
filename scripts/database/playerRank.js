import { DatabaseSavingModes, NBTDatabase, JsonDatabase } from "./database";
import { world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

export const a = new NBTDatabase("playerRank", DatabaseSavingModes.OneTimeSave, 50).load();
export const b = new JsonDatabase("playerRank");
console.warn(a === b);

// Set the rank of a player
for (const player of world.getPlayers()) {
    if (a.get(player.name) === undefined)
    a.set(player.name, { rank: "member" });
}

export function setRank(player, rankz) {
    a.set(player.name, { rank: rankz})
}