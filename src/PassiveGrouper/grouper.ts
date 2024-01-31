import { ID, PalJson } from "../types";
import { Pal } from "./types";

interface SearchItem {
  name: string;
  text: string;
}

const groups: SearchItem[] = [{
  name: "Ranch",
  text: "assigned to ranch",
}, {
  name: "Carrying Capacity",
  text: "carrying capacity",
}, {
  name: "Passive Attack Buffs",
  text: "Wh(?:ile|en) in team, increases.*attack",
}, {
  name: "Active Buffs",
  text: "Wh(?:ile|en) fighting together",
}, {
  name: "Mining",
  text: "mining",
}, {
  name: "Boost Drops",
  text: "drop more items",
}, {
  name: "Ground Mount",
  text: "Can be ridden(?!.*flying)",
}, {
  name: "Glider",
  text: "glider",
}, {
  name: "Flying Mount",
  text: "flying mount",
}, {
  name: "Passive Buffs",
  text: "Wh(?:ile|en) in team",
}]

// , {
//   name: "",
//   text: "",
// }

export interface FilteredGroup {
  group: string,
  matchingPals: Array<ID>
}

// given palJson, return grouped 
export function sorter (palJson: PalJson[]): FilteredGroup[] {
  let sortedGroups: FilteredGroup[] = [];
  groups.map((group) => {
    const groupName = group.name;
    let matchingPals: Array<ID> = [];
    const match = new RegExp(group.text, 'i')
    palJson.map((pal) => {
      if (match.exec(pal.aura.description)) {
        matchingPals.push(pal.id);
      }
    })
    sortedGroups.push({
      group: groupName,
      matchingPals: matchingPals,
    })
  })
  return sortedGroups;
}