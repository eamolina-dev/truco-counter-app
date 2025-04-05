import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../lib/constants/colors';
import TapArea from '../atoms/TapArea';
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  button: {
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    // backgroundColor: Colors.darkblue,
    // borderColor: Colors.darkblue,
    borderColor: Colors.lightgrey,
  },
  leftButton: {
    borderWidth: 4,
  },
  rightButton: {
    borderWidth: 4,
  },

});

export default Buttons;
