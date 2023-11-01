import { addTick } from "../tick";
import { world, system } from "@minecraft/server";
import * as sidebar from "./sidebar";
import { SS } from "../../utils/SS";
import { a } from "../../database/playerRank"
import { c } from "../../database/playerMoney"


const nameDisplay = [
    "§l§fEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§fEVANS KITPVP§r",
    "§l§eEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§fEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§fEVANS KITPVP§r",
    "§l§eEVANS KITPVP§r", "§l§6E§eVANS KITPVP§r", "§l§fE§6V§eANS KITPVP§r", "§l§fEV§6A§eNS KITPVP§r", "§l§fEVA§6N§eS KITPVP§r", "§l§fEVAN§6S§e KITPVP§r", "§l§fEVANS §6K§eITPVP§r", "§l§fEVANS KITP§6V§eP§r", "§l§fEVANS KITPV§6P§e§r", "§l§fEVANS KITPVP§6§e§r",
    "§l§eEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§eEVANS KITPVP§r", "§l§eEVANS KITPVP§r",
];

let displayIndex = 0;


system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (displayIndex >= nameDisplay.length - 1)
            displayIndex = 0;
        else
            displayIndex++;
        const bar = new sidebar.sidebar(nameDisplay[displayIndex], [
            new sidebar.row(SS("0", "0/0/0 u/euna")),
            new sidebar.row(`${SS("7", "Rank:")} ${SS("2", a.get(player.name).rank).toUpperCase()}`, 1),
            new sidebar.row(`${SS("7", "Money:")} ${SS("6", c.get(player.name).money + "g")}`),
            new sidebar.row(`${SS("e", "www.pixelite.club")}`,1),
        ]);
        bar.display(player);
    }
}, 20);