import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

// import navigators
import RootStack from './src/navigations/RootStack';
import LoginStack from './src/navigations/LoginStack';

// import screens
import LoadingScreen from './src/screens/LoadingScreen';

// import store
import store from './src/store';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // handle user state changes
  function onAuthStateChanged(user) {
    if (!user) {
      setLoggedIn(false);
      setInitializing(false);
    } else {
      setLoggedIn(true);
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return <LoadingScreen />;
  }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
