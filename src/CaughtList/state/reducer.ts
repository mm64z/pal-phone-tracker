import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CaughtPalState, UpdatePalAction, UpdateSearchAction } from './types';

const slice = createSlice({
  name: 'palcounter',
  initialState: {
    allPals: {},
    searchText: '',
  },
  reducers: {
    updatePal: updatePalHandler,
    updateSearch: updateSearchHandler,
  },
});

function updatePalHandler (state: CaughtPalState, { payload }: PayloadAction<UpdatePalAction>) {
  const updatedPal = {...state.allPals[payload.id], ...payload.pal}
  state.allPals[payload.id] = updatedPal;
}

function updateSearchHandler (state: CaughtPalState, { payload }: PayloadAction<UpdateSearchAction>) {
  state.searchText = payload.text;
}

export const { updatePal, updateSearch } = slice.actions;
export const PalCaughtReducer = slice.reducer;