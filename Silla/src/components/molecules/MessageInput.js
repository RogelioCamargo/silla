import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// import components
import {TextInput} from '../atoms';

// import default styles
import {colors, padding} from '../../styles';

export default function MessageInput({onChangeText, onPressButton, value}) {
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        autoCorrect={false}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Send a message..."
      />
      <TouchableOpacity onPress={onPressButton}>
        <MaterialCommunityIcons
          name="send-circle"
          size={40}
          color={colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    paddingTop: padding.sm,
    borderColor: colors.light,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
  },
});
