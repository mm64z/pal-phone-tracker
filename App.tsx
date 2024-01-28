import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import MainList from './src/CaughtList/MainList';
import store, { persistor } from './src/CoreState/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';
import { loadAllPals } from './src/CoreState/reducer';
import { palJson } from './src/constants';


export default function App() {

  useEffect(() => {
    // const loadedPalsCount = Object.keys(store.getState().core.allPals).length;
    // if (loadedPalsCount !== palJson.length) {
      store.dispatch(loadAllPals({
        allPalJson: palJson,
      }))
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
