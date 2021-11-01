import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';

// import components
import TextInput from '../atoms/TextInput';

// import default styles
import {colors, margin, padding} from '../../styles';

export default function SearchInput({
  goBackButton,
  goBackButtonOnPress,
  onChangeText,
  onSubmitEditing,
  value,
}) {
  return (
    <>
      {goBackButton ? (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={goBackButtonOnPress}>
            <Feather
              name="arrow-left"
              size={25}
              color={colors.dark}
              style={{marginRight: margin.standard}}
            />
          </TouchableWithoutFeedback>
          <View style={[styles.container_search, {flex: 1}]}>
            <Feather name="search" size={13} color={colors.medium} />
            <TextInput
              autoCorrect={false}
              clearButtonMode="always"
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={onSubmitEditing}
              placeholder="Search"
              onChangeText={onChangeText}
              returnKeyType="search"
              style={styles.input}
              value={value}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container_search}>
          <Feather name="search" size={13} color={colors.medium} />
          <TextInput
            autoCorrect={false}
            clearButtonMode="always"
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={onSubmitEditing}
            placeholder="Search"
            onChangeText={onChangeText}
            returnKeyType="search"
            style={styles.input}
            value={value}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: padding.standard,
  },
  container_search: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 2.5,
    paddingLeft: padding.sm,
    width: '100%',
  },
  input: {
    flex: 1,
  },
});
