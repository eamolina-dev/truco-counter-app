import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../constants/colors';

const PointsGoal = ({ score, onPressPoints, onBlur }) => {
  const [newScore, setNewScore] = useState(score); 

  const handleChange = (s) => {
    setNewScore(s);
  };

  const handleBlur = () => {
    setNewScore((prev) => prev.trim());
    onBlur(newScore.trim());
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={newScore}
        onChangeText={handleChange}
        onFocus={() => {}}
        onBlur={handleBlur}
        style={styles.textInput}
        cursorColor={Colors.yellow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
  },
  textInput: {
    fontFamily: 'Russo-One',
    fontSize: 48,
    borderColor: Colors.yellow,
    textShadowColor: Colors.yellow,
    textShadowRadius: 3,
    color: Colors.darkblue,
    paddingBottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});

export default PointsGoal;
