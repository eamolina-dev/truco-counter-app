import React, { useEffect, useReducer, useCallback, useState } from 'react';
import { Alert, View, StatusBar, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TeamName from '../components/TeamName';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScoreBoard from '../components/ScoreBoard';
import { Colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import PointsGoal from '../components/PointsGoal';
// import { styles } from './GameScreen-styles';
import { ScoreButtonGroup  } from './GameScreenAuxComponents'; 
import EditModal from '../components/EditModal';
import { GameOverModal } from './GameScreenAuxComponents';
import { validateTeamName, validateScore, validateUniqueNames } from '../validations/validations';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { 
        ...state, 
        [action.team]: state[action.team] < state.score ? state[action.team] + 1 : state[action.team] 
      };
    case 'DECREMENT':
      return { ...state, [action.team]: Math.max(0, state[action.team] - 1) };
    case 'SET_GAME_OVER':
      return { ...state, gameOver: action.gameStatus };
    case 'RESET_GAME':
      return { 
        ...state, 
        leftPoints: 0,
        rightPoints: 0,
        gameOver: false
      };
    case 'CHANGE_TEAM_NAME':
      return { ...state, [action.team]: action.newName };
    case 'CHANGE_POINTS_GOAL':
      return { 
        ...state, 
        score: action.newGoal, 
        leftPoints: 0, 
        rightPoints: 0, 
        gameOver: false 
      };
    default:
      return state;
  }
};

SplashScreen.preventAutoHideAsync();

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

  const [loaded, error] = useFonts({
    'Russo-One': require('../assets/fonts/RussoOne-Regular.ttf'),
  });

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
  
  useEffect(() => {
    const hideSplash = async () => {
      if (loaded || error) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [loaded, error]);  

  if (!loaded && !error) {
    return null;
  }

  const handleFocus = (team) => {
    team === 'left' ? setChangingLeft(true) : setChangingLeft(false);
  };

  const onConfirmName = (newName) => {
    const error = validateTeamName(newName);
    const error2 = changingLeft ? validateUniqueNames(newName, state.rightTeamName) 
                                : validateUniqueNames(state.leftTeamName, newName);
    if (error || error2) return (
      Alert.alert('Error: ', error || error2)
    );

    const teamKey = changingLeft ? 'leftTeamName' : 'rightTeamName';
    dispatchAction('CHANGE_TEAM_NAME', { team: teamKey, newName });
  };

  // const onChangePoints = () => {
  //   setNewGoal(state.score.toString());
  // };

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
      <LinearGradient
        colors={[Colors.darkblue, Colors.black]}
        // colors={[Colors.lightblue, Colors.darkblue]}
        style={styles.background}
      />
      <StatusBar barStyle="light-content" />
      <KeyboardAwareScrollView style={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.pointsGoal}>
              <PointsGoal score={state.score.toString()} onPressPoints={() => onChangePoints()} onBlur={onConfirmGoal} />
            </View>
            <View style={styles.teamNames}>
              <TeamName name={state.leftTeamName} onChangeName={() => onChangeTeamName(state.leftTeamName)} onBlur={onConfirmName} onFocus={() => handleFocus('left')} />
              <TeamName name={state.rightTeamName} onChangeName={() => onChangeTeamName(state.rightTeamName)} onBlur={onConfirmName} onFocus={() => handleFocus('right')} />
            </View>
          </View>
          <View style={styles.scoreboard}>
            <ScoreBoard 
              score={state.score}
              leftPoints={state.leftPoints}
              rightPoints={state.rightPoints}
            />
          </View>
          <View style={styles.ads}>
            <Text style={styles.adsText}>
              {state.leftPoints.toString()}
            </Text>
            <Text style={styles.adsText}>
              {state.rightPoints.toString()}
            </Text>
          </View>
          <View style={styles.scoreButtons}>
            <ScoreButtonGroup team="left" onPressLeft={onPressMinus} onPressRight={onPressPlus} />
            <ScoreButtonGroup team="right" onPressLeft={onPressMinus} onPressRight={onPressPlus} />
          </View>

          {/* MODALS */}
          <GameOverModal 
            winner={winner} 
            onPressLeft={onCancelModal} 
            onPressRight={onConfirmGame}
            isVisible={activeModal} 
            onBackdropPress={onCancelModal} 
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
    
  );
};

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
    borderWidth: 1,
    // backgroundColor: 'red',
    flexGrow: 1,
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
    flex: 3,
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


export default GameScreen;
