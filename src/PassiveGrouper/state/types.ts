import { FilteredGroup } from "../grouper";

export interface PassiveGroupState {
  filteredGroups: FilteredGroup[];
}

export interface PopulateFilteredGroupAction {
  filteredGroups: FilteredGroup[];
}