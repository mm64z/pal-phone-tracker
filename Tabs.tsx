import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { PassiveGroups } from "./src/PassiveGrouper/PassiveGroups";
import { CaughtTracker } from "./src/CaughtList/CaughtTracker";
import { SafeAreaView } from "react-native";


export default function TabsDisplay() {

  const Tab = createMaterialTopTabNavigator();
  
  return (
    // <SafeAreaView>
      <Tab.Navigator>
        <Tab.Screen name="Caught Tracker" component={CaughtTracker} />
        <Tab.Screen name="Passive Groups" component={PassiveGroups} />
      </Tab.Navigator>
    // </SafeAreaView>
  );


}