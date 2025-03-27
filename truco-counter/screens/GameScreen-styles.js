import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollview: {
    flex: 1, 
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  container: {
    flex: 1,
    borderWidth: 1
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  scoreboard: {
    flex: 15,
  },
  scoreButtons: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  ads: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  adsText: {
    fontStyle: 'Russo-One',
    fontSize: 16,
    color: Colors.lightgrey,
    height: 36,
    width: 36,
    borderRadius: 28,
    backgroundColor: Colors.darkblue,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  tapArea: {
    flex: 1
  },
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
  leftPlayerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
  },
  rightPlayerGradient: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '50%',
  },
});
