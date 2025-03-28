import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../constants/colors';

const TeamName = ({ name, onChangeName, onBlur, onFocus }) => {
  const [newName, setNewName] = useState(name); 

  const handleChange = (n) => {
    setNewScore(n);
  };

  const handleBlur = () => {
    setNewName((prev) => prev.trim());
    onBlur(newName.trim());
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={newName}
        onChangeText={handleChange}
        onFocus={onFocus}
        onBlur={handleBlur}
        style={styles.textInput}
        cursorColor={Colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 42,
  },
  textInput: {
    fontFamily: 'Russo-One',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.white,
  },
});

export default TeamName;
