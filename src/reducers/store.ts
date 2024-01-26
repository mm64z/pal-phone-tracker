import { PayloadAction, configureStore } from '@reduxjs/toolkit';
import { Store, combineReducers } from 'redux';
import { PalReducer } from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistCombineReducers } from 'redux-persist'


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
}


const initialState = {app: {}};

const rootReducer = (state = initialState, action: any) => {
  return state;
};



const persistedReducer = persistCombineReducers(persistConfig, {
  root: rootReducer,
  pal: PalReducer,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store;