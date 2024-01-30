import { PalJson } from "../types";
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
  name: "Team buffs",
  text: "While in team",
}, {
  name: "Deployed buffs",
  text: "When fighting together",
}, {
  name: "Mount",
  text: "Can be ridden",
}, {
  name: "Flying Mount",
  text: "flying mount",
}]

// , {
//   name: "",
//   text: "",
// }

export interface FilteredGroup {
  group: string,
  matchingPals: Array<Pal>
}

// given palJson, return grouped 
export function sorter (palJson: PalJson[]): FilteredGroup[] {
  let sortedGroups: FilteredGroup[] = [];
  groups.map((group) => {
    const groupName = group.name;
    let matchingPals: Array<Pal> = [];
    palJson.map((pal) => {
      if (pal.aura.description.toLowerCase().includes(group.text.toLowerCase())) {
        matchingPals.push({
          name: pal.name,
          image: pal.image,
          aura: pal.aura.description,
        })
      }
    })
    sortedGroups.push({
      group: groupName,
      matchingPals: matchingPals,
    })
  })
  return sortedGroups;
}