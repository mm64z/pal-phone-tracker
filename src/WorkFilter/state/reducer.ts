import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddFilterAction, RemoveFilterAction, UpdateExclusiveFilterAction, UpdateFiltersAction, WorkFilterState } from "./types";


const slice = createSlice({
  name: 'workPal',
  initialState: {
    activeFilters: [],
    exclusiveFilter: false,
  },
  reducers: {
    updateFilters: updateFiltersHandler,
    addFilter: addFilterHandler,
    removeFilter: removeFilterHandler,
    updateExclusiveFilter: updateExclusiveFilterHandler,
  },
});

function updateFiltersHandler (state: WorkFilterState, { payload }: PayloadAction<UpdateFiltersAction>) {
  state.activeFilters = payload.newFilters;
}

function addFilterHandler (state: WorkFilterState, { payload }: PayloadAction<AddFilterAction>) {
  state.activeFilters.push(payload.filter);
}

function removeFilterHandler (state: WorkFilterState, { payload }: PayloadAction<RemoveFilterAction>) {
  state.activeFilters = state.activeFilters.filter((filter) => filter !== payload.filter);
}

function updateExclusiveFilterHandler (state: WorkFilterState, { payload }: PayloadAction<UpdateExclusiveFilterAction>) {
  state.exclusiveFilter = payload.exclusive;
}

export const { updateFilters, addFilter, removeFilter, updateExclusiveFilter, } = slice.actions;
export const WorkFilterReducer = slice.reducer;