import { IdMap, Pal, ID } from "../../types"

export interface CaughtPalState { 
  allPals: IdMap<PalCaught>;
  searchText: string;
}

export interface PalCaught {
  id: ID,
  numberCaught: number,
}

export interface AddPalAction {
  pal?: Partial<Pal>,
}

export interface UpdatePalAction {
  id: ID,
  pal: Partial<PalCaught>,
}

export interface DeletePalAction {
  id: ID,
}

export interface UpdateSearchAction {
  text: string,
}