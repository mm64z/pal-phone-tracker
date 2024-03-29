import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddToTeamAction, CreateTeamAction, DeleteFromTeamAction, DeleteTeamAction, Team, TeamListState, UpdateSearchAction, UpdateTeamAction } from "./types";

const slice = createSlice({
  name: 'team',
  initialState: {
    teams: {},
    searchText: '',
  },
  reducers: {
    createTeam: createTeamHandler,
    addToTeam: addToTeamHandler,
    updateTeamName: updateTeamNameHandler,
    deleteFromTeam: deleteFromTeamHandler,
    deleteTeam: deleteTeamHandler,
    updateSearch: updateSearchHandler,
  },
});

function findNextId (state: TeamListState) {
  let attempt = 0;
  const filledIds = Object.keys(state.teams);
  while (filledIds.includes(attempt.toString())) {
    attempt += 1;
  }
  return attempt;
}

function createTeamHandler (state: TeamListState, { payload }: PayloadAction<CreateTeamAction>) {
  const newTeamId = findNextId(state);
  const newTeam: Team = {
    id: newTeamId,
    name: "Team " + newTeamId,
    pals: payload.pal ? [payload.pal] : []
  };
  state.teams[newTeamId] = newTeam;
}

function addToTeamHandler (state: TeamListState, { payload }: PayloadAction<AddToTeamAction>) {
  state.teams[payload.team].pals.push(payload.pal);
}

function updateTeamNameHandler (state: TeamListState, { payload }: PayloadAction<UpdateTeamAction>) {
  state.teams[payload.teamId].name = payload.name;
}

function deleteFromTeamHandler (state: TeamListState, { payload }: PayloadAction<DeleteFromTeamAction>) {
  const newPals = state.teams[payload.team].pals.filter((pal) => pal !== payload.pal);
  state.teams[payload.team].pals = newPals;
}

function deleteTeamHandler (state: TeamListState, { payload }: PayloadAction<DeleteTeamAction>) {
  delete state.teams[payload.team];
}

function updateSearchHandler (state: TeamListState, { payload }: PayloadAction<UpdateSearchAction>) {
  state.searchText = payload.text;
}


export const { createTeam, addToTeam, updateTeamName, deleteFromTeam, deleteTeam, updateSearch } = slice.actions;
export const TeamListReducer = slice.reducer;