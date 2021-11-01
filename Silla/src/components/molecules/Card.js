import React from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';

// import components
import {Text} from '../atoms';

export default function Card({
  image,
  onPress,
  resizeMode = 'cover',
  style,
  title,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <Image resizeMode={resizeMode} style={style} source={{uri: image}} />
        {title ? (
          <View style={{alignItems: 'center', marginVertical: 2.5}}>
            <Text>{title}</Text>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}
