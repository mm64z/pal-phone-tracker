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

function dropTransform (dropsArray: string[]) {
  return dropsArray.map((drop) => {
    return drop.replaceAll('_', ' ');
  })
}

function transformSuitability(suitabilityArray: Array<{type: string}>) {
  return suitabilityArray.map((s) => {
    let label = s.type.replace("_", " ");
    if (s.type.toLowerCase().indexOf("electricity") > -1) {
      label = "Electricity";
    }
    if (s.type.toLowerCase().indexOf("medicine") > -1) {
      label = "Medicine";
    }
    return {...s, label}
  });
}

function loadAllPalsHandler (state: PalState, { payload }: PayloadAction<LoadAllPalsAction>) {
  const newPalMap: IdMap<Pal> = {};
  payload.allPalJson.map((pal: PalJson) => {
    const newPal: Pal = {
      id: pal.id,
      name: pal.name,
      image: palImages[pal.key],
      aura: pal.aura,
      food: pal.stats.food,
      suitability: transformSuitability(pal.suitability),
      drops: dropTransform(pal.drops),
      speed: pal.stats.speed,
    }
    // console.log("'" + pal.key + "': require('./" + pal.key + ".png'),");
    newPalMap[pal.id] = newPal;
  })
  state.allPals = newPalMap;
}


export const { loadAllPals, } = slice.actions;
export const PalReducer = slice.reducer;