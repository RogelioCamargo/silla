import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// import default styles
import {colors} from '../../styles';

// get screen dimensions
const screen = Dimensions.get('screen');

export default function ListingCard({
  image,
  onPress,
  resizeMode = 'cover',
  style,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <Image
          resizeMode={resizeMode}
          style={[styles.container, style]}
          source={{uri: image}}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    height: screen.width / 2,
    width: screen.width / 2.02,
    margin: 1,
  },
});
