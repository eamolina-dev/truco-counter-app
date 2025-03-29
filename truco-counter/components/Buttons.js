import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import TapArea from './TapArea';
import { FontAwesome6 } from "@expo/vector-icons";

const Buttons = ({ leftButton, rightButton, onPressLeft, onPressRight, color }) => {
  return (
    <View style={styles.buttons}>
      <TapArea onPress={onPressLeft}>
        <View testID="left-button" style={[styles.button, styles.leftButton]}>
          <FontAwesome6 name={leftButton} size={32} color={color} />
        </View>
      </TapArea>
      <TapArea onPress={onPressRight}>
        <View testID="right-button" style={[styles.button, styles.rightButton]}>
          <FontAwesome6 name={rightButton} size={32} color={color} />
        </View>
      </TapArea>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    // height: '100',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  leftButton: {
    // backgroundColor: Colors.red
    borderColor: Colors.red,
    borderWidth: 4,
  },
  rightButton: {
    // backgroundColor: Colors.teal
    borderColor: Colors.teal,
    borderWidth: 4,
  },

});

export default Buttons;
