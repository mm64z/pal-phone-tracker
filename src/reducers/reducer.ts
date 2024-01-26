import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddPalAction, DeletePalAction, PalState, UpdatePalAction } from './types';
import { IdMap, Pal } from '../types';
import { generateID } from '../utils';

const slice = createSlice({
  name: 'palcounter',
  initialState: {
    palList: {},
  },
  reducers: {
    addPal: addPalHandler,
    updatePal: updatePalHandler,
    deletePal: deletePalHandler,
  },
});

function addPalHandler (state: PalState, { payload }: PayloadAction<AddPalAction>) {
  const id = generateID();
  const defaultPal: Pal = {
    id: id,
    name: "",
    numberCaught: 0,
  }

  state.palList[id] = {...defaultPal, ...payload.pal}
}

function updatePalHandler (state: PalState, { payload }: PayloadAction<UpdatePalAction>) {
  const updatedPal = {...state.palList[payload.id], ...payload.pal}
  state.palList[payload.id] = updatedPal;
}

function deletePalHandler (state: PalState, { payload }: PayloadAction<DeletePalAction>) {
  delete state.palList[payload.id];
}

export const { addPal, updatePal, deletePal } = slice.actions;
export const PalReducer = slice.reducer;