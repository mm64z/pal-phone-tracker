import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { PassiveGroups } from "./src/PassiveGrouper/PassiveGroups";
import { CaughtTracker } from "./src/CaughtList/CaughtTracker";
import { SafeAreaView } from "react-native";
import { TeamList } from "./src/TeamList/TeamList";
import { WorkFilter } from "./src/WorkFilter/WorkFilter";
import { DropsSearcher } from "./src/DropsSearcher/DropsSearcher";
import { BossTimerReducer } from "./src/BossTimer/state/reducer";
import { BossTimer } from "./src/BossTimer/BossTimer";


export default function TabsDisplay() {

  const Tab = createMaterialTopTabNavigator();
  
  return (
    // <SafeAreaView>
      <Tab.Navigator>
        <Tab.Screen name="Caught Tracker" component={CaughtTracker} />
        <Tab.Screen name="Passive Groups" component={PassiveGroups} />
        <Tab.Screen name="Team Builder" component={TeamList} />
        <Tab.Screen name="Work Filter" component={WorkFilter} />
        <Tab.Screen name="Drops Searcher" component={DropsSearcher} />
        <Tab.Screen name="Boss Timer" component={BossTimer} />
      </Tab.Navigator>
    // </SafeAreaView>
  );


}