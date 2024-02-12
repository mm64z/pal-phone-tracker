import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddTimerAction, BossTimerState, PalTimer, RemoveTimerAction, UpdateSearchAction, UpdateTimersAction } from './types';

const slice = createSlice({
  name: 'bosstimer',
  initialState: {
    timers: {},
    lastUpdatedTime: Date.now(),
    searchText: '',
  },
  reducers: {
    addTimer: addTimerHandler,
    updateTimers: updateTimersHandler,
    removeTimer: removeTimerHandler,
    updateSearch: updateSearchHandler,
  },
});

function findNextId (state: BossTimerState) {
  let attempt = 0;
  const filledIds = Object.keys(state.timers);
  while (filledIds.includes(attempt.toString())) {
    attempt += 1;
  }
  return attempt;
}

function addTimerHandler (state: BossTimerState, { payload }: PayloadAction<AddTimerAction>) {
  const nextID = findNextId(state);
  const newTimer: PalTimer = {
    id: nextID,
    pal: payload.pal,
    timeLeft: payload.startTime,
  }

  state.timers[nextID] = newTimer;
}

function updateTimersHandler (state: BossTimerState, { payload }: PayloadAction<UpdateTimersAction>) {
  const deltaTime = Date.now() - state.lastUpdatedTime;
  // a little off for timers added after lastUpdatedTime, but at ~1 second, acceptable

  Object.keys(state.timers).map((id) => {
    state.timers[id].timeLeft = Math.max(state.timers[id].timeLeft - deltaTime, 0);
  })

  state.lastUpdatedTime += deltaTime;
}

function removeTimerHandler (state: BossTimerState, { payload }: PayloadAction<RemoveTimerAction>) {
  delete state.timers[payload.id];
}

function updateSearchHandler (state: BossTimerState, { payload }: PayloadAction<UpdateSearchAction>) {
  state.searchText = payload.text;
}

export const { addTimer, updateTimers, removeTimer, updateSearch } = slice.actions;
export const BossTimerReducer = slice.reducer;