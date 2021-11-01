import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import components
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          gesturesEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
