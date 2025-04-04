import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomModal from "../atoms/CustomModal";
import IconButton from '../molecules/IconButton';
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "../../lib/constants/colors";

const GameOverModal = ({ winner, onPressLeft, onPressRight, isVisible, onBackdropPress }) => {
  return (
    <CustomModal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.modal}>
        <View style={styles.modalSides}>
          <IconButton 
            onPress={onPressLeft}
            style={styles.button}
            iconName='xmark'
            iconSize={32}
            iconColor={Colors.black}
          />
        </View>
        <View style={styles.modalBody}>
          <FontAwesome6 
            name='trophy' 
            size={48} 
            color={Colors.yellow}
          />
          <Text style={styles.winner}>Ganador:</Text>
        </View>
        <View style={styles.modalSides}>
          <IconButton 
            onPress={onPressRight}
            style={styles.button}
            iconName='check'
            iconSize={32}
            iconColor={Colors.black}
          />
        </View>
      </View>
      <Text style={styles.winnerName}>{winner}</Text>
    </CustomModal>
  );
};

export const styles = StyleSheet.create({
  modal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winner: {
    fontSize: 20,
    marginTop: 8,
  },
  winnerName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
    borderBottomWidth: 3,
    borderRadius: 4,
    borderColor: Colors.darkblue
  },
  modalSides: {
    width: 50,
  },
  modalBody: {
    width: 200,
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
    borderWidth: 5,
    backgroundColor: Colors.grey,
  },
});

export default GameOverModal;
