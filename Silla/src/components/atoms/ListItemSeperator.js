import React from 'react';
import {View, StyleSheet} from 'react-native';

// import default styles
import {colors} from '../../styles';

export default function ListItemSeperator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.light,
  },
});
