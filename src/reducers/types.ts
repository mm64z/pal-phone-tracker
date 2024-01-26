import { IdMap, Pal, ID } from "../types"

export interface PalState { 
  palList: IdMap<Pal>;
}

export interface AddPalAction {
  pal?: Partial<Pal>,
}

export interface UpdatePalAction {
  id: ID,
  pal: Partial<Pal>,
}