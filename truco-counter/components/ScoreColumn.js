import React from 'react';
import { View, StyleSheet } from 'react-native';
import Points from './Points';
import { Colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const ScoreColumn = ({ pointsGoal, points, markMidLine }) => {
  const half = Math.floor(pointsGoal / 2);
  const bads = points >= half ? half : points;
  const goods = points >= half ? points - half : 0;

  return (
    <View style={styles.container}>
      {/* <View style={styles.topDivider} /> */}
      <View style={styles.pointsContainer}>
        <Points totalPoints={half} points={bads} />
        {markMidLine && <View style={styles.midDivider} />}
        <Points totalPoints={half} points={goods} />
      </View>
    </View>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  pointsContainer: {
    // flex: 1,
    height: '100%',
    // alignSelf: 'stretch',
    alignItems: 'center',
  },
  midDivider: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '49%',
    backgroundColor: Colors.darkblue,
    height: 3,
  },
  topDivider: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    backgroundColor: '#734D2C',
    height: 3,
    width: '90%',
    borderRadius: 28,
  },
  scoreboardGradient: {
    position: 'absolute',
    top: 0,
    height: 12,
    width: '100%',
  },
});

export default ScoreColumn;
