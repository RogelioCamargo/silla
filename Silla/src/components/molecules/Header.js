import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';

// import components
import {Text} from '../atoms';

// import default styles
import {colors, fontSize, margin, padding} from '../../styles';

export default function Header({
  iconColor = colors.black,
  iconLeft,
  iconRight,
  iconSize = 26,
  onPressLeft,
  onPressRight,
  title,
  titleStyle,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_inner}>
        {/* Icon - Left */}
        {iconLeft ? (
          <TouchableWithoutFeedback onPress={onPressLeft}>
            <Feather name={iconLeft} size={iconSize} color={iconColor} />
          </TouchableWithoutFeedback>
        ) : (
          <Feather name={iconRight} size={iconSize} color="white" />
        )}
        {/* Title */}
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        {/* Icon - Right */}
        {iconRight ? (
          <TouchableWithoutFeedback onPress={onPressRight}>
            <Feather name={iconRight} size={iconSize} color={iconColor} />
          </TouchableWithoutFeedback>
        ) : (
          <Feather name={iconLeft} size={iconSize} color="white" />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  container_inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.standard,
    justifyContent: 'space-between',
    marginBottom: margin.sm,
    marginTop: margin.xs,
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontSize.title,
  },
});
