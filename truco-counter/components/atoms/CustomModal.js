import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../../lib/constants/colors";

const CustomModal = ({ children, isVisible, onBackdropPress }) => {
  return (
    <Modal
      testID="custom-modal"
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      presentationStyle="overFullScreen"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 180,
    width: 360,
    borderRadius: 28,
    backgroundColor: Colors.lightgrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomModal;
