import { ID, IdMap, Pal } from "../../types";


export interface Team {
  id: ID,
  name: string,
  pals: ID[],
}

export interface TeamListState {
  teams: IdMap<Team>;
  searchText: string;
}

export interface CreateTeamAction {
  pal?: ID,
}

export interface AddToTeamAction {
  team: ID,
  pal: ID,
}

export interface UpdateTeamAction {
  teamId: ID,
  name: string,
}

export interface DeleteFromTeamAction {
  team: ID,
  pal: ID,
}

export interface DeleteTeamAction {
  team: ID,
}

export interface UpdateSearchAction {
  text: string,
}