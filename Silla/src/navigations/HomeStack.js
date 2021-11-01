import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// import components
import {Header} from '../components/molecules';

// import screens
import HomeScreen from '../screens/HomeScreen';
import HomeSearchScreen from '../screens/HomeSearchScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          gesturesEnabled: false,
          header: () => {
            return <Header title="silla" titleStyle={styles.header_title} />;
          },
        }}
      />
      <Stack.Screen
        name="SearchHome"
        component={HomeSearchScreen}
        options={{
          gesturesEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header_title: {
    fontSize: 50,
    //letterSpacing: 2,
  },
});
