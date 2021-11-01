import React from 'react';
import {Text} from 'react-native';

// import default styles
import {text} from '../../styles';

export default function AppText({children, style, ...otherProps}) {
  return (
    <Text style={[text, style]} {...otherProps}>
      {children}
    </Text>
  );
}
