import { IdMap, Pal, ID } from "../types"

export interface PalState { 
  allPals: IdMap<Pal>;
  searchText: string;
}

export interface AddPalAction {
  pal?: Partial<Pal>,
}

export interface UpdatePalAction {
  id: ID,
  pal: Partial<Pal>,
}

export interface DeletePalAction {
  id: ID,
}

export interface UpdateSearchAction {
  text: string,
}