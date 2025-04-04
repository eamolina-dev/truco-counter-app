import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const TapArea = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.touchableArea, style]} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableArea: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }
});

export default TapArea;
