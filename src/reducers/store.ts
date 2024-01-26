import { PayloadAction, configureStore } from '@reduxjs/toolkit';
import { Store, combineReducers } from 'redux';
import { PalReducer } from './reducer';

const initialState = {app: {}};

const rootReducer = (state = initialState, action: PayloadAction<any>) => {
  return state;
};

const reducer = combineReducers({
  rootReducer,
  PalReducer,
})

const store: Store = configureStore({
  reducer: reducer,
});

export default store;