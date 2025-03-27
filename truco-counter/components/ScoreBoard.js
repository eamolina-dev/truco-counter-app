import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScoreColumn from './ScoreColumn';
import { Colors } from '../constants/colors';

const ScoreBoard = ({ score, leftPoints, rightPoints }) => {
  const half = Math.floor(score / 2);

  const markMidLine = leftPoints >= half || rightPoints >= half;

  return (
    <View style={styles.scoreboard}>
      {/* <View style={styles.topDivider} /> */}
      <View style={styles.container}>
        <ScoreColumn 
          pointsGoal={score} 
          points={leftPoints} 
          markMidLine={markMidLine}
        />
          <View style={styles.divider} />
        <ScoreColumn 
          pointsGoal={score} 
          points={rightPoints} 
          markMidLine={markMidLine}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: Colors.darkblue,
    height: '100%',
    width: 3,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  topDivider: {
    backgroundColor: Colors.lightgrey,
    height: 1,
    width: '100%',
  },
});

export default ScoreBoard;
