export interface WorkFilterState {
  activeFilters: WorkType[],
  exclusiveFilter: boolean,
}

export type WorkType = string;

export const WORK_TYPE = {
  KINDLING: "kindling",
  GENERATING_ELECTRICITY: "generating_electricity",
  PLANTING: "planting",
  WATERING: "watering",
  GATHERING: "gathering",
  HANDIWORK: "handiwork",
  LUMBERING: "lumbering",
  MINING: "mining",
  MEDICINE_PRODUCTION: "medicine_production",
  COOLING: "cooling",
  TRANSPORTING: "transporting",
  FARMING: "farming",
}

export interface UpdateFiltersAction {
  newFilters: WorkType[],
}
export interface AddFilterAction {
  filter: WorkType,
}
export interface RemoveFilterAction {
  filter: WorkType,
}
export interface UpdateExclusiveFilterAction {
  exclusive: boolean,
}