import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PassiveGroupState, PopulateFilteredGroupAction } from "./types";

const slice = createSlice({
  name: 'passivePal',
  initialState: {
    filteredGroups: [],
  },
  reducers: {
    populateFilteredAuras: populateFilteredAurasHandler,
  },
});

function populateFilteredAurasHandler (state: PassiveGroupState, { payload }: PayloadAction<PopulateFilteredGroupAction>) {
  state.filteredGroups = payload.filteredGroups;
}


export const { populateFilteredAuras, } = slice.actions;
export const AuraFilterReducer = slice.reducer;