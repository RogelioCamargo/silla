import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';

// import actions
import {getUser} from '../store/users';

// import default styles
import {colors} from '../styles';

// import navigators
import AccountStack from './AccountStack';
import HomeStack from './HomeStack';
import MessagesStack from './MessagesStack';
import SearchStack from './SearchStack';

// import routes
import routes from './routes';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

export default function AppBottomTabNavigation() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.black,
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Listings"
        component={SearchStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Sell"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.push(routes.CREATE_LISTING);
          },
        })}
      />
      <Tab.Screen
        name="Inbox"
        component={MessagesStack}
        options={() => ({
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="email" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
