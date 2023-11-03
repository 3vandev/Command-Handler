import { world, system } from "@minecraft/server";
import { SS } from "../utils/SS";

system.runInterval(()=>{
    for(const entity of world.getDimension('overworld').getEntities()) {
        if(entity.typeId == "minecraft:zombie") {
            entity.runCommand("effect @s fire_resistance 2 255 true")
            entity.nameTag = `${SS(['7', 'l'], 'Zombie')}\n${SS(['r', 'c'], `${Math.floor(entity.getComponent("health").currentValue)} / 20`)}`
        }
    }
}, 20);