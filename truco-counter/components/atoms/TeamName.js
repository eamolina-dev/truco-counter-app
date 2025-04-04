import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../lib/constants/colors';

const TeamName = ({ name, onBlur, onFocus }) => {
  const [newName, setNewName] = useState(name); 

  const handleChange = (n) => {
    setNewName(n);
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
    height: 48,
  },
  textInput: {
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowColor: Colors.black,
    textShadowRadius: 2,
    color: Colors.white,
  },
});

export default TeamName;
