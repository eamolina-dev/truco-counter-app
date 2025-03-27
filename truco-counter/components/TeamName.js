import React from 'react';
import { Text, StyleSheet } from 'react-native';
import TapArea from './TapArea';
import { Colors } from '../constants/colors';

const TeamName = ({ name, onChangeName }) => {
  return (
    <TapArea
      onPress={onChangeName}
      style={styles.tapArea}
    >
      <Text style={styles.team}>
        {name}
      </Text>
    </TapArea>
  );
};

const styles = StyleSheet.create({
  tapArea: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  team: {
    flex: 1,
    alignSelf: 'stretch',
    fontFamily: 'Russo-One',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.white,
    // color: Colors.darkblue,
  },
});

export default TeamName;
