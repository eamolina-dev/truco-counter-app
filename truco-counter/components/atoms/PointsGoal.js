import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Alert } from 'react-native';
import { Colors } from '../../lib/constants/colors';
import { validateScore } from '../../validations/validations';

const PointsGoal = ({ score, onBlur }) => {
  const [newScore, setNewScore] = useState(score);

  useEffect(() => {
    setNewScore(score);
  }, [score]);

  const handleChange = (s) => {
    setNewScore(s);
  };

  const handleBlur = () => {
    const trimmed = newScore.trim();
    const error = validateScore(trimmed);

    if (error) {
      Alert.alert('Error: ', error);
      setNewScore(score.toString());
      return;
    }

    const parsed = parseInt(trimmed);
    if (!isNaN(parsed)) {
      const finalScore = parsed > 50 ? '50' : trimmed;
      setNewScore(finalScore);
      onBlur(finalScore);
    } else {
      Alert.alert('Error', 'Ingrese un número válido');
      setNewScore(score.toString());
    }
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
  container: {},
  textInput: {
    fontWeight: '500',
    fontSize: 48,
    textShadowColor: Colors.black,
    textShadowRadius: 5,
    color: Colors.white,
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    opacity: 0.9,
  },
});

export default PointsGoal;
