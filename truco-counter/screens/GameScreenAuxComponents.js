import React from 'react';
import { View, Text } from 'react-native';
import Buttons from "../components/Buttons";
import CustomModal from "../components/CustomModal";
import { styles } from './GameScreen-styles';
import IconButton from '../components/IconButton';
import { Colors } from '../constants/colors';

export const GameOverModal = ({ winner, onPressLeft, onPressRight, isVisible, onBackdropPress }) => {
  return (
    <CustomModal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <IconButton 
            onPress={onPressLeft}
            style={[styles.button, styles.leftButton]}
            iconName='xmark'
            iconSize={32}
            iconColor={Colors.black}
          />
        </View>
        <View style={styles.modalBody}>
          <Text style={styles.modalText}>¡Fin del Juego!</Text>
          <Text style={styles.modalText}>---</Text>
          <Text style={styles.modalText}>Ganador:</Text>
          <Text style={styles.modalText}>{winner}</Text>
        </View>
        <View style={styles.modalFooter}>
          <IconButton 
            onPress={onPressRight}
            style={[styles.button, styles.rightButton]}
            iconName='check'
            iconSize={32}
            iconColor={Colors.black}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export const ScoreButtonGroup = ({ team, onPressLeft, onPressRight }) => (
  <Buttons
    leftButton='minus'
    rightButton='plus'
    onPressLeft={() => onPressLeft({team})}
    onPressRight={() => onPressRight({team})} 
    color={Colors.white}
  />
);
