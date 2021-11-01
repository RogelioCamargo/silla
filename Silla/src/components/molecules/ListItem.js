import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// import default styles
import {colors, margin, padding} from '../../styles';

export default function ListItem({
  chevronRightIcon,
  leftImage,
  onPress,
  primaryTitle,
  renderRightActions,
  rightImage,
  secondaryTitle,
  style,
  tertiaryTitle,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, style]}>
          {/* Image - Left */}
          {leftImage && (
            <Image style={styles.image_left} source={{uri: leftImage}} />
          )}
          {/* Details - Middle */}
          <View style={styles.container_details}>
            <Text style={styles.title_primary}>{primaryTitle}</Text>
            {secondaryTitle && (
              <Text numberOfLines={1} style={styles.title_secondary}>
                {secondaryTitle}
              </Text>
            )}
            {tertiaryTitle && (
              <Text style={styles.title_tertiary}>{tertiaryTitle}</Text>
            )}
          </View>
          {/* Image/Component - Right */}
          {rightImage && (
            <Image style={styles.image_right} source={{uri: rightImage}} />
          )}
          {chevronRightIcon && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color={colors.medium}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: padding.standard,
  },
  container_details: {
    flex: 1,
  },
  image_left: {
    borderRadius: 35,
    height: 55,
    marginRight: 10,
    width: 55,
  },
  image_right: {
    borderRadius: 5,
    height: 55,
    width: 55,
    marginLeft: margin.md,
  },
  title_primary: {
    fontWeight: '500',
  },
  title_secondary: {
    marginVertical: 3,
  },
  title_tertiary: {
    color: colors.medium,
    fontSize: 11,
  },
});
