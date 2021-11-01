import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

// import default colors
import {colors} from '../../styles';

// import icons
import Feather from 'react-native-vector-icons/dist/Feather';

export default function ListItemDeleteAction({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Feather name="trash-2" size={25} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
