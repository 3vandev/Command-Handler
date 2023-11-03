import { world, system } from '@minecraft/server';
import { SS } from '../../utils/SS.js';

export class npc {
    constructor(name, position, dialogue = [], onClick = (player) => {}) {
        this.name = name;
        this.position = position;
        this.dialogue = dialogue;

        this.entity = world.getDimension('overworld').spawnEntity('rc:fakevillager', position);
        this.entity.nameTag = `${SS(['7', 'l'], name)}\n${SS(['r', '8'], 'Click to interact')}`;
        this.onClick = onClick;
    }
}