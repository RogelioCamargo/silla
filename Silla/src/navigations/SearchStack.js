import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import screens
import ListingsScreen from '../screens/ListingsScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();
export default function SearchStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Listings"
        component={ListingsScreen}
        options={{
          gesturesEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchListings"
        component={SearchScreen}
        options={{
          gesturesEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
