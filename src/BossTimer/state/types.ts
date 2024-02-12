import { IdMap, Pal, ID } from "../../types"

export interface BossTimerState { 
  timers: IdMap<PalTimer>;
  lastUpdatedTime: number;
  searchText: string;
}

export interface PalTimer {
  id: ID,
  pal: ID,
  timeLeft: number,
}

export interface AddTimerAction {
  pal: ID,
  startTime: number,
}

export interface UpdateTimersAction {

}

export interface RemoveTimerAction {
  id: ID,
}

export interface UpdateSearchAction {
  text: string,
}