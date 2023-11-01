import { world, system } from "@minecraft/server";

let ticks = [];

export function addTick(callback) {
  ticks.push(callback);
}

system.runInterval(() => {
  for (const tick of ticks) {
    tick();
  }
});