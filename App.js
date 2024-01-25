import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainList from './src/MainList';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.container}>Track caught Pals</Text>
      {/* <MainList style={styles}></MainList> */}
      <StatusBar style="auto" />
    </View>
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
