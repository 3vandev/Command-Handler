import { world } from "@minecraft/server";
import { command, commands } from "./command.js";
import { prefix } from "./config.js";

world.beforeEvents.chatSend.subscribe((data) => {
  const { message, sender: player } = data;
  data.cancel = true;
  if (message.startsWith(prefix)) {
    const args = message
      .slice(prefix.length)
      .trim()
      .match(/(?:[^\s"]+|"[^"]*")+/g)
      .map((arg) => arg.replace(/"/g, ""));
    const commandName = args.shift().toLowerCase();
    for (const cmd of commands) {
      if (cmd.name === commandName) {
        cmd.callback(args, player);
        return;
      }
    }
    world.sendMessage(`§cUnknown command: ${commandName}`);
  } else {
    world.sendMessage(`§c${player.name} §l§2>>§r ${message}`);
  }
});
