import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../lib/constants/colors';

const PointsGoal = ({ score, onBlur }) => {
  const [newScore, setNewScore] = useState(score); 

  const handleChange = (s) => {
    const scr = parseInt(s) > 50 ? '50' : s;  
    setNewScore(scr);
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
        keyboardType='numeric'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 64,
    // backgroundColor: 'green'
  },
  textInput: {
    // fontFamily: 'Russo-One',
    fontWeight: '500',
    fontSize: 48,
    // borderColor: 'red',
    textShadowColor: Colors.black,
    textShadowRadius: 5,
    color: Colors.white,
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    opacity: 0.9
    // backgroundColor: 'red'
  }
});

export default PointsGoal;
