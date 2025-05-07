import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomModal from "../atoms/CustomModal";
import IconButton from '../molecules/IconButton';
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../lib/constants/colors";
import TapArea from "../atoms/TapArea";

const GameOverModal = ({ winner, onPress, isVisible, onBackdropPress }) => {
  return (
    <CustomModal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.modal}>
        <FontAwesome6 
          name='trophy' 
          size={48} 
          color={Colors.yellow}
        />
        <Text style={styles.winner}>Ganador:</Text>
        <Text style={styles.winnerName}>{winner}</Text>
        <Text style={styles.winner}>Reiniciar</Text>
        <TapArea onPress={onPress}>
          <View style={styles.button}>
            <FontAwesome
              name='repeat'
              size={32} 
              color={Colors.black}
            />
          </View>
        </TapArea>
      </View>
    </CustomModal>
  );
};

export const styles = StyleSheet.create({
  modal: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winner: {
    fontSize: 20,
    // marginVertical: 8,
  },
  winnerName: {
    fontSize: 28,
    fontWeight: 'bold',
    // marginVertical: 4,
    borderBottomWidth: 3,
    borderRadius: 4,
    borderColor: Colors.darkblue
  },
  button: {
    height: 56,
    width: 224,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 5,
    backgroundColor: Colors.grey,
  },
});

export default GameOverModal;
