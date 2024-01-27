import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import MainList from './src/MainList';
import store, { persistor } from './src/reducers/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';
import { palJson } from './src/constants';
import { loadAllPals } from './src/reducers/reducer';


export default function App() {

  useEffect(() => {
    const loadedPalsCount = Object.keys(store.getState().pal.allPals).length;
    // if (loadedPalsCount !== palJson.length) {
      store.dispatch(loadAllPals({}))
    // }
  },[])

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <View style={styles.container}>
          <MainList style={styles}></MainList>
          <StatusBar style="auto" />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
