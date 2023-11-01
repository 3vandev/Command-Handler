import { world, system } from "@minecraft/server";
import { prefix } from "./config.js";
import { a, setRank } from "../database/playerRank.js";

export class command {
  constructor(name, info, callback, args = []) {
    this.name = name;
    this.callback = callback;
    this.info = info;
    this.args = args;
  }
}

export class arg {
  constructor(name, info, type, object = null) {
    this.name = name;
    this.info = info;
    this.type = type;
    this.object = object;
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
            cmdStructure += ` <${arg.name}${arg.object != null ? ":" + arg.object : ""}>`;
          } else if (arg.type === "optional") {
            cmdStructure += ` [${arg.name}${arg.object != null ? ":" + arg.object : ""}]`;
          }
        }
      }

      world.sendMessage(
        `§a${cmd.name} §l§2>>§r ${cmd.info}\n${cmdStructure}\n\n`
      );
    }
  }),

  new command(
    "setrank",
    "Sets a player's rank",
    (args, player) => {
        const target = world.getPlayers().find((p) => p.name === args[0]);
        system.runTimeout(() => {setRank(target, args[1])}, 1);
    },
    [
      new arg("player", "The player to set the rank of", "required"),
      new arg("rank", "The rank to set the player to", "required"),
    ]
  ),
];
