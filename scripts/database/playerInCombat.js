import { DatabaseSavingModes, NBTDatabase, JsonDatabase } from "./database";
import { world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

export const inCombatDatabase = new NBTDatabase("inCombat", DatabaseSavingModes.OneTimeSave, 50).load();
export const inCombatNBT = new JsonDatabase("inCombat");
console.warn(inCombatDatabase === inCombatNBT);

// Set the rank of a player
for (const player of world.getPlayers()) {
    if (inCombatDatabase.get(player.name) === undefined)
    inCombatDatabase.set(player.name, { inCombat: false });
}

export function setCombat(player, value) {
    inCombatDatabase.set(player.name, { inCombat: value})
}