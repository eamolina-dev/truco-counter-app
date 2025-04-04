import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScoreColumn from './ScoreColumn';
import { Colors } from '../../lib/constants/colors';

const ScoreBoard = ({ score, leftPoints, rightPoints }) => {
  const half = Math.floor(score / 2);

  const markMidLine = leftPoints > half || rightPoints > half;

  return (
    <View style={styles.scoreboard}>
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
    // height: 600
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
  },
});

export default ScoreBoard;
