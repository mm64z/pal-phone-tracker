import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FieldNotesScreen from "./FieldNotesScreen";
import EncyclopediaScreen from "./EncyclopediaScreen";


export default function TabsDisplay() {

  const Tab = createMaterialTopTabNavigator();
  
  return (
    // <SafeAreaView>
      <Tab.Navigator>
        <Tab.Screen name="Field Notes" component={FieldNotesScreen} />
        <Tab.Screen name="Palopedia" component={EncyclopediaScreen} />
      </Tab.Navigator>
    // </SafeAreaView>
  );


}