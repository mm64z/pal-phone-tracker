import { ID, PalJson } from "../types";
import { Pal } from "./types";

interface SearchItem {
  name: string;
  text: string;
  extra?: string;
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
  extra: 'speed.ride',
}, {
  name: "Glider",
  text: "glider",
  extra: 'speed.ride',
}, {
  name: "Flying Mount",
  text: "flying mount",
  extra: 'speed.ride',
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
  extra?: string,
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
      extra: group.extra,
      matchingPals: matchingPals,
    })
  })
  return sortedGroups;
}