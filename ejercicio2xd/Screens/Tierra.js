import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListaTierra from "./ListaTierra";
import DetalleTierra from "./DetalleTierra";

const Stack = createStackNavigator();

const Tierra = () => {
  return (
    <Stack.Navigator initialRouteName="Tierra">
      <Stack.Screen
        name="Tierra"
        component={ListaTierra}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetalleTierra"
        component={DetalleTierra}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Tierra;