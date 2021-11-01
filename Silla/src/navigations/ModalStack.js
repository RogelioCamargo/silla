import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';

// import actions
import {reset} from '../store/listings';

// import components
import {Header} from '../components/molecules';

// import navigators
import AppBottomTabNavigator from './AppBottomTabNavigator';

// import screens
import CreateListingScreen from '../screens/CreateListingScreen';

const Stack = createStackNavigator();
export default function ModalStack() {
  // redux
  const dispatch = useDispatch();

  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Home"
        component={AppBottomTabNavigator}
        options={{
          gesturesEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateListing"
        component={CreateListingScreen}
        options={{
          gesturesEnabled: false,
          header: ({navigation}) => {
            const onRightPress = () => {
              navigation.pop();
              dispatch(reset());
            };
            return (
              <Header
                iconRight="x"
                onPressRight={onRightPress}
                title="Create a Listing"
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}
