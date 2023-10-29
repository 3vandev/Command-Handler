import { world } from "@minecraft/server";
import { prefix } from "./config.js";

export class command {
  constructor(name, info, callback, args = []) {
    this.name = name;
    this.callback = callback;
    this.info = info;
    this.args = args;
  }
}

export class arg {
  constructor(name, info, type) {
    this.name = name;
    this.info = info;
    this.type = type;
  }
}

export const commands = [
  new command("help", "Shows a list of commands", (args, player) => {
    player.sendMessage("§a§lCommands:");
    for (const cmd of commands) {
      let cmdStructure = `${prefix}${cmd.name}`;

      if (cmd.args.length > 0) {
        for (const arg of cmd.args) {
          if (arg.type === "required") {
            cmdStructure += ` <${arg.name}>`;
          } else if (arg.type === "optional") {
            cmdStructure += ` [${arg.name}]`;
          }
        }
      }

      world.sendMessage(
        `§a${cmd.name} §l§2>>§r ${cmd.info}\n${cmdStructure}\n\n`
      );
    }
  }),

  new command(
    "say",
    "Set your display name",
    (args, player) => {
      world.sendMessage(`§a${player.name} §l§2>>§r ${args[0]}`);
    },
    [new arg("message", "Your display name", "required")]
  ),
];
