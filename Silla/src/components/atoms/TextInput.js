import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

// import default styles
import {colors, padding, text} from '../../styles';

export default function AppTextInput({style, ...otherProps}) {
  return (
    <TextInput
      placeholderTextColor={colors.medium}
      style={[text, styles.input, style]}
      autoCapitalize="none"
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: padding.sm,
    paddingHorizontal: 5,
  },
});
