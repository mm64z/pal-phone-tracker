import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddPalAction, DeletePalAction, LoadAllPalsAction, PalState, UpdatePalAction, UpdateSearchAction } from './types';
import { ID, IdMap, Pal, PalJson } from '../types';
import { generateID } from '../utils';
import { palJson } from '../constants';

const slice = createSlice({
  name: 'palcounter',
  initialState: {
    allPals: {},
    searchText: '',
  },
  reducers: {
    loadAllPals: loadAllPalsHandler,
    addPal: addPalHandler,
    updatePal: updatePalHandler,
    deletePal: deletePalHandler,
    updateSearch: updateSearchHandler,
  },
});

function loadAllPalsHandler (state: PalState, { payload }: PayloadAction<LoadAllPalsAction>) {
  const nameToId = {};
  Object.values(state.allPals).map((pal: Pal) => {
    nameToId[pal.name] = pal.id;
  })
  const newPalMap: IdMap<Pal> = {};
  palJson.map((pal: PalJson) => {
    let count = 0;
    let id = nameToId[pal.name];
    if (id) {
      count = state.allPals[id]?.numberCaught || 0;
    }
    const newPal: Pal = {
      id: pal.id,
      name: pal.name,
      numberCaught: count,
    }
    newPalMap[pal.id] = newPal;
  })
  state.allPals = newPalMap;
}

function addPalHandler (state: PalState, { payload }: PayloadAction<AddPalAction>) {
  const id = generateID();
  const defaultPal: Pal = {
    id: id,
    name: "",
    numberCaught: 0,
  }

  const newPal = {...defaultPal, id, ...payload.pal};
  
  state.allPals[newPal.id] = newPal;
}

function updatePalHandler (state: PalState, { payload }: PayloadAction<UpdatePalAction>) {
  const updatedPal = {...state.allPals[payload.id], ...payload.pal}
  state.allPals[payload.id] = updatedPal;
}

function deletePalHandler (state: PalState, { payload }: PayloadAction<DeletePalAction>) {
  delete state.allPals[payload.id];
}

function updateSearchHandler (state: PalState, { payload }: PayloadAction<UpdateSearchAction>) {
  state.searchText = payload.text;
}

export const { loadAllPals, addPal, updatePal, deletePal, updateSearch } = slice.actions;
export const PalReducer = slice.reducer;