import { IdMap, Pal, PalJson } from "../types";

export interface LoadAllPalsAction {
  allPalJson: PalJson,
}


export interface PalState {
  allPals: IdMap<Pal>,
}