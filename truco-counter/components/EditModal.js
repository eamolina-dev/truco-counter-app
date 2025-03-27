import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomModal from "./CustomModal";
import IconButton from './IconButton';
import { Colors } from '../constants/colors';
import { validateTeamName, validateScore, validateUniqueNames } from '../validations/validations';

const EditModal = ({ value, onChangeText, onPressLeft, onPressRight, isVisible, onBackdropPress, changingPoints }) => { 
  return (
    <CustomModal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <IconButton 
            onPress={onPressLeft}
            style={[styles.button, styles.leftButton]}
            iconName='xmark'
            iconSize={32}
            iconColor='black'
          />
        </View>
        <View style={styles.modalBody}>
          <TextInput 
            value={value}
            onChangeText={onChangeText}
            style={styles.modalInput}
            keyboardType={ changingPoints? "numeric" : "default" }
          />
          {/* {error && <Text style={{ color: 'red' }}>{error}</Text>} */}
        </View>
        <View style={styles.modalFooter}>
          <IconButton 
            onPress={onPressRight}
            style={[styles.button, styles.rightButton]}
            iconName='check'
            iconSize={32}
            iconColor='black'
          />
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: 'Russo-One',
    fontSize: 24,
  },
  modalInput: {
    fontFamily: 'Russo-One',
    fontSize: 24,
    backgroundColor: 'white',
    height: 64,
    width: '90%',
    borderRadius: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: Colors.lightgrey
  },
  modalHeader: {
    width: 50,
  },
  modalBody: {
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFooter: {
    width: 50,
  },
  logo: {
    opacity: 0.8
  },
  pointsGoal: {
    flex: 2,
  },
  teamNames: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
    borderColor: Colors.red,
    borderWidth: 5,
  },
  rightButton: {
    borderColor: Colors.teal,
    borderWidth: 5,
  },
});

export default EditModal;
