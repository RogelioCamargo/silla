import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';

// import components
import {Button, Screen} from '../components/atoms';
import {ListItem} from '../components/molecules';

// import default styles
import {margin, padding} from '../styles';

// import reducers
import {reset} from '../store/users';

export default function AccountSettingsScreen() {
  // redux
  const dispatch = useDispatch();

  /**
   * This function logs off the user.
   */
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Screen style={styles.container}>
      <View>
        <View style={styles.container_options}>
          <ListItem chevronRightIcon primaryTitle="Edit Profile" />
          <ListItem chevronRightIcon primaryTitle="About" />
          <ListItem chevronRightIcon primaryTitle="More Info" />
        </View>

        <Button onPress={signOut} title="Sign Out" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.standard,
  },
  container_options: {
    marginVertical: margin.xl,
  },
});
