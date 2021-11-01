import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// import default styles
import {colors} from '../styles';

// import screens
import AccountLikesScreen from '../screens/AccountLikesScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createMaterialTopTabNavigator();

export default function AccountTopTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        // inactiveTintColor: colors.medium,
        indicatorStyle: {
          backgroundColor: colors.black,
        },
        labelStyle: {
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
        // activeTintColor: colors.primary
      }}>
      <Tab.Screen name="Listings" component={AccountScreen} />
      <Tab.Screen name="Likes" component={AccountLikesScreen} />
    </Tab.Navigator>
  );
}
