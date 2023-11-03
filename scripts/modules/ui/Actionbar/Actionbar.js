import { world, system } from "@minecraft/server"
import { SS } from "../../../utils/SS"
import { inCombatDatabase } from "../../../database/playerInCombat"

system.runInterval(()=>{
    for(const player of world.getPlayers()) {
        const inCombat = inCombatDatabase.get(player.name).inCombat;
        const message = inCombat ? `${SS(['r', 'a'], 'In Combat')}` : `${SS(['r', 'c'], 'Not in Combat')}`;
        player.runCommand(`title @s actionbar ${message}`);
    }
}, 20);
