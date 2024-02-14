import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { CaughtTracker } from "./src/CaughtList/CaughtTracker";
import { TeamList } from "./src/TeamList/TeamList";
import { BossTimer } from "./src/BossTimer/BossTimer";


export default function FieldNotesScreen() {

  const Tab = createMaterialTopTabNavigator();
  
  return (
    // <SafeAreaView>
      <Tab.Navigator>
        <Tab.Screen name="Caught Tracker" component={CaughtTracker} />
        <Tab.Screen name="Team Builder" component={TeamList} />
        <Tab.Screen name="Boss Timer" component={BossTimer} />  
      </Tab.Navigator>
    // </SafeAreaView>
  );


}