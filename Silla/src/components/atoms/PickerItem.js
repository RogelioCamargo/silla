import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

// import components
import Text from './Text';

// import default styles
import {colors, margin, padding} from '../../styles';

export default function PickerItem({item, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: margin.standard,
    paddingVertical: padding.standard,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
  },
});
