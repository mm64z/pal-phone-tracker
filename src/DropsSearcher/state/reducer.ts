import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DropsSearcherState, UpdateSearchAction } from "./types";


const slice = createSlice({
  name: 'drops',
  initialState: {
    searchText: '',
  },
  reducers: {
    updateSearch: updateSearchHandler,
  },
});

function updateSearchHandler (state: DropsSearcherState, { payload }: PayloadAction<UpdateSearchAction>) {
  state.searchText = payload.text;
}

export const { updateSearch, } = slice.actions;
export const DropSearcherReducer = slice.reducer;