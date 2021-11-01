import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

// import components
import Text from './Text';

// import default styles
import {colors, padding} from '../../styles';

export default function AppButton({
  color = 'primary',
  onPress,
  style,
  title,
  secondary,
}) {
  return secondary ? (
    <TouchableOpacity
      style={[styles.container_secondary, style]}
      onPress={onPress}>
      <Text style={styles.text_secondary}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[styles.container_button, {backgroundColor: colors[color]}, style]}
      onPress={onPress}>
      <Text style={styles.text_button}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container_button: {
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 5,
    justifyContent: 'center',
    padding: padding.sm,
  },
  container_secondary: {
    alignItems: 'center',
    borderColor: colors.dark,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    padding: padding.sm,
  },
  text_button: {
    color: colors.white,
    fontWeight: '600',
  },
});
