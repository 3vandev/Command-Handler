import { DatabaseSavingModes, NBTDatabase, JsonDatabase } from "./database";
import { world } from "@minecraft/server";

export const c = new NBTDatabase("playerMoney", DatabaseSavingModes.OneTimeSave, 50).load();
export const d = new JsonDatabase("playerMoney");
console.warn(c === d);

// Set the rank of a player
for (const player of world.getPlayers()) {
    if (c.get(player.name) === undefined)
    c.set(player.name, { money: "100.1" });
}

export function setMoney(player, money) {
    c.set(player.name, { money: money})
}