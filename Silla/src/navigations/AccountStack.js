import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import components
import {Header} from '../components/molecules';

// import default styles
import {colors} from '../styles';

// import navigators
import AccountTopTabNavigator from './AccountTopTabNavigator';

// import screens
// import AccountEditProfileScreen from '../screens/AccountEditProfileScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';

// import routes
import routes from '../navigations/routes';

const Stack = createStackNavigator();
export default function AccountStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Account"
        component={AccountTopTabNavigator}
        options={{
          gesturesEnabled: false,
          header: ({navigation}) => {
            return (
              <Header
                iconColor={colors.black}
                iconSize={22}
                iconRight="settings"
                onPressRight={() =>
                  navigation.navigate(routes.ACCOUNT_SETTINGS)
                }
                title="Account"
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{
          gesturesEnabled: false,
          header: ({navigation}) => {
            return (
              <Header
                iconColor={colors.black}
                iconLeft="arrow-left"
                onPressLeft={() => navigation.goBack()}
                title="Settings"
              />
            );
          },
        }}
      />
      {/* <Stack.Screen
        name="EditProfile"
        component={AccountEditProfileScreen}
        options={{
          gesturesEnabled: false,
          header: ({navigation}) => {
            return (
              <Header
                iconColor={colors.black}
                iconLeft="arrow-left"
                onPressLeft={() => navigation.goBack()}
                title="Edit Profile"
              />
            );
          },
        }}
      /> */}
    </Stack.Navigator>
  );
}
