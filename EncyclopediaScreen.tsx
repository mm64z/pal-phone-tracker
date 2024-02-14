import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { PassiveGroups } from "./src/PassiveGrouper/PassiveGroups";
import { WorkFilter } from "./src/WorkFilter/WorkFilter";
import { DropsSearcher } from "./src/DropsSearcher/DropsSearcher";


export default function EncyclopediaScreen() {

  const Tab = createMaterialTopTabNavigator();
  
  return (
    // <SafeAreaView>
      <Tab.Navigator>
        <Tab.Screen name="Abilities" component={PassiveGroups} />
        <Tab.Screen name="Work Types" component={WorkFilter} />
        <Tab.Screen name="Materials" component={DropsSearcher} />
      </Tab.Navigator>
    // </SafeAreaView>
  );


}