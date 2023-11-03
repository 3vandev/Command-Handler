import { addTick } from "../../tick";
import { world, system } from "@minecraft/server";
import * as sidebar from "./sidebar";
import { SS } from "../../../utils/SS";
import { a } from "../../../database/playerRank"
import { c } from "../../../database/playerMoney"
import { numberEndings, monthsOfTheYear } from "./time";
import { numberWithCommas, shortenNumber } from "../../../utils/numberFormat";


const nameDisplay = [
    "§l§fRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§fRUNECRAFT§r",
    "§l§eRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§fRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§fRUNECRAFT§r",
    "§l§eRUNECRAFT§r", "§l§6R§eUNECRAFT§r", "§l§fR§6U§eNECRAFT§r", "§l§fRU§6N§eECRAFT§r", "§l§fRUN§6E§eCRAFT§r", "§l§fRUNE§6C§eRAFT§r", "§l§fRUNEC§6R§eAFT§r", "§l§fRUNECR§6A§eFT§r", "§l§fRUNECRA§6F§eT§r", "§l§fRUNECRAF§6T§e§r",
    "§l§eRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§eRUNECRAFT§r", "§l§eRUNECRAFT§r",
];

let displayIndex = 0;

system.runInterval(() => {
    const absoluteTime = world.getAbsoluteTime();
    const days = Math.floor(absoluteTime / 24000);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    const time = [days - months * 30, months % 12, years + 1500];
    let hour = Math.floor((absoluteTime % 24000) / 1000);
    let ampm = "PM";
    if (hour >= 12) {
        ampm = "AM";
        hour -= 12;
    }

    let minute = Math.floor(((absoluteTime % 24000) % 1000) / 1000 * 60);
    if (minute.toString().length === 1) {
        minute = "0" + minute;
    }

    for (const player of world.getPlayers()) {
        if (displayIndex >= nameDisplay.length - 1)
            displayIndex = 0;
        else
            displayIndex++;
        const bar = new sidebar.sidebar(nameDisplay[displayIndex], [
            new sidebar.row(SS("7", `${SS('a', `${hour}:${minute}${ampm}`)} ${SS('7','')}${monthsOfTheYear[time[1]]} ${time[0]+1}${numberEndings[time[0].toString().slice(-1)]}, ${time[2]}`)),
            new sidebar.row(`${SS("7", "Rank:")} ${SS("2", a.get(player.name).rank).toUpperCase()}`, 1),
            new sidebar.row(`${SS("7", "Jewls:")} ${SS("6", shortenNumber(c.get(player.name).money))}`),
            new sidebar.row(`${SS("e", "www.pixelite.club")}`,1),
        ]);
        bar.display(player);
    }
}, 20);

