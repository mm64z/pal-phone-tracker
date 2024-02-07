import { StyleSheet, Text, StatusBar } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store, { persistor } from './src/CoreState/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';
import { loadAllPals } from './src/CoreState/reducer';
import { palJson } from './src/constants';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TabsDisplay from './Tabs';

export default function App() {
  

  // const insets = useSafeAreaInsets();
  // // Paddings to handle safe area
  // const insetStyle = {
  //   paddingTop: insets.top,
  //   paddingBottom: insets.bottom,
  //   paddingLeft: insets.left,
  //   paddingRight: insets.right,
  // }

  useEffect(() => {
    // const loadedPalsCount = Object.keys(store.getState().core.allPals).length;
    // if (loadedPalsCount !== palJson.length) {
    // TODO version json, only load if that updates
    store.dispatch(loadAllPals({
      allPalJson: palJson, 
    }))
    // }
  },[])

  return (
    <SafeAreaProvider style={styles.tabNavigator}>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            {/* <SafeAreaView> */}
              <TabsDisplay></TabsDisplay>
              
              <ExpoStatusBar style="auto" />
            {/* </SafeAreaView> */}
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider> 
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabNavigator: {
    marginTop: StatusBar.currentHeight,
  }
});
