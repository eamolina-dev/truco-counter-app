import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../constants/colors";

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
    height: 200,
    width: 360,
    alignSelf: "center",
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: Colors.white,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomModal;
