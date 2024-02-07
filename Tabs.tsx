import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { PassiveGroups } from "./src/PassiveGrouper/PassiveGroups";
import { CaughtTracker } from "./src/CaughtList/CaughtTracker";
import { SafeAreaView } from "react-native";
import { TeamList } from "./src/TeamList/TeamList";
import { WorkFilter } from "./src/WorkFilter/WorkFilter";


export default function TabsDisplay() {

  const Tab = createMaterialTopTabNavigator();
  
  return (
    // <SafeAreaView>
      <Tab.Navigator>
        <Tab.Screen name="Caught Tracker" component={CaughtTracker} />
        <Tab.Screen name="Passive Groups" component={PassiveGroups} />
        <Tab.Screen name="Team Builder" component={TeamList} />
        <Tab.Screen name="Work Filter" component={WorkFilter} />
      </Tab.Navigator>
    // </SafeAreaView>
  );


}