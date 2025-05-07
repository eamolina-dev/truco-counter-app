import React, { useEffect, useReducer, useCallback, useState } from 'react';
import { Alert, View, StatusBar, Text, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import TeamName from '../components/atoms/TeamName';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScoreBoard from '../components/organisms/ScoreBoard';
import { Colors } from '../lib/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import PointsGoal from '../components/atoms/PointsGoal';
import { reducer } from '../lib/reducers/gameReducer';
import GameOverModal from '../components/organisms/GameOverModal';
import ScoreButtonGroup from '../components/organisms/ScoreButtons';
import { validateTeamName, validateScore, validateUniqueNames } from '../validations/validations';

const GameScreen = () => {
  const [winner, setWinner] = useState('');
  const [activeModal, setActiveModal] = useState(false);
  const [changingLeft, setChangingLeft] = useState(true);

  const initialState = {
    score: 18,
    leftPoints: 0,
    rightPoints: 0,
    gameOver: false,
    leftTeamName: 'Nosotros',
    rightTeamName: 'Ellos',
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchAction = (type, payload = {}) => dispatch({ type, ...payload });

  const handlePress = useCallback((type, team) => {
    dispatch({ type, team });
  }, [dispatch]);

  useEffect(() => {
    if (!state.gameOver && (state.leftPoints === state.score || state.rightPoints === state.score)) {
      const winnerName = state.leftPoints === state.score ? state.leftTeamName : state.rightTeamName;
      setWinner(winnerName);
      dispatchAction('SET_GAME_OVER', { gameStatus: true });
      setActiveModal(true);
    } 
  }, [state.leftPoints, state.rightPoints]);

  const handleFocus = (team) => {
    team === 'left' ? setChangingLeft(true) : setChangingLeft(false);
  };

  const onConfirmName = (newName) => {
    const error = validateTeamName(newName);
    const error2 = changingLeft
      ? validateUniqueNames(newName, state.rightTeamName)
      : validateUniqueNames(state.leftTeamName, newName);
  
    if (error || error2) {
      Alert.alert('Error: ', error || error2);
      return false;
    }
  
    const teamKey = changingLeft ? 'left' : 'right';
    dispatchAction('CHANGE_TEAM_NAME', { team: teamKey, newName });
    return true;
  };
  

  const onConfirmGoal = (newGoal) => {
    const error = validateScore(newGoal);
    if (error) return (
      Alert.alert('Error: ', error)
    );

    const parsedGoal = parseInt(newGoal);
    if (!isNaN(parsedGoal)) {
      if (parsedGoal > 50) {
        dispatchAction('CHANGE_POINTS_GOAL', { newGoal: 50 });
      } else {
        dispatchAction('CHANGE_POINTS_GOAL', { newGoal: parsedGoal });
      }
    } else {
      Alert.alert("Error", "Ingrese un número válido");
    }
  };

  const onConfirmGame = () => {
    dispatchAction('RESET_GAME');
    setActiveModal(false);
  };

  const onCancelModal = () => {
    setActiveModal(false);
    dispatchAction('SET_GAME_OVER', { gameStatus: false });
    setWinner('');
  };

  const loserChangingScore = (team) => {
    return (
      state.leftPoints == state.score && team == 'right'
      || state.rightPoints == state.score && team == 'left'
    );
  };

  const onPressMinus = ({ team }) => {
    if (loserChangingScore(team)) return;

    handlePress('DECREMENT', `${team}Points`)
  };

  const onPressPlus = ({ team }) => {
    if (loserChangingScore(team)) return;

    handlePress('INCREMENT', `${team}Points`)
  }; 
  
  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <LinearGradient
            colors={[Colors.darkblue, Colors.black]}
            style={styles.background}
          />
          <StatusBar barStyle="light-content" />
          <KeyboardAvoidingView 
            style={{ flexGrow: 1 }}
            contentContainerStyle={styles.outterContainer} 
          >
            <View style={styles.innerContainer}>
              <View style={styles.header}>
                <View>
                  <PointsGoal score={state.score.toString()} onBlur={onConfirmGoal} />
                </View>
                <View style={styles.teamNames}>
                  <TeamName name={state.leftTeamName} onBlur={onConfirmName} onFocus={() => handleFocus('left')} />
                  <TeamName name={state.rightTeamName} onBlur={onConfirmName} onFocus={() => handleFocus('right')} />
                </View>
              </View>
              <View style={styles.scoreboard}>
                <ScoreBoard 
                  score={state.score}
                  leftPoints={state.leftPoints}
                  rightPoints={state.rightPoints}
                />
              </View>
              <View style={styles.numbers}>
                <Text style={styles.number}>
                  {state.leftPoints.toString()}
                </Text>
                <Text style={styles.number}>
                  {state.rightPoints.toString()}
                </Text>
              </View>
              <View style={styles.scoreButtons}>
                <ScoreButtonGroup team="left" onPressLeft={onPressMinus} onPressRight={onPressPlus} />
                <ScoreButtonGroup team="right" onPressLeft={onPressMinus} onPressRight={onPressPlus} />
              </View>

              <GameOverModal 
                winner={winner} 
                // onPressLeft={onCancelModal} 
                onPress={onConfirmGame} 
                // onPressRight={onConfirmGame}
                isVisible={activeModal} 
                onBackdropPress={onConfirmGame} 
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  outterContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
  },
  scoreboard: {
    // height: 600,
    height: '65%',
  },
  numbers: {
    height: '5%',
    // height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scoreButtons: {
    flexDirection: 'row',
    // flex: 1,
    height: '15%',
  },
  number: {
    fontStyle: 'Russo-One',
    fontSize: 16,
    color: Colors.lightgrey,
    height: 36,
    width: 36,
    borderRadius: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.darkblue,
  },
  tapArea: {
    flex: 1
  },
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
  teamNames: {
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
    borderWidth: 5,
    backgroundColor: Colors.grey,
  },
});


export default GameScreen;
