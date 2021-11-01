import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

// import components
import {Screen} from '../components/atoms';

// import default styles
import {colors} from '../styles';

export default function OptionsScreen() {
  return (
    <Screen style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
