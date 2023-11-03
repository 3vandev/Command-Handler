import { world, system } from '@minecraft/server'
import { SS } from '../../utils/SS';
import { a } from '../../database/playerRank';
import { inCombatDatabase } from '../../database/playerInCombat';

system.runInterval(() => {
    for(const player of world.getPlayers()) {
        const inCombat = inCombatDatabase.get(player.name).inCombat;
        const isInCombat = inCombat ? `${SS(['r', 'a'], '#')}` : `${SS(['r', 'c'], '#')}`;
        player.nameTag = `${isInCombat} [${SS('7',a.get(player.name).rank.toUpperCase())}] ${player.name}\n${SS('c',Math.floor(player.getComponent("minecraft:health").currentValue) + "/20")}`;
    }
}, 20);