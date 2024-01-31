import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoadAllPalsAction, PalState } from './types';
import { palImages } from '../../public/images';
import { palJson } from '../constants';
import { Pal, IdMap, PalJson } from '../types';

const slice = createSlice({
  name: 'allPal',
  initialState: {
    allPals: {},
  },
  reducers: {
    loadAllPals: loadAllPalsHandler,
  },
});

function loadAllPalsHandler (state: PalState, { payload }: PayloadAction<LoadAllPalsAction>) {
  const newPalMap: IdMap<Pal> = {};
  payload.allPalJson.map((pal: PalJson) => {
    const newPal: Pal = {
      id: pal.id,
      name: pal.name,
      image: palImages[pal.key],
      aura: pal.aura,
    }
    // console.log("'" + pal.key + "': require('./" + pal.key + ".png'),");
    newPalMap[pal.id] = newPal;
  })
  state.allPals = newPalMap;
}


export const { loadAllPals, } = slice.actions;
export const PalReducer = slice.reducer;