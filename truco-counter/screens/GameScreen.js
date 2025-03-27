import React, { useEffect, useReducer, useCallback, useState } from 'react';
import { Alert, View, StatusBar, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TeamName from '../components/TeamName';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScoreBoard from '../components/ScoreBoard';
import { Colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import PointsGoal from '../components/PointsGoal';
import { styles } from './GameScreen-styles';
import { ScoreButtonGroup  } from './GameScreenAuxComponents'; 
import EditModal from '../components/EditModal';
import { GameOverModal } from './GameScreenAuxComponents';
import { validateTeamName, validateScore, validateUniqueNames } from '../validations/validations';

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
  const [newGoal, setNewGoal] = useState('');
  const [newName, setNewName] = useState('');
  const [winner, setWinner] = useState('');
  const [activeModal, setActiveModal] = useState(null); // null, 'points', 'name', 'game'
  const [changingLeft, setChangingLeft] = useState(true);
  const [changingPoints, setChangingPoints] = useState(false);

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
      showModal('game');
    }
  }, [state.leftPoints, state.rightPoints, state.gameOver]);
  
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

  const onChangeTeamName = (team) => {
    setChangingPoints(false);
    setNewName(team);
    setChangingLeft(team === state.leftTeamName);
    showModal('name');
  };

  const onConfirmName = () => {
    const error = validateTeamName(newName);
    const error2 = changingLeft ? validateUniqueNames(newName, state.rightTeamName) 
                                : validateUniqueNames(state.leftTeamName, newName);
    if (error || error2) return (
      Alert.alert('Error: ', error || error2)
    );

    const teamKey = changingLeft ? 'leftTeamName' : 'rightTeamName';
    dispatchAction('CHANGE_TEAM_NAME', { team: teamKey, newName });
    hideModal();
  };

  const onChangePoints = () => {
    setChangingPoints(true);
    setNewGoal(state.score.toString());
    showModal('points');
  };

  const onConfirmGoal = () => {
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
      hideModal();
    } else {
      Alert.alert("Error", "Ingrese un número válido");
    }
  };

  const onConfirmGame = () => {
    dispatchAction('RESET_GAME');
    hideModal();
  };

  const showModal = (type) => setActiveModal(type);
  const hideModal = () => setActiveModal(null);


  const onCancelModal = () => {
    hideModal();
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
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.pointsGoal}>
            <PointsGoal score={state.score} onPressPoints={() => onChangePoints()} />
          </View>
          <View style={styles.teamNames}>
            <TeamName name={state.leftTeamName} onChangeName={() => onChangeTeamName(state.leftTeamName)} />
            <TeamName name={state.rightTeamName} onChangeName={() => onChangeTeamName(state.rightTeamName)} />
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
          isVisible={activeModal === 'game'} 
          onBackdropPress={onCancelModal} 
        />
        <EditModal 
          value={changingPoints ? newGoal : newName}
          onChangeText={changingPoints ? setNewGoal : setNewName}
          onPressLeft={onCancelModal}
          onPressRight={changingPoints ? onConfirmGoal : onConfirmName}
          isVisible={changingPoints ? activeModal === 'points' : activeModal === 'name'}
          onBackdropPress={onCancelModal}
          changingPoints={changingPoints}
        />
      </View>
    </SafeAreaView>
    
  );
};

export default GameScreen;
