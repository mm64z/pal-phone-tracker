export interface WorkFilterState {
  activeFilters: WorkType[],
  exclusiveFilter: boolean,
}

export type WorkType = {
  label: string,
  type: string,
};

export const WORK_TYPE = {
  KINDLING: {
    label: "kindling",
    type: "kindling",
  },
  GENERATING_ELECTRICITY: {
    label: "electricity",
    type: "generating_electricity",
  },
  PLANTING: {
    label: "planting",
    type: "planting",
  },
  WATERING: {
    label: "watering",
    type: "watering",
  },
  GATHERING: {
    label: "gathering",
    type: "gathering",
  },
  HANDIWORK: {
    label: "handiwork",
    type: "handiwork",
  },
  LUMBERING: {
    label: "lumbering",
    type: "lumbering",
  },
  MINING: {
    label: "mining",
    type: "mining",
  },
  MEDICINE_PRODUCTION: {
    label: "medicine",
    type: "medicine_production",
  },
  COOLING: {
    label: "cooling",
    type: "cooling",
  },
  TRANSPORTING: {
    label: "transporting",
    type: "transporting",
  },
  FARMING: {
    label: "farming",
    type: "farming",
  },
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