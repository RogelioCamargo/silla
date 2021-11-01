import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import components
import {Header} from '../components/molecules';

// import default styles
import {colors} from '../styles';

// import navigators
import ModalStack from './ModalStack';

// import screens
import EditListingScreen from '../screens/EditListingScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import MessageDetailsScreen from '../screens/MessageDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileListingDetailsScreen from '../screens/ProfileListingDetailsScreen';

const Stack = createStackNavigator();

export default function DetailsStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={ModalStack}
        options={{
          gesturesEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MessageDetails"
        component={MessageDetailsScreen}
        options={{
          gesturesEnabled: false,
          header: ({navigation}) => {
            return (
              <Header
                iconColor={colors.black}
                iconLeft="arrow-left"
                onPressLeft={() => navigation.goBack()}
                title="Message"
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ListingDetails"
        component={ListingDetailsScreen}
        options={{
          gesturesEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditListing"
        component={EditListingScreen}
        options={{
          gesturesEnabled: false,
          header: ({navigation}) => {
            const onPressLeft = () => {
              navigation.pop();
              //dispatch(reset());
            };
            return (
              <Header
                iconColor={colors.black}
                iconLeft="arrow-left"
                onPressLeft={onPressLeft}
                title="Edit a Listing"
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          gesturesEnabled: false,
          header: ({navigation}) => {
            return (
              <Header
                iconColor={colors.black}
                iconLeft="arrow-left"
                onPressLeft={() => navigation.goBack()}
                title="Profile"
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ProfileListingDetails"
        component={ProfileListingDetailsScreen}
        options={{
          gesturesEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
