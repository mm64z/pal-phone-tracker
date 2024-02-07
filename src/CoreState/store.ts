import { configureStore } from '@reduxjs/toolkit';
import { PalCaughtReducer } from '../CaughtList/reducers/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistCombineReducers } from 'redux-persist'
import { PalReducer } from './reducer';
import { AuraFilterReducer } from '../PassiveGrouper/state/reducer';
import { TeamListReducer } from '../TeamList/state/reducer';
import { WorkFilterReducer } from '../WorkFilter/state/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
}

const initialState = {app: {}};

const persistedReducer = persistCombineReducers(persistConfig, {
  core: PalReducer,
  caught: PalCaughtReducer,
  aura: AuraFilterReducer,
  team: TeamListReducer,
  work: WorkFilterReducer,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['core.allPals']
      },
      immutableCheck: {
        // Ignore state paths
        ignoredPaths: ['core.allPals']
      }
    }),
  })

export const persistor = persistStore(store)
export default store;