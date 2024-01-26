import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddPalAction, DeletePalAction, PalState, UpdatePalAction, UpdateSearchAction } from './types';
import { IdMap, Pal } from '../types';
import { generateID } from '../utils';

const slice = createSlice({
  name: 'palcounter',
  initialState: {
    allPals: {},
    searchText: '',
  },
  reducers: {
    addPal: addPalHandler,
    updatePal: updatePalHandler,
    deletePal: deletePalHandler,
    updateSearch: updateSearchHandler,
  },
});

function addPalHandler (state: PalState, { payload }: PayloadAction<AddPalAction>) {
  const id = generateID();
  const defaultPal: Pal = {
    id: id,
    name: "",
    numberCaught: 0,
  }
  const newPal = {...defaultPal, ...payload.pal};
  
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

export const { addPal, updatePal, deletePal, updateSearch } = slice.actions;
export const PalReducer = slice.reducer;