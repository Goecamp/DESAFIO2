import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Planetas from './Screens/Planetas';
import Sol from './Screens/Sol';
import Tierra from './Screens/Tierra';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarInactiveTintColor: "#f48b28",
      tabBarActiveTintColor: "#633204",
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Planetas') {
          iconName = Platform.OS === 'ios' ? 'home-outline' : 'home';
        } else if (route.name === 'Sol') {
          iconName = Platform.OS === 'ios' ? 'list-outline' : 'list';
        } else if (route.name === 'Tierra') {
          iconName = Platform.OS === 'ios' ? 'earth-outline' : 'earth';
        }
        // Devolver el componente de icono correspondiente
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Planetas" component={Planetas} />
    <Tab.Screen name="Sol" component={Sol} />
    <Tab.Screen name="Tierra" component={Tierra} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
