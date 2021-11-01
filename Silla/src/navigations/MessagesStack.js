import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import components
import {Header} from '../components/molecules';

// import screens
import MessagesScreen from '../screens/MessagesScreen';

const Stack = createStackNavigator();
export default function AccountStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Inbox"
        component={MessagesScreen}
        options={{
          gesturesEnabled: false,
          header: () => {
            return <Header title="Inbox" />;
          },
        }}
      />
    </Stack.Navigator>
  );
}
