import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../lib/constants/colors';

const TeamName = ({ name, onBlur, onFocus }) => {
  const [newName, setNewName] = useState(name);
  const prevNameRef = useRef(name);

  useEffect(() => {
    setNewName(name);
    prevNameRef.current = name;
  }, [name]);

  const handleChange = (text) => {
    setNewName(text);
  };

  const handleBlur = () => {
    const trimmed = newName.trim();
    setNewName(trimmed);
    const wasAccepted = onBlur(trimmed);
    if (!wasAccepted) {
      setNewName(prevNameRef.current);
    }
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
